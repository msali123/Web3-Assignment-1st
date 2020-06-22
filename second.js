console.log(Web3);
const rpcURL = "https://ropsten.infura.io/v3/da28ac5eaec84060b808df2bbae8f785";
const web3 = new Web3(rpcURL);

var address = "0x64397115747918d3b449B651C326bf37377DF1EAa";

web3.eth.getBalance(address, (err, wei) => {
  let balance = web3.utils.fromWei(wei, "Ether");
  console.log(balance);
});
