import { Button } from ".";

const NotificationCard = () => (
  <div className="bg-green-400 shadow-md p-4 rounded text-md flex items-center gap-2">
    <span className="text-2xl">💸</span>
    <p>
      You have received <b>0.0244168 BTC</b>
    </p>

    <Button colour="clear">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  </div>
);

const Notifications = () => (
  <div className="absolute top-5 right-5 flex flex-col gap-3 z-10">
    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
      <NotificationCard key={item} />
    ))}
  </div>
);

export { Notifications, NotificationCard };
