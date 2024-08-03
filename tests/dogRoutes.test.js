const request = require('supertest');
const { app, server } = require('../src/app');
const mongoose = require('mongoose');
const Dog = require('../src/models/dog');
const connectDB = require('../config/mongoose');

let token;

beforeAll(async () => {
  process.env.MONGO_URI = 'mongodb://localhost:27017/dogpics_test';
  await connectDB();

  const res = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuserBabita12345866786', password: 'testpassword123' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  if (server) {
    server.close(); // Ensure this matches your setup
  }
});

describe('Dog API', () => {
  it('should upload a dog pic', async () => {
    const res = await request(app)
      .post('/api/dogs')
      .set('Authorization', `Bearer ${token}`)
      .attach('dogPic', 'tests/dog.jpeg');
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  // Add more tests for delete, update, fetch by ID, and fetch all
});
