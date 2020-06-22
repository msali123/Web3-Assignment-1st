const Web3 = require("web3");
// console.log(Web3);

const rpcURL = "HTTP://127.0.0.1:7545";
const web3 = new Web3(rpcURL);
// console.log("instance: ", web3);

var address = "0x5Df5bEFde917B394b0238af9bBB353026631De1a";

web3.eth.getBalance(address, (err, wei) => {
  let balance = web3.utils.fromWei(wei, "Ether");
  console.log(balance);
});
