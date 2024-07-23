"use client";
import * as React from "react";
import Badge from "@mui/material/Badge";
import messageService from "@/utils/apiCalls/messageService";

type props = {
  children: React.ReactNode;
};

export default function MessagesBadge({ children }: props) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    (async function () {
      try {
        const unreadCount = await messageService.getUnreadCount();
        setCount(unreadCount);
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
