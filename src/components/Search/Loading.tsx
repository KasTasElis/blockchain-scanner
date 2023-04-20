const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full p-7 gap-2">
      <div className="animate-spin text-[50px]">⌛️</div>
      <div className="font-semibold text-slate-400 dark:text-slate-200">
        Loading...
      </div>
    </div>
  );
};

export { Loading };
