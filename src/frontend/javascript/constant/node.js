export const getUrl = (asset) => {
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