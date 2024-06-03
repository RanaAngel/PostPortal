const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Users = require('../models/User');


//get all users form database
const getAllUsers = async (req, res) =>{
    try {
        const users = await Users.find();
        res.status(200).json({users});
            if(!users || users.length === 0){
                return res.status(404).json({message:'No Users Found'});

            }
        
    } catch (error) {
        
    }
};



router.post('/users', async (req, res) => {
    try {
        const getUsers = await getAllUsers();
        console.log(getUsers);
    } catch (error) {
       
    }
});

module.exports = router;
