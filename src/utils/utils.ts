function shortenString(str: string) {
  if (str.length <= 22) {
    return str;
  }
  const firstChars = str.slice(0, 18);
  const lastChars = str.slice(-4);
  return `${firstChars}...${lastChars}`;
}

function isBitcoinTransactionHash(str: string) {
  const regex = /\b[0-9A-Fa-f]{64}\b/;
  return regex.test(str);
}

function isBitcoinWalletAddress(str: string) {
  const regex = /\b(bc1|[13])[a-zA-HJ-NP-Z0-9]{26,90}\b/;
  return regex.test(str);
}

function returnSuitableIcon(str: string) {
  if (isBitcoinTransactionHash(str)) {
    return "🔁";
  }
  if (isBitcoinWalletAddress(str)) {
    return "💰";
  }
  return "🤷‍♂️";
}

function displayNicely(str: string) {
  const icon = returnSuitableIcon(str);
  const shorten = shortenString(str);

  return `${icon} ${shorten}`;
}

export {
  shortenString,
  isBitcoinTransactionHash,
  isBitcoinWalletAddress,
  displayNicely,
};
