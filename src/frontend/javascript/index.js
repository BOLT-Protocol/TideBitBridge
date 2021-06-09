import * as rlp from "rlp";

const metamask = require("./utils/ethereum");
const rpc = require("./utils/rpc");
const elements = require("./dom/elements");
const scrollViewItem = require("./component/scroll_item");
const _assets = require("./constant/assets");

const assets = _assets.assets.map((_asset) => ({ ..._asset }));

let userAccount;
let selectedAsset = 2; // index
let chainId;

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
          // ++ TODO
          const _chainId = await metamask.getChainId();
          console.log(_chainId);
          if (_chainId) chainId = _chainId;
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
  const [error, result] = await metamask.sendTransaction(
    userAccount,
    elements.inputAmount.value,
    assets[selectedAsset]
  );
  if (error) {
    console.log(error);
    elements.alertDialogButton.checked = true;
    elements.dialogContent.classList.remove("success");
    elements.dialogContent.classList.add("failed");
    elements.dialogHintText.textContent = "Transaction Failed";
  } else {
    console.log(result);
    elements.alertDialogButton.checked = true;
    elements.dialogContent.classList.remove("failed");
    elements.dialogContent.classList.add("success");
    elements.dialogHintText.textContent = "Transaction Success";
    elements.dialogHintTextBox.insertAdjacentHTML(
      "afterend",
      `<a class=".title" href="https://${assets[selectedAsset].network}.etherscan.io/tx/${result}" target="_blank">${result}</div>`
    );
  }
});

elements.alertDialog.addEventListener("click", () => {
  elements.pannelClose.checked = true;
});

ethereum.on("accountsChanged", (accounts) => {
  window.location.reload();
  // Handle the new accounts, or lack thereof.
  console.log(accounts);
});

ethereum.on("chainChanged", (_chainId) => {
  console.log(_chainId);
  chainId = _chainId;
  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload();
});

listScrollView();

(() => {
  const data = rlp.encode("0xd86b75c7");
  // console.log(data);
  // console.log(data.toString("hex"));
  // console.log(rlp.encode([]));
  elements.alertDialogButton.checked = true;
  elements.dialogContent.classList.remove("failed");
  elements.dialogContent.classList.add("success");
  elements.dialogHintText.textContent = "Transaction Success";
  elements.dialogHintTextBox.insertAdjacentHTML('afterend', `<a class=".title" href="https://ropsten.etherscan.io/tx/0x5586821402ab166129c2b865b3b1f9c4bbc6c49450305135c3784ff209c2d093" target="_blank">0x5586821402ab166129c2b865b3b1f9c4bbc6c49450305135c3784ff209c2d093</div>`);
})();
