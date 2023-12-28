import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';

import SearchBox from './SearchBox';
import LoadingIndicator from '../common/LoadingIndicator';

const UsersTable = () => {

  // State variables
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change in the search box
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, users]);

  // Handle row click to select a user
  const handleRowClick = (userId) => {
    setSelectedUserId(userId);
  };

  // Handle mouse enter to highlight a row
  const handleRowMouseEnter = (userId) => {
    setHoveredUserId(userId);
  };

  // Handle mouse leave to remove row highlight
  const handleRowMouseLeave = () => {
    setHoveredUserId(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
      <h2 style={{ marginRight: '20px' }}>Users Table</h2>
      <SearchBox onChange={handleFilterChange} />

  
      <div style={{ marginTop: '20px' }}>

       {loading && <LoadingIndicator />}

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && (
          <>
            {filteredUsers.length === 0 ? (
              <div style={{ marginTop: '20px', color: 'gray' }}>No results found.</div>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Company Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        component={Link}
                        to={`/user/${user.id}`}
                        style={{
                          textDecoration: 'none',
                          backgroundColor:
                            user.id === selectedUserId
                              ? '#FFEBEE'
                              : user.id === hoveredUserId
                              ? '#E3F2FD'
                              : 'inherit',
                        }}
                        onClick={() => handleRowClick(user.id)}
                        onMouseEnter={() => handleRowMouseEnter(user.id)}
                        onMouseLeave={handleRowMouseLeave}
                      >
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.company.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;