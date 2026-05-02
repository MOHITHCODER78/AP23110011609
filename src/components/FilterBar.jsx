import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Log } from '../middleware/logger';

// This bar lets the user choose which types of notifications they want to see
const FilterBar = ({ currentType, onTypeChange }) => {

  // This runs when user changes the filter
  const handleChange = (event) => {
    const newType = event.target.value;

    // here we log the filter change so the server knows what the user is looking for
    Log("frontend", "info", "component", `User filtered by: ${newType}`);

    // here we  tells the main page to update the list based on this new type
    onTypeChange(newType);
  };

  return (
    <Box sx={{ minWidth: 200, mb: 3 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="type-filter-label">Filter by Type</InputLabel>
        <Select
          labelId="type-filter-label"
          id="type-filter"
          value={currentType}
          label="Filter by Type"
          onChange={handleChange}
        >
          {/* These are the specific categories requested in the task */}
          <MenuItem value="All">All Notifications</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;

