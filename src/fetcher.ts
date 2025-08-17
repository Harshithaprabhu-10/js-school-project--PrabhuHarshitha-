import type { TimelineEvent } from "./types.js";

export const loadEvents = async (): Promise<TimelineEvent[]> => {
  try {
    const response = await fetch("./data/events.json");
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
