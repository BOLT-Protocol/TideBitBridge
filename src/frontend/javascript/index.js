import * as rpc from "./utils/rpc.js";
import * as utils from "./utils/utils.js";

let userAccount;

const elements = {
  connectWalletButton: document.querySelector(
    ".popup--wallet-connect .popup__button"
  ),
  pannelClose: document.querySelector("#pannel-close"),
  loginControl: document.querySelector("#login-status"),
  userInfo: document.querySelector(".header__user .header__user-address--path"),
};

const checkLoginStatus = () => {
  console.log(ethereum.isConnected());
  // if (typeof window.ethereum !== "undefined" && ethereum.isConnected()) {
  //   connectMetamask();
  // }
};

const getOptionsOfWallet = () =>
  document.querySelectorAll(
    '.popup--wallet-connect input[name="connectwallet"]'
  );

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

const connectMetamask = async () => {
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
      // login
      if (account) {
        login(account);
      }
      return account;
    }
  }
  console.log("MetaMask isn't installed!");
  return false;
};

const getBalance = async (account) => {
  const [error, balance] = await utils.to(
    ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    })
  );
  if(error){}else{
    console.log(balance);
  }
};

const login = (account) => {
  userAccount = account;
  elements.userInfo.textContent =
  userAccount.slice(0, 5) +
  "..." +
  userAccount.slice(userAccount.length - 5, userAccount.length);
  elements.loginControl.checked = true;
  getBalance();
};

const connectWallet = async (optionsOfWallet) => {
  console.log("click connectWallet");
  // https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
  // The Array.prototype.slice.call() approach has been around for a long time. It works in all modern browsers, and back to at least IE6.
  // The Array.from() method works in all modern browsers, but has no IE support (only Edge). You can push support back to at least IE9 with a polyfill, though.
  let selectedOption = Array.prototype.slice
    .call(optionsOfWallet)
    .find((option) => option.checked);
  console.log(selectedOption);
  if (selectedOption !== undefined) {
    elements.pannelClose.checked = true;
    switch (selectedOption.id) {
      case "metamask":
        //-- rpc.startExtension(); from https://github.com/XPAEXCHANGE/XPA_Exchange_fe/tree/develop
        const account = await connectMetamask();
        break;
      case "tidebit":
        console.log("tidebit: comming soon");
        break;
      case "walletconnect":
        console.log("walletconnect: comming soon");
        break;
    }
  }
  return;
};
// requestPermissions();
checkLoginStatus();

ethereum.on("accountsChanged", (accounts) => {
  // Handle the new accounts, or lack thereof.
  console.log(accounts);
});

elements.connectWalletButton.addEventListener("click", () =>
  connectWallet(getOptionsOfWallet())
);
