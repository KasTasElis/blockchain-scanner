import { useSearchContext } from "../hooks";
import { Button } from "./";

type Data = { [label: string]: string | boolean | number };

const DataCard = ({ title, data }: { title: string; data: Data }) => {
  const { reset } = useSearchContext();

  return (
    <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-800 dark:text-gray-200 relative">
      <div className="absolute top-5 right-5 flex gap-3">
        <Button onClick={reset}>🔔 Subscribe</Button>
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
