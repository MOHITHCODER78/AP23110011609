import { Log } from '../middleware/logger';

export const getPriorityNotifications = (notifications) => {
  try {
    // here we log that we are starting the sorting process
    Log("frontend", "info", "utils", "Sorting notifications by priority");

    if (!notifications || !Array.isArray(notifications)) return [];

    // Assigning a rank to each type so we can compare them easily
    const ranks = {
      'Placement': 1,
      'Result': 2,
      'Event': 3
    };

    // Create a copy and sort it
    const sorted = [...notifications].sort((a, b) => {
      // Get the rank for each item (default to 4 if it's an unknown type)
      const rankA = ranks[a.type] || 4;
      const rankB = ranks[b.type] || 4;

      // first we check priority first
      if (rankA !== rankB) {
        return rankA - rankB; // Smaller number (higher priority) comes first
      }

      // second If it's the same type, check which one is newer
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();

      return dateB - dateA; // Newest date comes first
    });

    // Take only the top 10 for the Priority Inbox
    return sorted.slice(0, 10);
  } catch (error) {
    // If something breaks, we log it and just return the first 10 unsorted
    Log("frontend", "error", "utils", `Sorting failed: ${error.message}`);
    return notifications.slice(0, 10);
  }
};

