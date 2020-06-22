console.log(Web3);
const rpcURL = "https://ropsten.infura.io/v3/da28ac5eaec84060b808df2bbae8f785";
const web3 = new Web3(rpcURL);

var address = "0x2db1FB40de09e87feA2584C11aA5826e258574d6";
let abi = [
  {
    inputs: [],
    name: "retreive",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, address);
contract.methods.retreive().call((err, result) => {
  console.log(result);
});
