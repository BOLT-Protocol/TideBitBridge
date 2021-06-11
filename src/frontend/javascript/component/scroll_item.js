const scrollViewItem = (asset, selectedAsset,i) => {
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

  module.exports = scrollViewItem;