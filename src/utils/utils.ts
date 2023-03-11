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

enum INPUT_TYPE {
  BTC_WALLET = "BTC_WALLET",
  BTC_TX_HASH = "BTC_TX_HASH",
  NEITHER = "NEITHER",
}

function checkIfWalletOrTransaction(str: string) {
  if (isBitcoinWalletAddress(str)) {
    return INPUT_TYPE.BTC_WALLET;
  }

  if (isBitcoinTransactionHash(str)) {
    return INPUT_TYPE.BTC_TX_HASH;
  }

  return INPUT_TYPE.NEITHER;
}

const API_BASE = "https://blockchain.info";
const TX_API = `${API_BASE}/rawtx`;
const WALLET_API = `${API_BASE}/rawaddr`;

function getApiUriBasedOnQuery(query: string) {
  if (isBitcoinWalletAddress(query)) {
    return `${WALLET_API}/${query}`;
  }

  if (isBitcoinTransactionHash(query)) {
    return `${TX_API}/${query}`;
  }

  throw new Error(
    "This does not look like a wallet or a transaction hash, so i don't know where to look for data..."
  );
}

const makeTheQuery = async (query: string) => {
  const uri = getApiUriBasedOnQuery(query);
  const resp = await fetch(uri);
  const data = await resp.json();

  return data;
};

export {
  shortenString,
  isBitcoinTransactionHash,
  isBitcoinWalletAddress,
  displayNicely,
  checkIfWalletOrTransaction,
  INPUT_TYPE,
  makeTheQuery,
};
