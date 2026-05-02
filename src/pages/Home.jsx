import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import NotificationList from '../components/NotificationList';
import PriorityInbox from '../components/PriorityInbox';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { getNotifications } from '../api/notificationApi';

const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');
  const [totalPages, setTotalPages] = useState(1);
  const [readIds, setReadIds] = useState(new Set());

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotifications(page, 10, type);
      if (Array.isArray(data)) {
        setNotifications(data);
        setTotalPages(1); 
      } else {
        setNotifications(data.notifications || []);
        setTotalPages(data.totalPages || 1);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching data.");
      setLoading(false);
    }
  }, [page, type]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = (id) => {
    setReadIds(prev => new Set(prev).add(id));
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Campus Notifications
      </Typography>

      {type === 'All' && !loading && notifications.length > 0 && (
        <PriorityInbox notifications={notifications} />
      )}

      <Box sx={{ mt: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
          <Typography variant="h6">Latest Notifications</Typography>
          <FilterBar currentType={type} onTypeChange={(t) => { setType(t); setPage(1); }} />
        </div>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <NotificationList notifications={notifications} readIds={readIds} onMarkAsRead={handleMarkAsRead} />
            <Pagination page={page} count={totalPages} onPageChange={setPage} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;

