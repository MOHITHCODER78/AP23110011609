import { Log } from '../middleware/logger';

export const getPriorityNotifications = (notifications) => {
  try {
    Log("frontend", "info", "utils", "Sorting notifications by priority");

    if (!notifications || !Array.isArray(notifications)) return [];

    const ranks = {
      'Placement': 1,
      'Result': 2,
      'Event': 3
    };

    const sorted = [...notifications].sort((a, b) => {
      const rankA = ranks[a.Type] || 4;
      const rankB = ranks[b.Type] || 4;

      if (rankA !== rankB) {
        return rankA - rankB; 
      }

      const dateA = new Date(a.Timestamp).getTime();
      const dateB = new Date(b.Timestamp).getTime();

      return dateB - dateA; 
    });

    return sorted.slice(0, 10);
  } catch (error) {
    Log("frontend", "error", "utils", `Sorting failed: ${error.message}`);
    return notifications.slice(0, 10);
  }
};


