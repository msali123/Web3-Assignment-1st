var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const rpcURL = "HTTP://127.0.0.1:7545";
const web3 = new Web3(rpcURL);

const account1 = "0x5762Acf187050b5BDA515A3c302Fb77aEd3E3291";
const account2 = "0x52bb6b115CE1b9A312B2f6b53a027C5289183aCa";

const privatekey1 =
  "a2e726b89059438840271e950d0eec961094ed2d8382f87eeffab30f5f92d315";
const privatekey2 =
  "b932ee32a0384249f2343564695d7f339f9eb42f9a616ccf28f68144f56879f8";

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
  tx.sign(privatekey1buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
