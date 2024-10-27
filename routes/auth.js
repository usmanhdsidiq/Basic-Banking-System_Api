const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const jwtKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        res.send({ message: 'Autentikasi gagal' });
        return res.redirect('/login-view');
    }

    jwt.verify(token, jwtKey, (err, user) => {
        if(err) {
            res.send({ message: 'Kesalahan autentikasi' });
            return res.redirect('/login-view');
        }
        req.user = user;
        next();
    });
}

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.userLogin.create({
            data: {username, password: hashedPassword}
        });
        res.redirect('/login-view');
    } catch(error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.userLogin.findUnique({
            where: {username}
        });

        if(user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({username: user.username, id: user.id}, jwtKey, {expiresIn: '1h'});
            res.cookie('token', token, {httpOnly: true});
            res.redirect('/home-view');
        } else {
            res.redirect('/login-view');
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
    res.redirect('/login-view');
});

module.exports = router;