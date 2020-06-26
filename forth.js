var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const rpcURL = "HTTP://127.0.0.1:7545";
const infuraURL =
  "https://ropsten.infura.io/v3/da28ac5eaec84060b808df2bbae8f785";
const web3 = new Web3(infuraURL);

const account1 = "0x5762Acf187050b5BDA515A3c302Fb77aEd3E3291";
const account2 = "0x52bb6b115CE1b9A312B2f6b53a027C5289183aCa";
const account1R = "0x64397115747918d3b449B651C326bf37377DF1EA";
const account2R = "0x84254DCAc8c67754c7aD720D1AA758D7Bd1068C2";

const privatekey1 =
  "a2e726b89059438840271e950d0eec961094ed2d8382f87eeffab30f5f92d315";
const privatekey2 =
  "b932ee32a0384249f2343564695d7f339f9eb42f9a616ccf28f68144f56879f8";
const privatekey1R =
  "C9536BC81373CF5B6CDE200822B29D993D2E5A9DF9889B01BE3226F1B78B409F";
const privatekey2R =
  "3b8c47e8ea18d587275dfd6c9040e32b895a791a22111540fb4b25fdeacba01d";

const privatekey1buffer = Buffer.from(privatekey1, "hex");
const privatekey2buffer = Buffer.from(privatekey2, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("3", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx.Transaction(txObject);
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
