import request from 'supertest';
import app from './app.js';

describe('User API ', () => {
  let createdUserId;

  it('GET / should return all users', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /:id should return user by ID', async () => {
    const res = await request(app).get('/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Alice");
  });

  it('POST / should create a new user', async () => {
    const res = await request(app).post('/').send({
      name: "Charlie",
      email: "charlie@example.com"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdUserId = res.body.id;
  });

  it('PUT /:id should update an existing user', async () => {
    const res = await request(app).put(`/${createdUserId}`).send({
      name: "Charles"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Charles");
  });

  it('PUT /:id should return 404 if user not found', async () => {
    const res = await request(app).put('/9999').send({ name: "Ghost" });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /:id should delete user', async () => {
    const res = await request(app).delete(`/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Charles");
  });

  it('DELETE /:id should return 404 for non-existent user', async () => {
    const res = await request(app).delete('/9999');
    expect(res.statusCode).toBe(404);
  });
});
