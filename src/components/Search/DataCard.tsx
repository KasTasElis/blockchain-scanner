import { Button } from "..";
import { useNotifications, useSearchContext } from "../../hooks";

type Data = { [label: string]: string | boolean | number };

const DataCard = ({ title, data }: { title: string; data: Data }) => {
  const { reset } = useSearchContext();
  const { showNotification } = useNotifications();

  return (
    <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-200 text-slate-800 relative">
      <div className="absolute top-5 right-5 flex gap-3">
        <Button
          onClick={() => showNotification({ message: "Subscribe Success! 😊" })}
        >
          🔔 Subscribe
        </Button>
        <Button colour="danger" onClick={reset}>
          ⨉
        </Button>
      </div>

      <h3 className="font-semibold text-xl">{title}</h3>

      <div className="border-b my-5 border-slate-300"></div>

      <ul>
        {Object.entries(data).map(([key, value], index) => (
          <li key={index} className="flex justify-between mb-2">
            <strong>{key}: </strong>
            <span className="text-align-right">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DataCard };
