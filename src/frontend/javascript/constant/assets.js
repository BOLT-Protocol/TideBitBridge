export const assets = [
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
    chainId: "0x1",
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
    chainId: "0x3",
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
