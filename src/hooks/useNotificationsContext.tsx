import { createContext, useContext, useState } from "react";

export type TNotification = {
  colour?: "success" | "danger" | "warning";
  message: string;
};

type TNotificationsContext = {
  showNotification: (notification: TNotification) => void;
  dismissNotification: (id: string) => void;
  notifications: (TNotification & { id: string })[];
};

const initialState = {
  showNotification: (notification: TNotification) => {},
  dismissNotification: (id: string) => {},
  notifications: [],
};

const NotificationsContext = createContext<TNotificationsContext>(initialState);

const NotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<
    (TNotification & { id: string })[]
  >([]);

  const dismissNotification = (id: string) => {
    setNotifications((oldNotifications) =>
      oldNotifications.filter((notification) => notification.id !== id)
    );
  };

  const showNotification = (notification: TNotification) => {
    const id = Math.random().toString(36).slice(2);
    const colour = notification.colour || "success";
    const newNotification = { ...notification, colour, id };
    setNotifications((oldNotifications) => [
      newNotification,
      ...oldNotifications,
    ]);

    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  };

  return (
    <NotificationsContext.Provider
      value={{ dismissNotification, showNotification, notifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => useContext(NotificationsContext);

export { useNotifications, NotificationsContextProvider };
