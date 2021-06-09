import * as rlp from "rlp";

const metamask = require("./utils/ethereum");
const rpc = require("./utils/rpc");
const elements = require("./dom/elements");
const scrollViewItem = require("./component/scroll_item");
const _assets = require("./constant/assets");

const assets = _assets.assets.map((_asset) => ({ ..._asset }));

let userAccount;
let selectedAsset = 2; // index

const listScrollView = () => {
  let asset = assets[selectedAsset];
  elements.selectedAssetLabel.innerText = asset.symbol;
  elements.scrollViewList.replaceChildren();
  assets.forEach((asset, i) =>
    elements.scrollViewList.insertAdjacentHTML(
      "beforeend",
      scrollViewItem(asset, selectedAsset, i)
    )
  );
};

const updateSelectedAsset = async (isLogin) => {
  let asset = assets[selectedAsset];
  if (isLogin || elements.loginStatus.checked) {
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
    asset.balance = await rpc.getBalance(asset, userAccount);
    elements.accountBalance.textContent = asset.balance + " " + asset.symbol;
  }
  elements.addAssetButtun.textContent = asset.symbol;
  elements.hintTextAmountUint.textContent = asset.symbol;
  elements.selectedAssetLabel.textContent = asset.symbol;
};

const connectWallet = async () => {
  console.log("click connectWallet");
  const optionsOfWallet = document.querySelectorAll(
    '.popup--wallet-connect input[name="connectwallet"]'
  );
  let selectedOption = Array.prototype.slice
    .call(optionsOfWallet)
    .find((option) => option.checked);
  console.log(selectedOption);
  if (selectedOption !== undefined) {
    elements.pannelClose.checked = true;
    switch (selectedOption.id) {
      case "metamask":
        const account = await metamask.connect();
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

elements.connectWalletButton.addEventListener("click", () => connectWallet());

elements.scrollViewList.addEventListener("click", async (el) => {
  if (el.target.parentNode.attributes.index) {
    selectedAsset = el.target.parentNode.attributes.index.value;
    await updateSelectedAsset();
    console.log("selectedAsset", selectedAsset);
  }
});
elements.nextButton.addEventListener("click", async () => {
  metamask.sendTransaction();
});

listScrollView();

(() => {
  console.log(rlp.encode([]));
})();
