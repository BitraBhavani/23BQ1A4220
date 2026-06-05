import { Card, CardContent, Typography, Chip } from "@mui/material";
import { Notification } from "@/types/notification";

interface Props {
  notification: Notification;
}

export default function NotificationCard({ notification }: Props) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Chip
          label={notification.Type}
          color={
            notification.Type === "Placement"
              ? "success"
              : notification.Type === "Result"
              ? "primary"
              : "warning"
          }
          sx={{ marginBottom: 1 }}
        />

        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}