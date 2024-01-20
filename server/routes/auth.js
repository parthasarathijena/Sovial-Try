const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

require('../dbconn/conn')
const User = require('../models/userSchema')


//register
router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(422).json({ message: 'Enter full Credential' })

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = new User({ username, email, password:hashed })

    try {
        const response = await User.findOne({ email: email } && { username: username })
        if (response)
            return res.status(422).json({ message: 'Email or username already exist' })
        const userSave = await user.save();
        if (userSave)
            return res.status(200).json({ message: 'User Register' })
        else
            return res.status(422).json({ message: 'Not Register' })
    } catch (err) {
        console.log(err);
    }
})


//login
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if ( !email || !password)
        return res.status(404).json({ message: 'Enter full Credential' })


    try {
        const response = await User.findOne({ email: email })
        if (response){
            const check = await bcrypt.compare(password,response.password);
            if(check){
                console.log(response);
                return res.status(200).json(response)}
            else
            return res.status(404).json()

        }
        else
            return res.status(404).json()
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;