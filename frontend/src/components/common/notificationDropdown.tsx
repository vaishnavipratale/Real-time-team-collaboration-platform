import React, { JSX } from "react";

const NotificationDropdown = (): JSX.Element => {
  const notifications = [
    {
      title: "New User Registered",
      message: "A new admin user has signed up and needs verification.",
      date: "12 Jul, 2025",
    },
    {
      title: "Profile Updated",
      message: "Superadmin 'Ravi Kumar' has updated their contact info.",
      date: "10 Jul, 2025",
    },
    {
      title: "Bug Report Submitted",
      message: "A new bug report has been submitted for login issues.",
      date: "09 Jul, 2025",
    },
  ];

  return (
    <div className="absolute right-0 mt-4 md:mt-3.5 w-56 md:w-[320px] bg-white shadow-lg rounded-b-lg border border-gray-soft border-t-0 z-50">
      <div className="px-4 py-3 border-b  text-sm font-semibold text-zinc-dark">
        Notifications
      </div>
      <div className="divide-y divide-gray-soft max-h-72 overflow-y-auto">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-soft cursor-pointer"
          >
            <p className="text-sm text-gray-dark font-semibold">{item.title}</p>
            <p className="text-xs text-gray-dark/70 mt-1">{item.message}</p>
            <p className="text-xs text-gray-dark/90 mt-1">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
