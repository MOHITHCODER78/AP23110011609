import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Box } from '@mui/material';
import { Log } from '../middleware/logger';

const NotificationList = ({ notifications, readIds, onMarkAsRead }) => {
  if (!notifications || notifications.length === 0) {
    return <Typography sx={{ py: 4 }}>No notifications found.</Typography>;
  }

  return (
    <List>
      {notifications.map((item, index) => (
        <React.Fragment key={item.ID}>
          <ListItem 
            onClick={() => {
              Log("frontend", "info", "component", `Clicked item: ${item.ID}`);
              onMarkAsRead(item.ID);
            }}
            sx={{ 
              cursor: 'pointer',
              py: 2,
              px: 0,
              '&:hover': { bgcolor: '#f9f9f9' }
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: readIds.has(item.ID) ? 'normal' : 'bold' }}>
                  {item.Message}
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {item.Type}
                  </Typography>
                  <Typography variant="caption">
                    {item.Timestamp}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
          {index < notifications.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;




