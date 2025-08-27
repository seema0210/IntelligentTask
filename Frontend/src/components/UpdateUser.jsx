import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom';

const UpdateUser = ({ open, handleClose, updateData, setUpdateData }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        age: '',
        message: ''
    });

    const getUsers = async() => {
    const response = await fetch("http://localhost:3001")
    const res = await response.json()
    return res
  }

//   useEffect(() => {
//     getUsers()
//   }, [newUser])


    useEffect(() => {
        if (updateData) {
            setNewUser({
                name: updateData.name || '',
                email: updateData.email || '',
                age: updateData.age || '',
                message: updateData.message || ''
            })
        }
    }, [updateData])

    const handelChange = (e) => {
        setNewUser((preData) => ({
            ...preData,
            [e.target.name]: e.target.value
        })
        )
    }

    const updateUser = async () => {
        // let obj = {
        //     name : updateData.name,
        //     email : updateData.email,
        //     age : updateData.age,
        //     message : updateData.message
        // }
        try {
            const response = await fetch(`http://localhost:3001/updateUser/${updateData._id}`, { // mongodb documents id : _id
                method: 'PUT',
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const res = await response.json()
            console.log('updated res', res);
            return res

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => {

        updateUser().then((data) => setNewUser(data))
        handleClose()
        // if (newUser.name && newUser.email && newUser.age) {
        //     handleAddUser(newUser);
        //     setNewUser({ name: '', email: '', age: '' });
        // }
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
                    name='name'
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newUser.name}
                    onChange={handelChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    name='email'
                    fullWidth
                    variant="outlined"
                    value={newUser.email}
                    onChange={handelChange}
                />
                <TextField
                    margin="dense"
                    label="Age"
                    name='age'
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newUser.age}
                    onChange={handelChange}
                />
                <TextField
                    margin="dense"
                    label="Message"
                    name='message'
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={newUser.message}
                    onChange={handelChange}
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