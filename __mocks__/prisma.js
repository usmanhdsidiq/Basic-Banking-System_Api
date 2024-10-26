const { mockDeep, mockReset } = require('jest-mock-extended');
const { PrismaClient } = require('@prisma/client');
const prisma = mockDeep(PrismaClient);

beforeEach(() => {
    mockReset(prisma);
})

module.exports = prisma;