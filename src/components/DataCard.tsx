const DataCard = ({
  title,
  subTitle,
  data,
}: {
  title: string;
  subTitle: string;
  data: { label: string; value: string }[];
}) => (
  <div className="p-5 rounded mb-5 bg-slate-100 dark:bg-slate-800 dark:text-gray-200">
    <h3 className="font-semibold text-xl">{title}</h3>
    <h4 className="mb-5">{subTitle}</h4>

    <ul>
      {data.map((item, index) => (
        <li key={index} className={data.length === index + 1 ? "mb-1" : ""}>
          <span className="font-semibold">{`${item.label}: `}</span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  </div>
);

export { DataCard };
