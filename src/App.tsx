import { useEffect, useState } from "react";
import {
  Header,
  HistoryWidget,
  Modal,
  Notifications,
  Search,
  Title,
  TopSearchesWidget,
} from "./components";

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    window.particlesJS.load("particles-js", "./particles.json");
  }, []);

  return (
    <div className="App dark:bg-slate-900 min-h-screen">
      <div
        id="particles-js"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
      ></div>

      <div className="container relative z-40">
        <Header setShowModal={setShowModal} />

        <Notifications />

        {showModal ? <Modal setShowModal={setShowModal} /> : null}

        <div className="py-12 w-full max-w-3xl mx-auto px-3">
          <Title title="Blockchain Scanner" />

          <Search />

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-around gap-y-5 mb-7 mt-7">
            <HistoryWidget />
            <TopSearchesWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
