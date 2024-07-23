"use client";
import React, { useEffect, useState } from "react";
import SingleNotification from "./SingleNotification";
import notificationService from "@/utils/apiCalls/notificationService";

function NotificationBar() {
  const [notifications, setNotifications] = useState<any>(null);

  useEffect(() => {
    (async function () {
      try {
        const notifications = await notificationService.getNotifications();
        setNotifications(notifications);
      } catch (error: any) {
        alert(error.messaage);
      }
    })();
  }, []);

  if (!notifications) return;

  return (
    <div>
      {notifications.length &&
        notifications.map((notification: any) => {
          const {
            _id,
            doneByUser,
            notificationMessage,
            entityType,
            entityId,
            updatedAt,
          } = notification;
          const { username, firstName, lastName, profilePicUrl } = doneByUser;

          return (
            <SingleNotification
              key={_id}
              username={username}
              firstName={firstName}
              lastName={lastName}
              profilePicUrl={profilePicUrl}
              notificationMessage={notificationMessage}
              entityType={entityType}
              entityId={entityId}
              updatedAt={updatedAt}
            />
          );
        })}
    </div>
  );
}

export default NotificationBar;
