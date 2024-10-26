const request = require('supertest');
const app = require('../index');
const prisma = require('../__mocks__/prisma');

describe('Endpoint transactions', () => {
    describe('POST /api/v1/transactions', () => {
        test('membuat transaksi', async () => {
            let sourceAccountId = 3;
            let destinationAccountId = 2;

            prisma.bank_accounts.findUnique.mockResolvedValueOnce({
                id: sourceAccountId, balance: 1000000}).mockResolvedValueOnce({
                id: destinationAccountId, balance: 500000});
    
            prisma.bank_accounts.update.mockResolvedValueOnce({
                id: sourceAccountId, balance: 1500000}).mockResolvedValueOnce({
                id: destinationAccountId, balance: 1000000});
    
            prisma.transactions.create.mockResolvedValueOnce({
                id: 1, 
                source_account_id: sourceAccountId, 
                destination_account_id: destinationAccountId, 
                amount: 500000
            });
    
            const res = await request(app).post('/api/v1/transactions').send({
                source_account_id: sourceAccountId,
                destination_account_id: destinationAccountId,
                amount: 500000
            });
    
            expect(res.statusCode).toEqual(201);
        });

        test('gagal membuat transaksi', async () => {
            let sourceAccountId = 80;
            let destinationAccountId = 99;

            prisma.bank_accounts.findUnique.mockResolvedValueOnce({
                id: sourceAccountId, balance: 1000000}).mockResolvedValueOnce({
                id: destinationAccountId, balance: 500000});
    
            prisma.bank_accounts.update.mockResolvedValueOnce({
                id: sourceAccountId, balance: 1500000}).mockResolvedValueOnce({
                id: destinationAccountId, balance: 1000000});
    
            prisma.transactions.create.mockResolvedValueOnce({
                id: 1, 
                source_account_id: sourceAccountId, 
                destination_account_id: destinationAccountId, 
                amount: 500000
            });
    
            const res = await request(app).post('/api/v1/transactions').send({
                source_account_id: sourceAccountId,
                destination_account_id: destinationAccountId,
                amount: 500000
            });
    
            expect(res.statusCode).toEqual(400);
        });
    })

    describe('GET /api/v1/transactions', () => {
        test('menampilkan semua transaksi', async () => {
            let sourceAccountId = 2;
            let destinationAccountId = 3;

            prisma.transactions.findMany.mockResolvedValueOnce([
                {
                    id: 1,
                    source_account_id: sourceAccountId,
                    destination_account_id: destinationAccountId,
                    amount: 500000
                }
            ]);
    
            const res = await request(app).get('/api/v1/transactions');
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('GET /api/v1/transactions/:transaction', () => {
        test('menampilkan transaksi berdasarkan ID', async () => {
            let transactionId = 2;
            const res = await request(app).get(`/api/v1/transactions/${transactionId}`);
            expect(res.statusCode).toEqual(200);
        });

        test('transaksi not found', async () => {
            let transactionId = 99;
            const res = await request(app).get(`/api/v1/transactions/${transactionId}`);
            expect(res.statusCode).toEqual(404);
        });
    });

})