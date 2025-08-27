import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const UpdateUser = ({ open, handleClose, handleAddUser }) => {
    const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });

    const handleSubmit = () => {
        if (newUser.name && newUser.email && newUser.age) {
            handleAddUser(newUser);
            setNewUser({ name: '', email: '', age: '' });
        }
    };

    const handleCancel = () => {
        setNewUser({ name: '', email: '', age: '' });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    sx={{ mt: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newUser.age}
                    onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Message"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={newUser.message}
                    onChange={(e) => setNewUser({ ...newUser, message: e.target.value })}
                    placeholder="Enter a custom message for the user"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                {/* <Link to='/update'> */}
                <Button onClick={handleSubmit} variant="contained">
                    Update User
                </Button>
                {/* </Link> */}
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUser;