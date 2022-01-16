const contractName = 'tokenGarden'; //links to the file name in contracts/<filename.sol>

const env = process.env.HARDHAT_NETWORK === 'mainnet' ? 'www' : 'dev';

const nftName = 'Token Garden';
const symbol = 'TGRDN';
const metadataFolderURL = `https://${env}.tokengarden.art/api/v1/metadata/`;
const freeMints = 0;
const mintsPerAddress = 1;
const openseaContractMetadataURI = `https://${env}.tokengarden.art/api/v1/contract-metadata`;
const mintActive = false;

const contractArgs = [
    nftName,
    symbol,
    metadataFolderURL,
    freeMints,
    mintsPerAddress,
    openseaContractMetadataURI,
    mintActive,
];
export { contractName, contractArgs };
