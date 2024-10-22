const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

// --------------------- Users ------------------------
app.post('/api/v1/users', async (req, res) => {
    // Menambahkan user dan profil baru

    const {name, email, password, profile} = req.body;
    try {
        const tambahUser = await prisma.users.create({
            data: {
                name,
                email,
                password,
                profile: {
                    create: {
                        identity_type: profile.identity_type,
                        identity_number: profile.identity_number,
                        address: profile.address,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
        res.status(201).json(tambahUser);
    } catch(error) {
        res.status(400).json({'Gagal Menambahkan user \n': error.message});
    }
});

app.get('/api/v1/users', async (req, res) => {
    // Menampilkan data user

    try {
        const users = await prisma.users.findMany({
            include: {
                profile: true,
                bank_accounts: true,
            },
        });
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({'Terdapat kesalahan saat menampilkan data \n': error.message});
    }
});

app.get('/api/v1/users/:userId', async (req, res) => {
    // Menampilkan data user dan profilnya berdasarkan ID

    const {userId} = req.params;
    try{
        const user = await prisma.users.findUnique({
            where: {id: parseInt(userId)},
            include: {
                profile: true,
                bank_accounts: true,
            },
        });
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'User tidak ditemukan'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.put('/api/v1/users/:userId', async (req, res) => {
    // Update data user

    const {userId} = req.params;
    const {email, password, profile} = req.body;

    try {
        const updateUser = await prisma.users.update({
            where: {id: parseInt(userId)},
            data: {
                email,
                password,
                profile: {
                    update: {
                        address: profile.address,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
        if(updateUser) {
            res.status(200).json({message: 'User diperbarui', updateUser});
        } else {
            res.status(404).json({message: 'User tidak ditemukan'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.delete('/api/v1/users/:userId', async (req, res) => {
    // Hapus user

    const {userId} = req.params;
    try {
        const deleteUser = await prisma.users.delete({
            where: {id: parseInt(userId)},
        });
        if(deleteUser) {
            res.status(200).json({message: 'User berhasil dihapus', deleteUser});
        } else {
            res.status(404).json({message: 'User tidak ditemukan'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// --------------------- Accounts ------------------------
app.post('/api/v1/accounts', async (req, res) => {
    // Menambahkan akun baru

    const {user_id, bank_name, bank_account_number, balance} = req.body;
    try {
        const tambahAccount = await prisma.bank_accounts.create({
            data: {
                user_id,
                bank_name,
                bank_account_number,
                balance,
            },
        });
        res.status(201).json(tambahAccount);
    } catch(error) {
        res.status(400).json({error: 'Gagal menambahkan akun baru, pastikan user_id sudah benar'});
    }
});

app.get('/api/v1/accounts', async (req, res) => {
    // Menampilkan data akun

    try {
        const account = await prisma.bank_accounts.findMany();
        res.status(200).json(account);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.get('/api/v1/accounts/:accountsId', async (req, res) => {
    // Menampilkan data akun berdasarkan ID

    const {accountsId} = req.params;
    try {
        const account = await prisma.bank_accounts.findUnique({
            where: {id: parseInt(accountsId)},
            include: {
                user: true,
            },
        });
        if(account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({message: 'Account tidak ditemukan atau belum terdaftar'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

// --------------------- Transactions ------------------------
app.post('/api/v1/transactions', async (req, res) => {
    // Membuat transaksi dengan mengirim saldo ke nomor rekening lain

    const {source_account_id, destination_account_id, amount} = req.body;

    try {

        // Memeriksa nomor rekening pengirim dan penerima
        if (source_account_id === destination_account_id) {
            return res.status(400).json({message: 'Rekening pengirim dan rekening penerima tidak boleh sama'});
        }

        // Memeriksa saldo pengirim
        const source_account_balance = await prisma.bank_accounts.findUnique({
            where: { id: source_account_id },
        });

        if(!source_account_balance || source_account_balance.balance < amount) {
            return res.status(400).json({message: 'Saldo tidak cukup'});
        }

        // Melakukan transaksi dengan mengurangi saldo pengirim dan menambahkan saldo penerima
        const transaction = await prisma.$transaction([
            // Mengurangi saldo pengirim
            prisma.bank_accounts.update({
                where: {id: source_account_id},
                data: {balance: {decrement: amount}},
            }),
            // Menambahkan saldo penerima
            prisma.bank_accounts.update({
                where: {id: destination_account_id},
                data: {balance: {increment: amount}},
            }),
            // Simpan transaksi
            prisma.transactions.create({
                data: {
                    source_account_id,
                    destination_account_id,
                    amount,
                },
            }),
        ]);
        res.status(201).json({message: 'Transaksi berhasil', transaction: transaction[2]});
    } catch(error) {
        res.status(500).json({"Transaksi Gagal": error.message});
    }
});

app.get('/api/v1/transactions', async (req, res) => {
    // Menampilkan daftar transaksi

    try {
        const transaction = await prisma.transactions.findMany();
        res.status(200).json(transaction);
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.get('/api/v1/transactions/:transaction', async (req, res) => {
    // Menampilkan data transaksi berdasarkan ID

    const {transaction} = req.params;
    try {
        const transactionData = await prisma.transactions.findUnique({
            where: {id: parseInt(transaction)},
            include: {
                source_account: true,
                destination_account: true,
            }
        });

        if(transactionData) {
            res.status(200).json(transactionData);
        } else {
            res.status(401).json({message: 'Transaksi tidak ditemukan'});
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})