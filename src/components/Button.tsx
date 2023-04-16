import classNames from "classnames";

type TButton = {
  children: React.ReactNode;
  colour?: "primary" | "danger" | "light" | "medium";
  size?: "medium" | "large";
  onClick?: () => void;
};

const Button = ({
  children,
  colour = "light",
  size = "medium",
  onClick = () => {},
}: TButton) => {
  const classList = classNames(
    "rounded font-semibold hover:opacity-70 transition-all",
    {
      "text-sm py-1 px-3": size === "medium",
      "text-md py-3 px-5": size === "large",
      "bg-amber-500 text-amber-900": colour === "primary",
      "bg-slate-200 text-slate-900 dark:bg-slate-400 dark:text-slate-200":
        colour === "light",
      "bg-slate-400 text-slate-800 dark:bg-slate-600 dark:text-slate-200":
        colour === "medium",
      "bg-red-500 text-slate-100": colour === "danger",
    }
  );

  return (
    <button onClick={() => onClick()} className={classList}>
      {children}
    </button>
  );
};

export { Button };
