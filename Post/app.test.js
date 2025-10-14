// app.test.js
import request from 'supertest';
import { app } from './app.js';

describe('Post API', () => {
    let newPostId;

    it('GET / should return all posts', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('POST / should create a new post', async () => {
        const res = await request(app).post('/').send({
            title: "New Post",
            content: "Some content",
            userId: 2
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("New Post");
        newPostId = res.body.id;
    });

    it('PUT /:id should update a post', async () => {
        const res = await request(app).put(`/${newPostId}`).send({
            title: "Updated Title",
            content: "Updated Content"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Title");
    });

    it('PUT /:id should return 404 for invalid id', async () => {
        const res = await request(app).put(`/9999`).send({
            title: "Nothing",
            content: "Doesn't exist"
        });
        expect(res.statusCode).toBe(404);
    });

    it('DELETE /:id should delete a post', async () => {
        const res = await request(app).delete(`/${newPostId}`);
        expect(res.statusCode).toBe(204);
    });
});
