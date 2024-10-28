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
        res.send({ message: 'Autentikasi gagal atau anda belum login' });
        return res.redirect('/login');
    }

    jwt.verify(token, jwtKey, (err, user) => {
        if(err) {
            res.send({ message: 'Kesalahan autentikasi' });
            return res.redirect('/login');
        }
        req.user = user;
        next();
    });
}

router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        const checkUser = await prisma.userLogin.findUnique({
            where: {username},
        })

        if(checkUser) {
            return res.status(400).json({message: 'Username sudah digunakan'});
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.userLogin.create({
                data: {username, password: hashedPassword}
            });
            res.status(201).json({message: 'Registrasi berhasil, silahkan login'});
        }
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
            res.redirect('/auth/authenticate');
        } else {
            return res.status(404).json({message: 'Username atau password salah'});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

router.get('/auth/authenticate', authenticateToken, (req, res) => {
    const accesstoken = req.cookies.token;
    res.send({ message: 'Autentikasi berhasil', user: req.user, accesstoken });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;