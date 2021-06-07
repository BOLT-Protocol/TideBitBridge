import * as rpc from "./utils/rpc.js";
import * as utils from "./utils/utils.js";

let userAccount;
let selectedAsset = 2; // index

const assets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "mainnet",
    available: true,
    icon: "https://www.tidebit.one/icons/btc.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "mainnet",
    available: true,
    icon: "https://www.tidebit.one/icons/eth.png",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "ropsten",
    available: true,
    icon: "https://www.tidebit.one/icons/eth.png",
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    network: "mainnet",
    available: false,
    icon: "https://www.tidebit.one/icons/bch.png",
  },
  {
    symbol: "USDT",
    name: "TetherUS",
    network: "mainnet",
    available: false,
    icon: "https://www.tidebit.one/icons/usdt.png",
  },
];

const scrollViewItem = (asset, i) => {
  const markup = `
  <li index=${i} class="scrollview__item">
    <input type="radio" name="assets-list" id="assets-${(
      asset.symbol + asset.network
    ).toLowerCase()}" class="scrollview__radio" ${
    asset.available ? (i === selectedAsset ? "checked" : "enabled") : "disabled"
  }>
    <label class="icontile" for="assets-${(
      asset.symbol + asset.network
    ).toLowerCase()}">
      <div class="icontile__leading margin__right--small">
        <img src=${asset.icon} alt=${asset.symbol} class="icontile__icon">
      </div>
      <div class="icontile__title-box">
        <div class="icontile__title--main">${asset.symbol}</div>
        <div class="icontile__title--sub">${
          asset.name + " " + asset.network
        }</div>
      </div>
      <div class="icontile__suffix"><i class="fas fa-check"></i></div>
    </label>
  </li>
  `;
  return markup;
};

const elements = {
  connectWalletButton: document.querySelector(
    ".popup--wallet-connect .popup__button"
  ),
  pannelClose: document.querySelector("#pannel-close"),
  loginControl: document.querySelector("#login-status"),
  userInfo: document.querySelector(".header__user .header__user-address--path"),
  toAddress: document.querySelector(".form .form__to-address"),
  scrollViewList: document.querySelector(".scrollview__list"),
  selectedAssetLabel: document.querySelector("label[for='assets-selector']"),
};

const listScrollView = () => {
  // will move to somewhere else
  elements.selectedAssetLabel = assets[selectedAsset].symbol.toUpperCase();
  elements.scrollViewList.replaceChildren();
  assets.forEach((asset, i) =>
    elements.scrollViewList.insertAdjacentHTML(
      "beforeend",
      scrollViewItem(asset, i)
    )
  );
};

const changeSelectedAsset = () => {
  elements.selectedAssetLabel = assets[selectedAsset].symbol.toUpperCase();
};

const getBalance = async (asset, account) => {
  const opts = {};
  opts.headers = { "content-type": "application/json" };
  opts.method = "POST";
  switch (asset.network.toLowerCase()) {
    case "ropsten":
      opts.url = "https://ropsten.tidewallet.io";
      break;
    case "ethereum":
      opts.url = "https://rpc.tidewallet.io";
      break;
    default:
      opts.url = "https://ropsten.tidewallet.io";
      break;
  }
  opts.payload = `{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":["${account}","latest"],
    "id": "${utils.randomID()}"
  }`;
  const [error, resultObj] = await utils.to(utils.request(opts));
  if (error) {
  } else {
    const balance = parseInt(resultObj.result) / Math.pow(10, 18);
    console.log(balance);
    document.querySelector(".form__walletconnected-amount").textContent =
      balance + " " + assets[selectedAsset].symbol;
  }
};

const login = (account) => {
  userAccount = account;
  elements.userInfo.textContent =
    userAccount.slice(0, 5) +
    "..." +
    userAccount.slice(userAccount.length - 5, userAccount.length);
  elements.toAddress.textContent =
    userAccount.slice(0, 8) +
    "..." +
    userAccount.slice(userAccount.length - 8, userAccount.length);
  elements.loginControl.checked = true;
  getBalance(assets[selectedAsset], account);
};

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

const getOptionsOfWallet = () =>
  document.querySelectorAll(
    '.popup--wallet-connect input[name="connectwallet"]'
  );

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

const checkLoginStatus = () => {
  console.log(ethereum.isConnected());
  // if (typeof window.ethereum !== "undefined" && ethereum.isConnected()) {
  //   connectMetamask();
  // }
};

// requestPermissions();
checkLoginStatus();
listScrollView();
ethereum.on("accountsChanged", (accounts) => {
  // Handle the new accounts, or lack thereof.
  console.log(accounts);
});

elements.connectWalletButton.addEventListener("click", () =>
  connectWallet(getOptionsOfWallet())
);

elements.scrollViewList.addEventListener("click", (el) => {
  selectedAsset = el.target.parentNode.attributes.index.value;
  getBalance(assets[selectedAsset], account);
  console.log("selectedAsset", selectedAsset);
});
