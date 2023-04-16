import { useEffect } from "react";
import { Button } from "./";

const TxListItem = () => (
  <div className="flex justify-start gap-4">
    <span className="text-sm opacity-60">2d 11h ago</span>
    <span className="mr-auto hover:opacity-50 cursor-pointer">
      mdasoOod1235asdJJ123...1dd1
    </span>
    <Button colour="danger">🔔 Unsubscribe</Button>
  </div>
);

const Modal = ({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // handle close modal with ESC btn
  useEffect(() => {
    const handler = function (event: KeyboardEvent) {
      if (event.key === "Escape" || event.keyCode === 27) {
        // do something when escape key is pressed
        //console.log("Escape key pressed");
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="absolute top-0 left-0 min-h-screen min-w-full flex items-center justify-center">
      <div
        onClick={() => setShowModal(false)}
        className="fixed top-0 left-0 bg-black h-full w-full opacity-40 dark:opacity-60 z-30"
      ></div>

      <div className="w-full max-w-xl bg-slate-300 shadow-xl flex justify-between items-center flex-col rounded z-40 dark:bg-slate-800 dark:text-gray-200">
        <div className="w-full max-w-xl flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">🔔 Subscribed Transactions</h3>
          <Button colour="clear" onClick={() => setShowModal(false)}>
            ⨉
          </Button>
        </div>
        <div className="bg-white rounded-b p-5 w-full flex flex-col gap-4 dark:bg-slate-700">
          {[1, 2, 3].map((item) => (
            <TxListItem key={item}></TxListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Modal };
