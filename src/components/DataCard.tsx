import { useSearchContext } from "../utils";

type Primitives = string | number | boolean | Data | Primitives[];
export type Data = { [label: string]: Primitives };

const DataCard = ({
  title,
  subTitle,
  data,
}: {
  title: string;
  subTitle?: string;
  data: Data;
}) => {
  const { reset } = useSearchContext();

  return (
    <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-800 dark:text-gray-200 relative">
      <button
        onClick={reset}
        className="bg-slate-200 px-3 py-1 absolute top-3 right-3 rounded hover:bg-slate-300"
      >
        ⨉
      </button>

      <h3 className="font-semibold text-xl">{title}</h3>
      <h4 className="mb-5">{subTitle}</h4>

      {/* <ul>
      {Object.keys(data).map((key, index) => (
        <li key={index} className={data.length === index + 1 ? "mb-1" : ""}>
          <span className="font-semibold">{`${key}: `}</span>
          <span>{data[key]}</span>
        </li>
      ))}
    </ul> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export { DataCard };
