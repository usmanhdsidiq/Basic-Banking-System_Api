const express = require('express');
const router = express.Router();

/** 
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Menambahkan user dan profil baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   identity_type:
 *                     type: string  
 *                   identity_number:
 *                     type: number
 *                   address:
 *                     type: string
 *             example:
 *              name: Who Are You
 *              email: whoareyou@mail.com
 *              password: ******
 *              profile:
 *                  identity_type: Passport
 *                  identity_number: 2121212
 *                  address: Jakarta, Indonesia
 *     responses:
 *       201:
 *         description: User dan profil baru ditambahkan
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name: 
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *                  profile:
 *                    type: object
 *                    properties:
 *                      identity_type:
 *                        type: string  
 *                      identity_number:
 *                        type: number
 *                      address:
 *                        type: string
 *       400:
 *         description: Gagal menambahkan user dan profil
 *              
 */
router.post('/api/v1/users', (req, res) => {
    const {name, email, password, profile} = req.body;

    if(!name || !email || !password || !profile) {
        return res.status(400).json({error: 'Data yang dimasukkan belum lengkap'});
    }

    const newData = {
        id: 911,
        name,
        email,
        password,
        profile,
    };

    res.status(201).json(newData);
});

module.exports = router;