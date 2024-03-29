import {
  getMostRecentSearches,
  getTopSearches,
  useSearchContext,
  useSearchHistory,
} from "../hooks";
import { displayNicely } from "../utils";

const Widget = ({ title, data }: { title: string; data: string[] }) => {
  const { setValue } = useSearchContext();

  return (
    <div className="w-full dark:text-slate-200">
      <h3 className="mb-5 text-md font-semibold text-center text-xl">
        {title}
      </h3>

      <div className="">
        {data.map((item, index) => (
          <div
            key={index}
            className="mb-3 cursor-pointer hover:opacity-75 text-center"
            onClick={() => setValue(item)}
          >
            {displayNicely(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

const HistoryWidget = () => {
  const { searches } = useSearchHistory();
  const data = getMostRecentSearches(searches);

  if (!data.length) return null;

  return <Widget title="📖 History" data={data} />;
};

const TopSearchesWidget = () => {
  const { searches } = useSearchHistory();
  const data = getTopSearches(searches);

  if (!data.length) return null;

  return <Widget title="🔍 Top Searches" data={data} />;
};

export { HistoryWidget, TopSearchesWidget };
