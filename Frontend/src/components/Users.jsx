import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import CreateUser from './CreateUser'; // Adjust the import path as needed
import UpdateUser from './UpdateUser';

const Users = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async() => {
    const response = await fetch("http://localhost:3001")
    const res = await response.json()
    return res
  }

  useEffect(()=> {
    getUsers().then((data) => setUsers(data))
  },[])
console.log('all data', users);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUpdate = () => {
    setUpdateOpen(false);
  };

  const handleAddUser = (userData) => {
    setUsers([...users, { ...userData, id: users.length + 1, messge: 'Hii ' + userData.name }]);
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #fafbfd 0%, #f1f3f6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: isMobile ? 1 : 3
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: isMobile ? '100%' : '70%',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.dark',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            size={isMobile ? "small" : "medium"}
          >
            Add User
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Message</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.message}</TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small"
                    onClick={() => setUpdateOpen(true)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      size="small"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <CreateUser 
        open={open} 
        handleClose={handleClose} 
        handleAddUser={handleAddUser} 
      />

      <UpdateUser
      open={updateOpen}
      handleClose={handleCloseUpdate} 
      />
    </Box>
  );
}

export default Users;