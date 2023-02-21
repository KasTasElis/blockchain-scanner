const DataCard = ({
  title,
  subTitle,
  data,
}: {
  title: string;
  subTitle: string;
  data: { [label: string]: string | number };
}) => (
  <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-800 dark:text-gray-200">
    <h3 className="font-semibold text-xl">{title}</h3>
    <h4 className="mb-5">{subTitle}</h4>

    <ul>
      {Object.keys(data).map((key, index) => (
        <li key={index} className={data.length === index + 1 ? "mb-1" : ""}>
          <span className="font-semibold">{`${key}: `}</span>
          <span>{data[key]}</span>
        </li>
      ))}
    </ul>
  </div>
);

export { DataCard };
