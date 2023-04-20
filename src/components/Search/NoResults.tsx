const NoResults = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-7 gap-2">
      <div className="text-[50px]">🤷‍♂️</div>
      <div className="font-semibold text-slate-400 dark:text-slate-200">
        {error}
      </div>
    </div>
  );
};

export { NoResults };
