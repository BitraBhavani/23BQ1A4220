"use client";

import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types/notification";
import { fetchNotifications } from "@/services/notificationService";

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

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
          />
        ))
      )}
    </Container>
  );
}