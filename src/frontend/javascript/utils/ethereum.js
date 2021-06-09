const utils = require("./utils");
const rpc = require("./rpc");


const requestPermissions = async () => {
  const [error, permissions] = await utils.to(
    ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
  );
  if (error) {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log("Permissions needed to continue.");
    } else {
      console.error(error);
    }
  } else {
    const accountsPermission = permissions.find(
      (permission) => permission.parentCapability === "eth_accounts"
    );
    if (accountsPermission) {
      console.log("eth_accounts permission successfully requested!");
    }
  }
};

const checkLoginStatus = () => {
  console.log(ethereum.isConnected());
  // if (typeof window.ethereum !== "undefined" && ethereum.isConnected()) {
  //   connect();
  // }
};

const sendTransaction = async (account, amount, asset) => {
  const [error, result] = await utils.to(
    ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: "0x113461E94e790Cf247802cac2399CD206c60597F",
          gas: "0x76c0", // 30400
          gasPrice: await rpc.getGasPrice(asset), //"0x9184e72a000", // 10000000000000
          value: utils.bnToHex(
            utils.toWei(parseFloat(amount), "ether")
          ), // 2441406250
          data: "", //"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
        },
      ],
    })
  );
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
};

const connect = async () => {
  if (typeof window.ethereum !== "undefined") {
    const [error, accounts] = await utils.to(
      // https://docs.metamask.io/guide/getting-started.html#basic-considerations
      ethereum.request({
        method: "eth_requestAccounts",
      })
    );
    if (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Please connect to MetaMask.");
        //++ open extension
      } else {
        console.error(error);
      }
      return false;
    } else {
      const account = accounts[0];
      // We currently only ever provide a single account,
      // but the array gives us some room to grow.
      console.log(account);
      return account;
    }
  }
  console.log("MetaMask isn't installed!");
  return false;
};

ethereum.on("accountsChanged", (accounts) => {
  // Handle the new accounts, or lack thereof.
  console.log(accounts);
});

ethereum.on("chainChanged", (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have a very good reason not to.
  console.log(chainId);
  window.location.reload();
});

module.exports.connect = connect;
module.exports.sendTransaction = sendTransaction;
