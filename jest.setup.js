jest.mock('@prisma/client', () => ({
    PrismaClient: require('./__mocks__/prisma'),
}));