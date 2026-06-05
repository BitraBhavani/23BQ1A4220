import { Notification } from "@/types/notification";

export async function fetchNotifications(): Promise<Notification[]> {
  const response = await fetch("/api/notifications");

  const data = await response.json();

  if (!data.notifications) {
    console.error(data);
    return [];
  }

  return data.notifications;
}