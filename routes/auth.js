const express = require('express');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const jwtKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, jwtKey, (err, user) => {
        if(err) {
            return res.redirect('/login');
        }
        req.userLogin = userLogin;
        next();
    });
}

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrpt.hash(password, 10);

    try {
        await prisma.userLogin.create({
            data: {username, password: hashedPassword}
        });
        res.redirect('/login');
    } catch(error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const userLogin = await prisma.userLogin.findUnique({
            where: {username}
        });

        if(userLogin && await bcrypt.compare(password, userLogin.password)) {
            const token = jwt.sign({username}, jwtKey);
            res.cookie('token', token, {httpOnly: true});
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

router.get('/auth/authenticate', authenticateToken, (req, res) => {
    res.send({ message: 'Autentikasi berhasil', user: req.user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;