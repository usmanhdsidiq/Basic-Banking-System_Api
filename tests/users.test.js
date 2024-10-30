const request = require('supertest');
const app = require('../index');
const prisma = require('../__mocks__/prisma');

describe('Endpoint users', () => {
    describe('POST /api/v1/users', () => {
        test('membuat user baru beserta profilnya', async () => {
            prisma.users.create.mockResolvedValue({
                name: 'Donald Trump',
                email: 'trump@mail.com',
                profile: {
                    identity_type: 'Passport',
                    identity_number: '123456789',
                    address: 'Washington DC, USA'
                },
            });
    
            const res = await request(app).post('/api/v1/users').send({
                name: 'Donald Trump',
                email: 'trump@mail.com',
                profile: {
                    identity_type: 'Passport',
                    identity_number: '123456789',
                    address: 'Washington DC, USA'
                },
            });
    
            expect(res.statusCode).toEqual(201);
        });

        test('gagal menambahkan user', async () => {
            prisma.users.create.mockResolvedValue({
                name: 211,
                email: 'trump@mail.com',
                profile: {
                    identity_type: 'Passport',
                    identity_number: '123456789',
                    address: 'Washington DC, USA'
                },
            });
    
            const res = await request(app).post('/api/v1/users').send({
                name: 211,
                email: 'trump@mail.com',
                profile: {
                    identity_type: 'Passport',
                    identity_number: '123456789',
                    address: 'Washington DC, USA'
                },
            });

            expect(res.statusCode).toEqual(400);
        });
    })
    

    describe('GET /api/v1/users', () => {
        test('menampilkan semua user', async () => {
            const res = await request(app).get('/api/v1/users');
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    })
    

    describe('GET /api/v1/users/:id', () => {
        test('menampilkan user bedasarkan ID', async () => {
            const userId = 2;

            const res = await request(app).get(`/api/v1/users/${userId}`);
            expect(res.statusCode).toEqual(200);
        });

        test('user not found', async () => {
            const userId = 99;

            const res = await request(app).get(`/api/v1/users/${userId}`);
            expect(res.statusCode).toEqual(404);
        });

        test('server error', async () => {
            prisma.users.get = jest.fn().mockRejectedValue(new Error('server error'));
            const res = await request(app).get(`/api/v1/users/1`);
            expect(res.statusCode).toEqual(500);
        });
    })
    

    describe('PUT /api/v1/users/:id', () => {
        test('update user', async () => {
            const userId = 2;

            const res = await request(app).put(`/api/v1/users/${userId}`).send({
                email: 'jokowi@mail.com',
                password: 'jokowi123',
                profile: {
                    address: 'Solo, Indonesia'
                },
            });
    
            expect(res.statusCode).toEqual(200);
        });
        
        test('user not found', async () => {
            const userId = 99;

            const res = await request(app).put(`/api/v1/users/${userId}`).send({
                email: 'joko@mail.com',
                password: 'joko123',
                profile: {
                    address: 'Solo, Indonesia'
                },
            });
    
            expect(res.statusCode).toEqual(400);
        });

        test('server error', async () => {
            prisma.users.put = jest.fn().mockRejectedValue(new Error('server error'));
            const res = await request(app).put(`/api/v1/users/99`);
            expect(res.statusCode).toBe(500);
        });
    })
    
    describe('DELETE /api/v1/users/:id', () => {
        test('hapus user', async () => {
            const userId = 1;

            const res = await request(app).delete(`/api/v1/users/${userId}`);
            expect(res.statusCode).toEqual(200);
        });

        test('user not found', async () => {
            const userId = 99;

            const res = await request(app).delete(`/api/v1/users/${userId}`);
            expect(res.statusCode).toBe(404);
        });

        test('server error', async () => {
            prisma.users.delete = jest.fn().mockRejectedValue(new Error('server error'));
            const res = await request(app).delete(`/api/v1/users/1`);
            expect(res.statusCode).toBe(500);
        });
    })
});