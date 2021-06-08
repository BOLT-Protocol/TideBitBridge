import * as rpc from "./utils/rpc.js";
import * as utils from "./utils/utils.js";

const elements = {
  connectWalletButton: document.querySelector(
    ".popup--wallet-connect .popup__button"
  ),
  pannelClose: document.querySelector("#pannel-close"),
  loginStatus: document.querySelector("#login-status"),
  userInfo: document.querySelector(".header__user .header__user-address--path"),
  toAddress: document.querySelector(".form .form__to-address"),
  scrollViewList: document.querySelector(".scrollview__list"),
  selectedAssetLabel: document.querySelector("label[for='assets-selector']"),
  accountBalance: document.querySelector(".form__walletconnected-amount"),
  addAssetButtun: document.querySelector("#add-asset"),
  hintTextAmountUint: document.querySelector(".form__hint-text--unit"),
  minimunTransferAmount: document.querySelector(".form__amount-minimum span"),
  maximunTransferAmount: document.querySelector(".form__amount-maximumn span"),
  dailyLimit: document.querySelectorAll(".daily__limit"),
  totalSent: document.querySelector(".daily__total-sent"),
  inputAmount: document.querySelector("#amount"),
  nextButton: document.querySelector(".form .form__button"),
};

let userAccount;
let selectedAsset = 2; // index

const assets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "mainnet",
    available: true,
    icon: "https://www.tidebit.one/icons/btc.png",
    dailyLimit: 2,
    minimumAmount: 0.00364,
    maximumAmount: 0.45,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "mainnet",
    available: true,
    icon: "https://www.tidebit.one/icons/eth.png",
    dailyLimit: 25.97,
    minimumAmount: 0.052,
    maximumAmount: 13.1,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "ropsten",
    available: true,
    icon: "https://www.tidebit.one/icons/eth.png",
    dailyLimit: 25.97,
    minimumAmount: 0.052,
    maximumAmount: 13.1,
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
const listScrollView = () => {
  // will move to somewhere else
  elements.selectedAssetLabel = assets[selectedAsset].symbol;
  elements.scrollViewList.replaceChildren();
  assets.forEach((asset, i) =>
    elements.scrollViewList.insertAdjacentHTML(
      "beforeend",
      scrollViewItem(asset, i)
    )
  );
};

const getUrl = (asset) => {
  let url;
  switch (asset.network.toLowerCase()) {
    case "ropsten":
      url = "https://ropsten.tidewallet.io";
      break;
    case "mainnet":
      url = "https://ethereum.tidewallet.io";
      break;
    default:
      url = "https://ropsten.tidewallet.io";
      break;
  }
  return url;
};
const jsonRPC = (method, transactionHex) => {
  const opts = {};
  opts.headers = { "content-type": "application/json" };
  opts.method = "POST";
  opts.url = getUrl(assets[selectedAsset]);
  switch (method) {
    case "eth_getTransactionCount":
      opts.payload = `{
      "jsonrpc":"2.0",
      "method":"eth_getTransactionCount",
      "params":["${userAccount}","latest"],
      "id": "${utils.randomID()}"
    }`;
      break;
    case "eth_getBalance":
      opts.payload = `{
        "jsonrpc":"2.0",
        "method":"eth_getBalance",
        "params":["${userAccount}","latest"],
        "id": "${utils.randomID()}"
      }`;
      break;
    case "eth_gasPrice":
      opts.payload = `{
        "jsonrpc":"2.0",
        "method":"eth_gasPrice", 
        "params":[],
        "id": "${utils.randomID()}"
      }`;
      break;
    case "eth_estimateGas":
      opts.payload = `{
        "jsonrpc":"2.0",
        "method":"eth_estimateGas",
        "params":[],
        "id": "${utils.randomID()}"
      }`;
      break;
  }
  return opts;
};

const getEstimateGas = async (txHex) => {
  const [error, resultObj] = await utils.to(
    utils.request(jsonRPC("eth_estimateGas", txHex))
  );
  if (error) {
    console.log(error);
  } else {
    console.log(resultObj); // --
    const estimateGas = resultObj.result;
    console.log(estimateGas); // "0x5208" // 21000
    return estimateGas;
  }
};
const getGasPrice = async () => {
  const [error, resultObj] = await utils.to(
    utils.request(jsonRPC("eth_gasPrice"))
  );
  if (error) {
    console.log(error);
  } else {
    console.log(resultObj); // --
    const gasPrice = resultObj.result;
    console.log(gasPrice); // "0x1dfd14000" // 8049999872 Wei
    return gasPrice;
  }
};
const getBalance = async (asset, account) => {
  console.log("getBalance", account);
  const [error, resultObj] = await utils.to(
    utils.request(jsonRPC("eth_getBalance", { asset: asset, account: account }))
  );
  if (error) {
    console.log(error);
  } else {
    console.log(resultObj); // --
    const balance = utils.toEther(parseInt(resultObj.result), "wei");
    console.log(balance); // --
    asset.balance = balance;
  }
};

const updateSelectedAsset = async (isLogin) => {
  const asset = assets[selectedAsset];
  if (isLogin) {
    elements.minimunTransferAmount.textContent =
      asset.minimumAmount + " " + asset.symbol;
    elements.maximunTransferAmount.textContent =
      asset.maximumAmount + " " + asset.symbol;
    elements.loginStatus.checked = true;
    // update account address
    elements.userInfo.textContent =
      userAccount.slice(0, 5) +
      "..." +
      userAccount.slice(userAccount.length - 5, userAccount.length);
    elements.toAddress.textContent =
      userAccount.slice(0, 8) +
      "..." +
      userAccount.slice(userAccount.length - 8, userAccount.length);
    // update account balance
    console.log("elements.dailyLimit e", elements.dailyLimit);
    Array.from(elements.dailyLimit).forEach((e) => {
      console.log("elements.dailyLimit e", e.textContent);
      e.textContent = asset.dailyLimit + " " + asset.symbol;
    });
    await getBalance(asset, userAccount);
    elements.accountBalance.textContent = asset.balance + " " + asset.symbol;
  }
  elements.addAssetButtun = asset.symbol;
  elements.hintTextAmountUint = asset.symbol;
  elements.selectedAssetLabel = asset.symbol;
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

const sendTransactionByMetamask = async () => {
  const [error, result] = await utils.to(
    ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: userAccount,
          to: "0xAdE7126134BB1beEde5662e208cCC0147dEE0BFE",
          gas: "0x76c0", // 30400
          gasPrice: await getGasPrice(), //"0x9184e72a000", // 10000000000000
          value: "0x9184e72a", // 2441406250
          data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
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
        if (account) {
          userAccount = account;
          await updateSelectedAsset(true);
        }
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

elements.connectWalletButton.addEventListener("click", () =>
  connectWallet(getOptionsOfWallet())
);

elements.scrollViewList.addEventListener("click", async (el) => {
  console.log(
    "el.target.parentNode.attributes.index",
    el.target.parentNode.attributes.index ? true : false
  );
  if (el.target.parentNode.attributes.index) {
    selectedAsset = el.target.parentNode.attributes.index.value;
    await updateSelectedAsset(assets[selectedAsset], userAccount);

    console.log("selectedAsset", selectedAsset);
  }
});
elements.nextButton.addEventListener("click", async () => {
  const amount = utils.toWei(parseFloat(elements.inputAmount.value));
  console.log(amount);
  // sendTransactionByMetamask();
});

// requestPermissions();
checkLoginStatus();
listScrollView();
