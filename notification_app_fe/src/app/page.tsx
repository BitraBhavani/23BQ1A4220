"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types/notification";
import { fetchNotifications } from "@/services/notificationService";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [topN, setTopN] = useState(10);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    async function loadData() {
      const data = await fetchNotifications();
      setNotifications(data);
    }

    loadData();
  }, []);

  const getWeight = (type: string) => {
    switch (type) {
      case "Placement":
        return 3;
      case "Result":
        return 2;
      case "Event":
        return 1;
      default:
        return 0;
    }
  };

  const filteredNotifications = notifications
    .filter(
      (item) =>
        filterType === "All" || item.Type === filterType
    )
    .sort((a, b) => {
      const weightDiff =
        getWeight(b.Type) - getWeight(a.Type);

      if (weightDiff !== 0) {
        return weightDiff;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, topN);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Top N</InputLabel>
          <Select
            value={topN}
            label="Top N"
            onChange={(e) =>
              setTopN(Number(e.target.value))
            }
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e) =>
              setFilterType(e.target.value)
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">
              Placement
            </MenuItem>
            <MenuItem value="Result">
              Result
            </MenuItem>
            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {filteredNotifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
          viewed={false}
          onClick={() => {}}
        />
      ))}
    </Container>
  );
}