var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const rpcURL = "HTTP://127.0.0.1:7545";
const infuraURL =
  "https://ropsten.infura.io/v3/da28ac5eaec84060b808df2bbae8f785";
const web3 = new Web3(infuraURL);

const account1 = "0x5762Acf187050b5BDA515A3c302Fb77aEd3E3291";
const account2 = "0x52bb6b115CE1b9A312B2f6b53a027C5289183aCa";
const account1R = "0x64397115747918d3b449B651C326bf37377DF1EA";

const privatekey1 =
  "a2e726b89059438840271e950d0eec961094ed2d8382f87eeffab30f5f92d315";
const privatekey2 =
  "b932ee32a0384249f2343564695d7f339f9eb42f9a616ccf28f68144f56879f8";
const privatekey1R =
  "C9536BC81373CF5B6CDE200822B29D993D2E5A9DF9889B01BE3226F1B78B409F";

const privatekey1buffer = Buffer.from(privatekey1R, "hex");

var contractAddress = "0x2db1FB40de09e87feA2584C11aA5826e258574d6";
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
const contract = new web3.eth.Contract(abi, contractAddress);

web3.eth.getTransactionCount(account1R, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: contract.methods.store(15).encodeABI(),
  };

  //const tx = new Tx.Transaction(txObject);
  const tx = new Tx.Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  }); //for Ropsten
  tx.sign(privatekey1buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
//0xae88942c63bfb6de50c68c93ec4feb284d532b2b0bf7635f5db16eda2874882f tx hash
contract.methods.retreive().call((err, result) => {
  console.log(result);
});
