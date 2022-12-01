exports.hex2bin = (hex) => {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
};

exports.bin2hex = (bin) => {
  return parseInt(bin, 2).toString(16).toUpperCase();
};

exports.bin2int = (bin) => {
  return parseInt(bin, 2);
};
