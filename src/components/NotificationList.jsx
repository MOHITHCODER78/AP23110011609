import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Chip, 
  Divider,
  Paper
} from '@mui/material';
import { Log } from '../middleware/logger';

// Component to show the list of notifications in a simple way
const NotificationList = ({ notifications, readIds, onMarkAsRead }) => {
  
  const handleItemClick = (notification) => {
    // Only mark as read if it's currently unread
    if (!readIds.has(notification.id)) {
      Log("frontend", "info", "component", `Clicked: ${notification.id}`);
      onMarkAsRead(notification.id);
    }
  };

  if (!notifications || notifications.length === 0) {
    return <Typography sx={{ p: 4, textAlign: 'center' }}>No notifications to show.</Typography>;
  }

  return (
    <Paper variant="outlined">
      <List disablePadding>
        {notifications.map((item, index) => {
          const isRead = readIds.has(item.id);
          
          return (
            <React.Fragment key={item.id}>
              <ListItem 
                button 
                onClick={() => handleItemClick(item)}
                sx={{ 
                  py: 2,
                  // Change background slightly if it's unread
                  backgroundColor: isRead ? 'inherit' : '#f0f7ff' 
                }}
              >
                <ListItemText
                  primary={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: isRead ? 'normal' : 'bold' }}>
                        {item.message}
                      </Typography>
                      <Chip 
                        label={item.type} 
                        size="small" 
                        variant={isRead ? 'outlined' : 'filled'}
                        color={item.type === 'Placement' ? 'primary' : 'default'}
                      />
                    </div>
                  }
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default NotificationList;


