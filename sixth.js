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

web3.eth.getTransactionCount(account1R, (err, txCount) => {
  const data =
    "0x6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea264697066735822122090d8e87c983800508c5a7424940af5c06f2d72b04541855e82f0fbd618d6064d64736f6c63430006070033";
  const databuffer = Buffer.from(privatekey1R, "hex");
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: databuffer,
  };

  //const tx = new Tx.Transaction(txObject);
  const tx = new Tx.Transaction(txObject, {
    chain: "ropsten",
  }); //for Ropsten
  tx.sign(privatekey1buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("errorr", err);
    console.log("txHash:", txHash);
  });
});
