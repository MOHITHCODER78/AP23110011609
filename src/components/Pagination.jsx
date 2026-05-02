import React from 'react';
import { Pagination as MuiPagination, Stack, Box } from '@mui/material';
import { Log } from '../middleware/logger';

// This component handles the page switching at the bottom of the list
const Pagination = ({ page, count, onPageChange }) => {

  // This triggers when a user clicks a specific page number
  const handleChange = (event, value) => {
    // Logging the page movement as required
    Log("frontend", "info", "component", `Moving to page: ${value}`);

    // Send the new page number back to the main Home component
    onPageChange(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <Stack spacing={2}>
        <MuiPagination
          count={count}           // here total pages available 
          page={page}             // tells where we are present 
          onChange={handleChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default Pagination;

