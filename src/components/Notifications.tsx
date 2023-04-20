import classNames from "classnames";
import { Button } from ".";
import { TNotification, useNotifications } from "../hooks";

const NotificationCard = ({
  data,
}: {
  data: TNotification & { id: string };
}) => {
  const { dismissNotification } = useNotifications();

  const className = classNames(
    "shadow-md p-4 rounded text-md flex items-center gap-2 text-slate-100",
    {
      "bg-green-400": data.colour === "success",
      "bg-red-400": data.colour === "danger",
      "bg-orange-400": data.colour === "warning",
    }
  );

  return (
    <div className={className}>
      {/* <span className="text-2xl">💸</span> */}
      <p>{data.message}</p>

      <Button colour="clear" onClick={() => dismissNotification(data.id)}>
        ⨉
      </Button>
    </div>
  );
};

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <div className="fixed top-5 right-5 flex flex-col gap-3 z-10">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} data={notification} />
      ))}
    </div>
  );
};

export { Notifications, NotificationCard };
