const contractName = 'tokenGarden'; //links to the file name in contracts/<filename.sol>

const nftName = 'Token Garden';
const symbol = 'TGRDN';
const metadataFolderURL = 'https://dev.tokengarden.art/api/v1/metadata/';
const freeMints = 144;
const mintsPerAddress = 100;
const openseaContractMetadataURI = 'https://www.tokenGarden.art/api/v1/contract-metadata';
const mintActive = true;

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
