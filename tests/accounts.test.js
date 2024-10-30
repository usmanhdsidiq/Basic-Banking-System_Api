const request = require('supertest');
const app = require('../index');
const prisma = require('../__mocks__/prisma');

describe('Endpoint accounts', () => {
    let accountsId;

    describe('POST /api/v1/accounts', () => {
        test('membuat akun baru', async () => {
            prisma.bank_accounts.create.mockResolvedValue({
                id: 1,
                user_id: 1,
                bank_name: 'BNI',
                bank_account_number: '123456789',
                balance: 1000000,
            });
    
            const res = await request(app).post('/api/v1/accounts').send({
                user_id: 1,
                bank_name: 'BNI',
                bank_account_number: '123456789',
                balance: 1000000,
            });
    
            expect(res.statusCode).toEqual(201);
            accountsId = res.body.id;
        });

        test('gagal membuat akun baru', async () => {
            prisma.bank_accounts.create.mockResolvedValue({
                id: 1,
                user_id: 1,
                bank_name: 'BNI',
                bank_account_number: '123456789',
                balance: 1000000,
            });
    
            const res = await request(app).post('/api/v1/accounts').send({
                user_id: 1,
                bank_name: 'BNI',
                bank_account_number: '123456789',
                balance: 1000000,
            });
    
            expect(res.statusCode).toEqual(400);
            accountsId = res.body.id;
        });
    })

    describe('GET /api/v1/accounts', () => {
        test('menampilkan semua akun', async () => {
            prisma.bank_accounts.findMany.mockResolvedValue([
                {
                    id: accountsId,
                    user_id: 1,
                    bank_name: 'BNI',
                    bank_account_number: '123456789',
                    balance: 1000000,
                },
            ]);
    
            const res = await request(app).get('/api/v1/accounts');
            expect(res.statusCode).toEqual(200);
        });

        test('server error', async () => {
            const res = await request(app).get(`/api/v1/transactions`);
            expect(res.statusCode).toBe(500);
        });
    })

    describe('GET /api/v1/accounts/:id', () => {
        test('menampilkan akun berdasarkan ID', async () => {
            const userId = 2;
            const res = await request(app).get(`/api/v1/accounts/${userId}`);
            expect(res.statusCode).toEqual(200);
        });

        test('akun not found', async () => {
            const userId = 99;
            const res = await request(app).get(`/api/v1/accounts/${userId}`);
            expect(res.statusCode).toEqual(404);
        });

        test('server error', async () => {
            prisma.accounts.findUnique = jest.fn().mockRejectedValue(new Error('server error'));
            const res = await request(app).get(`/api/v1/users/1`);
            expect(res.statusCode).toBe(500);
        });
    })
})