export const randomID = (n) => {
  var ID = "";
  var text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  n = parseInt(n);
  if (!(n > 0)) {
    n = 8;
  }
  while (ID.length < n) {
    ID = ID.concat(text.charAt(parseInt(Math.random() * text.length)));
  }
  return ID;
};

export const to = (promise) => {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err, null]);
};

export const pad = (data, length) => {
  if (data.startsWith("0x")) {
    data = data.slice(2);
  }
  while (data.length < (length || 64)) {
    data = "0" + data;
  }
  return data;
};

export const request = (opts) => {
  const xhr = new XMLHttpRequest();
  // xhr.responseType = "arraybuffer";
  if (opts.responseType === "arraybuffer") {
    xhr.responseType = "arraybuffer";
  }
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      // only run if the request is complete
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        // If successful
        opts.responseType === "arraybuffer"
          ? resolve(new Uint8Array(xhr.response))
          : resolve(JSON.parse(xhr.responseText));
      } else {
        // If false
        reject(xhr.response);
      }
    };
    // Setup HTTP request
    xhr.open(opts.method || "GET", opts.url, true);
    if (opts.headers) {
      Object.keys(opts.headers).forEach((key) =>
        xhr.setRequestHeader(key, opts.headers[key])
      );
    }
    // Send the request
    if (opts.contentType === "application/json") {
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(opts.payload));
    } else {
      xhr.send(opts.payload);
    }
  });
};

export const toEther = (amount, unit) => {
  switch (unit) {
    case "wei":
      return amount / Math.pow(10, 18);
    case "gwei":
      return amount / Math.pow(10, 9);
  }
};

export const toWei = (amount, unit) => {
  switch (unit) {
    case "ether":
      return amount * Math.pow(10, 18);
    case "gwei":
      return amount * Math.pow(10, 9);
  }
};
const bitnot = (bn) => {
  bn = -bn;
  var bin = bn.toString(2);
  var prefix = "";
  while (bin.length % 8) {
    bin = "0" + bin;
  }
  if ("1" === bin[0] && -1 !== bin.slice(1).indexOf("1")) {
    prefix = "11111111";
  }
  bin = bin
    .split("")
    .map(function (i) {
      return "0" === i ? "1" : "0";
    })
    .join("");
  return BigInt("0b" + prefix + bin) + BigInt(1);
};

export const bnToHex = (bn) => {
  let pos = true;
  bn = BigInt(bn);

  // I've noticed that for some operations BigInts can
  // only be compared to other BigInts (even small ones).
  // However, <, >, and == allow mix and match
  if (bn < 0) {
    pos = false;
    bn = bitnot(bn);
  }

  var base = 16;
  var hex = bn.toString(base);
  if (hex.length % 2) {
    hex = "0x0" + hex;
  }

  // Check the high byte _after_ proper hex padding
  var highbyte = parseInt(hex.slice(0, 2), 16);
  var highbit = 0x80 & highbyte;

  if (pos && highbit) {
    // A 32-byte positive integer _may_ be
    // represented in memory as 33 bytes if needed
    hex = "0x" + hex;
  }

  return hex;
};

export const erc20ContractData = (funcName, contract, amount) => {
  const data =
    funcName +
    pad(contract, 64) +
    pad(bnToHex(toWei(amount, "ether")), 64);
    console.log('funcName', funcName);
    console.log('data', data);
  return data;
};
