import { INPUT_TYPE } from "./consts";

function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

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
  const asJson = await resp.json();

  if (resp.status !== 200) {
    throw new Error("Blockchain API returned no results for this query.");
  }

  return asJson;
};

export {
  shortenString,
  isBitcoinTransactionHash,
  isBitcoinWalletAddress,
  displayNicely,
  checkIfWalletOrTransaction,
  INPUT_TYPE,
  makeTheQuery,
  formatTimestamp,
};
