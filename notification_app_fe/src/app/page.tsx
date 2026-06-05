"use client";

import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types/notification";
import { fetchNotifications } from "@/services/notificationService";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewedNotifications, setViewedNotifications] = useState<string[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("viewedNotifications") || "[]"
    );

    setViewedNotifications(stored);
  }, []);

  const markAsViewed = (id: string) => {
    if (viewedNotifications.includes(id)) {
      return;
    }

    const updated = [...viewedNotifications, id];

    setViewedNotifications(updated);

    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(updated)
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Campus Notifications
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            viewed={viewedNotifications.includes(notification.ID)}
            onClick={() => markAsViewed(notification.ID)}
          />
        ))
      )}
    </Container>
  );
}