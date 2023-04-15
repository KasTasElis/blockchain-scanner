import { useState } from "react";
import {
  Header,
  HistoryWidget,
  Modal,
  Notifications,
  SearchBox,
  Title,
  TopSearchesWidget,
} from "./components";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App dark:bg-slate-900 min-h-screen">
      <Header setShowModal={setShowModal} />

      <Notifications />

      {showModal ? <Modal setShowModal={setShowModal} /> : null}

      <div className="py-12 w-full max-w-3xl mx-auto px-3">
        <Title />

        <div>
          <SearchBox />
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-around gap-y-5 mb-7 mt-7">
          <HistoryWidget />
          <TopSearchesWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
