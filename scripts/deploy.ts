import hre, { ethers, network, run } from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import { waitForEtherscan } from '../helpers/deployHelpers';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
const [file] = process.argv.slice(2);

const maxGasPrice = '100';

interface ContractInfo {
    contractName: string;
    contractArgs: Array<any>;
}

const getContractInfo = async (file: string): Promise<ContractInfo> =>
    await import(`../NFTs/${file}.ts`);

async function waitForGasPriceBelow(max: BigNumber): Promise<BigNumber> {
    console.log('Waiting for gas price below', formatUnits(max, 'gwei'), 'gwei');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const price = await ethers.provider.getGasPrice();
        console.log(new Date().toLocaleString(), 'Gas Price:', formatUnits(price, 'gwei'), 'gwei');
        if (price.lte(max)) {
            console.log('Good enough!');
            return price;
        }
        await new Promise((resolve) => setTimeout(resolve, 30_000));
    }
}

async function main() {
    const { contractName, contractArgs } = await getContractInfo(file);

    console.log('contract name:', contractName);
    console.log('contract args:', contractArgs);

    await run('compile');

    const gasPrice = await waitForGasPriceBelow(parseUnits(maxGasPrice, 'gwei'));

    const ERC721Factory = await ethers.getContractFactory(contractName);
    const contractInstance = await ERC721Factory.deploy(...contractArgs); // Instance of the contract

    console.log(
        `deploying contract: ${contractInstance.address} to the ${network.name} network...`,
    );
    // console.log(`using gas price of ${Number(network)/(10**9)} gwei`);
    await contractInstance.deployed();
    console.log('contract deployed');

    await waitForEtherscan(contractInstance.address, network.name);

    console.log('verifying the contract on etherscan...');
    await run('verify:verify', {
        address: contractInstance.address,
        constructorArguments: contractArgs,
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
