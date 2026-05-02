import React from 'react';
import { Typography, Card, CardContent, Stack, Box } from '@mui/material';
import { getPriorityNotifications } from '../utils/priorityHelper';

// This component shows the top 10 most important notifications
const PriorityInbox = ({ notifications }) => {
  // We use our helper to sort and get the top 10 items
  const priorityItems = getPriorityNotifications(notifications);

  // If there's nothing to show, don't render anything
  if (!priorityItems || priorityItems.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Important Notifications
      </Typography>

      {/* Stack helps us put cards one after another with spacing */}
      <Stack spacing={1.5}>
        {priorityItems.map((item) => (
          <Card key={item.id} variant="outlined" sx={{ borderColor: '#ffe082' }}>
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                  {item.type.toUpperCase()}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(item.timestamp).toLocaleDateString()}
                </Typography>
              </div>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {item.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default PriorityInbox;

