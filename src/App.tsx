//import bgpattern from "./bg-pattern.jpeg";
const BtcSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    //xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
    xmlSpace="preserve"
    width="100%"
    height="100%"
    version="1.1"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 4091.27 4091.73"
  >
    <g id="Layer_x0020_1">
      <metadata id="CorelCorpID_0Corel-Layer" />
      <g id="_1421344023328">
        <path
          fill="#F7931A"
          fillRule="nonzero"
          d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
        />
        <path
          fill="white"
          fillRule="nonzero"
          d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
        />
      </g>
    </g>
  </svg>
);

const Item = () => (
  <div className="mb-3 cursor-pointer hover:opacity-75 text-center">
    💰 asidiisdi123121231asi123diisdi...1sd113
  </div>
);

const Widget = ({ title }: { title: string }) => (
  <div className="w-full">
    <h3 className="mb-5 text-md font-semibold text-center text-xl">{title}</h3>

    <div className="">
      {[1, 2, 3].map((index) => (
        <Item key={index} />
      ))}
    </div>
  </div>
);

const SearchBox = () => (
  <div className="py-5 rounded">
    <form className="flex space-x-4">
      <input
        type="text"
        placeholder="TX Hash / Wallet Address"
        className="bg-slate-100 p-3 rounded w-full focus-visible:outline-amber-500 text-md"
        required
      />
      <button className="px-5 py-3 bg-amber-500 rounded hover:bg-amber-400 font-semibold text-md md:text-2xl">
        🔍
      </button>
    </form>
  </div>
);

const WalletCard = () => (
  <div className="p-5 rounded mb-5 bg-slate-100">
    <h3 className="font-semibold text-xl">💰 Wallet Address</h3>
    <h4 className="mb-5">djasfi1239999JJdsa1o1...123123sdadk</h4>

    <ul className="">
      <li className="mb-1">
        <span className="font-semibold">Confirmed Transactions: </span>
        <span>4</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">Total BTC Received: </span>
        <span>4.12358900</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">Total BTC Spent: </span>
        <span>1.12359111</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">Total BTC Unspent: </span>
        <span>1.12359111</span>
      </li>
      <li>
        <span className="font-semibold">Current BTC Balance: </span>
        <span>1.12359111</span>
      </li>
    </ul>
  </div>
);

const TransactionCard = () => (
  <div className="p-5 rounded mb-5 bg-slate-100">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-xl">🔁 Transaction Hash</h3>
      <button className="text-sm bg-slate-300 py-1 p-3 rounded hover:bg-slate-400 font-semibold">
        🔔 Subscribe
      </button>
    </div>
    <h4 className="mb-5">djasfi1239999JJdsa1o1...123123sdadk</h4>

    <ul className="">
      <li className="mb-1">
        <span className="font-semibold">Received Time: </span>
        <span>123444</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">Status: </span>
        <span>Confirmed</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">No. of Confirmations: </span>
        <span>3</span>
      </li>
      <li className="mb-1">
        <span className="font-semibold">Size: </span>
        <span>11235</span>
      </li>
      <li>
        <span className="font-semibold">Total BTC Input: </span>
        <span>1.12359111</span>
      </li>
      <li>
        <span className="font-semibold">Total BTC Output: </span>
        <span>1.12359111</span>
      </li>
      <li>
        <span className="font-semibold">Total Fees: </span>
        <span>0.00009111</span>
      </li>
    </ul>
  </div>
);

const NothingToShow = () => (
  <div className="flex gap-5 items-center justify-center">
    <p className="text-5xl">🤷‍♂️</p>
    <div>
      <h1 className="text-3xl opacity-10 mb-1 font-semibold">Woops...</h1>
      <h3 className="text-xl">There is nothing to show.</h3>
    </div>
  </div>
);

const Title = () => (
  <div className="flex gap-2 items-center justify-center">
    <div className="h-10">
      <BtcSVG />
    </div>
    <h1 className="font-semibold text-xl md:text-2xl">Blockchain Scanner</h1>
  </div>
);

const Header = () => (
  <div className="flex justify-between p-3 items-center flex-col gap-y-3 flex-wrap">
    <div className="flex gap-5">
      <p className="text-sm">BTC/EUR: 19,977.55</p>
      <p className="text-sm">BTC/USD: 22,112.01</p>
    </div>

    <div className="flex gap-x-10 gap-y-5 flex-col md:flex-row">
      <div className="flex gap-3 items-center">
        <span className="text-sm">Display Currency:</span>
        <button className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold">
          EUR
        </button>
        <button className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold">
          USD
        </button>
        <button className="text-sm bg-slate-300 py-1 p-3 rounded font-semibold">
          BTC
        </button>
      </div>

      <button className="text-sm bg-slate-100 py-1 p-3 rounded hover:bg-slate-200 font-semibold">
        🌙 Dark Mode
      </button>

      <button className="text-sm bg-amber-500 py-1 p-3 rounded hover:bg-amber-400 font-semibold text-amber-900">
        🔔 Subsribed (2)
      </button>
    </div>
  </div>
);

const NotificationCard = () => (
  <div className="bg-green-400 shadow-md p-4 rounded text-md flex items-center gap-2">
    <span className="text-2xl">💸</span>
    <p>
      You have received <b>0.0244168 BTC</b>
    </p>

    <button className="p-1 cursor-pointer hover:opacity-50 ml-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

const Notifications = () => (
  <div className="absolute top-5 right-5 flex flex-col gap-3">
    {[1, 2, 3].map((item) => (
      <NotificationCard key={item} />
    ))}
  </div>
);

const Modal = () => (
  <div className="absolute top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
    <div className="fixed top-0 left-0 bg-black h-full w-full opacity-40"></div>

    <div className="w-full max-w-xl bg-slate-300 shadow-xl flex justify-between items-center flex-col rounded z-10">
      <div className="w-full max-w-xl flex justify-between items-center p-4">
        <h3 className="text-lg font-semibold">🔔 Subscribed Transactions</h3>
        <button className="p-1 cursor-pointer hover:opacity-50 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="bg-white rounded-b p-5 w-full flex flex-col gap-4">
        {[1, 2, 3].map((item) => (
          <TxListItem key={item}></TxListItem>
        ))}
      </div>
    </div>
  </div>
);

const TxListItem = () => (
  <div className="flex justify-start gap-4">
    <span className="text-sm opacity-60">2d 11h ago</span>
    <span className="mr-auto">mdasoOod1235asdJJ123...1dd1</span>
    <button className="text-sm bg-slate-300 py-1 p-3 rounded hover:bg-slate-400 font-semibold">
      🔔 Unsubscribe
    </button>
  </div>
);

function App() {
  return (
    <div className="App">
      <Header />

      <Notifications />

      <Modal />

      <div className="py-12 w-full max-w-3xl mx-auto px-3">
        <Title />

        <div>
          <SearchBox />
        </div>

        <div>
          <TransactionCard />
          <WalletCard />
        </div>

        <div className="flex flex-col md:flex-row items-around gap-y-5">
          <Widget title="📖 History" />

          <Widget title="🔍 Top Searched" />
        </div>
      </div>

      <NothingToShow />
    </div>
  );
}

export default App;
