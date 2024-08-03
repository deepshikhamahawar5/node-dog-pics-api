const request = require('supertest');
const { app, server } = require('../src/app');
const mongoose = require('mongoose');
const connectDB = require('../config/mongoose');

// Before all tests, set up database and register a test user
beforeAll(async () => {
  process.env.MONGO_URI = 'mongodb://localhost:27017/dogpics_test';
  await connectDB();
});

// After all tests, close database connection and server
afterAll(async () => {
  await mongoose.connection.close();
  if (server) {
    server.close();
  }
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'Shikha87', password: 'Shikha@123' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'Shikha87', password: 'Shikha@123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
