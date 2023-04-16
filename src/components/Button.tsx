import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  colour?: "primary" | "danger" | "light" | "medium" | "clear";
  size?: "medium" | "large";
};

const Button = ({
  children,
  colour = "light",
  size = "medium",
  ...rest
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
    <button className={classList} {...rest}>
      {children}
    </button>
  );
};

export { Button };
