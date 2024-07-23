"use client";
import * as React from "react";
import Badge from "@mui/material/Badge";
import notificationService from "@/utils/apiCalls/notificationService";

type props = {
  children: React.ReactNode;
};

export default function NotificationBadge({ children }: props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    (async function () {
      try {
        const notificationData = await notificationService.getNotifications();
        let count = 0;
        notificationData.forEach((notification: any) => {
          if (!notification.isRead) count++;
        });

        setCount(count);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, []);

  return (
    <>
      <Badge badgeContent={count} color="primary">
        {children}
      </Badge>
    </>
  );
}
