import { formatTimestamp } from "../../utils";

type TWalletData = {
  hash160: string;
  address: string;
  n_tx: number;
  total_received: number;
  total_sent: number;
  final_balance: number;
};

export const preProcessWalletData = (
  walletJsondata: TWalletData,
  currencyConverter: (satoshis: number) => string
) => {
  const { hash160, address, n_tx, total_received, total_sent, final_balance } =
    walletJsondata;

  return {
    "Wallet Hash": hash160,
    "Wallet Address": address,
    "Number of Transactions": n_tx,
    "Total Received": currencyConverter(total_received),
    "Total Sent": currencyConverter(total_sent),
    "Wallet Balance": currencyConverter(final_balance),
  };
};

type TTransactionData = {
  hash: string;
  fee: number;
  time: number;
  out: { addr: string; value: number }[];
};

export const preProcessTransactionData = (
  transactionJsondata: TTransactionData,
  currencyConverter: (satoshis: number) => string
) => {
  const { hash, fee, time, out } = transactionJsondata;

  const outAddrs = out.reduce((acc: any, curr: any, index: number) => {
    acc[`Out BTC Address ${index + 1}`] = curr.addr;
    return acc;
  }, {});

  const totalTxValue = out.reduce(
    (acc: number, curr: { value: number }) => acc + curr.value,
    0
  );

  return {
    "TX Hash": hash,
    "TX Fee": currencyConverter(fee),
    "Total TX Value": currencyConverter(totalTxValue),
    "Created At": formatTimestamp(time),
    ...outAddrs,
  };
};
