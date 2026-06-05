import { Card, CardContent, Typography, Chip } from "@mui/material";
import { Notification } from "@/types/notification";

interface Props {
  notification: Notification;
  viewed: boolean;
  onClick: () => void;
}

export default function NotificationCard({
  notification,
  viewed,
  onClick,
}: Props) {
  return (
    <Card
      onClick={onClick}
      sx={{
        marginBottom: 2,
        cursor: "pointer",
        opacity: viewed ? 0.6 : 1,
        border: viewed ? "1px solid gray" : "2px solid #1976d2",
      }}
    >
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