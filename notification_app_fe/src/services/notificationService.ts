import { Notification } from "@/types/notification";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

export async function fetchNotifications(): Promise<Notification[]> {
  const response = await fetch(`${API_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();

  return data.notifications;
}