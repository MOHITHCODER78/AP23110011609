import React from 'react';
import { Typography, Card, CardContent, Stack, Box } from '@mui/material';
import { getPriorityNotifications } from '../utils/priorityHelper';

const PriorityInbox = ({ notifications }) => {
  const priorityItems = getPriorityNotifications(notifications);
  if (!priorityItems || priorityItems.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Important Notifications
      </Typography>
      <Stack spacing={2}>
        {priorityItems.map((item) => (
          <Card key={item.ID} variant="outlined" sx={{ borderLeft: '4px solid black' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  {item.Type?.toUpperCase()}
                </Typography>
                <Typography variant="caption">{item.Timestamp}</Typography>
              </div>
              <Typography variant="body2">{item.Message}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default PriorityInbox;



