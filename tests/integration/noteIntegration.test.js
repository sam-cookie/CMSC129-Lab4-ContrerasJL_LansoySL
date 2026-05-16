const request = require('supertest');
const app = require('../../server/src/app');
const store = require('../../server/src/store/notesStore');

let server;

beforeAll(() => {
  server = app.listen(0); // 0 means random available port
});

afterAll((done) => {
  server.close(done); // properly closes the connection
});

beforeEach(() => store.reset());

describe('POST /api/notes', () => {
  test('creates a note and returns 201 with the note object', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'My Note', body: 'Some body text.' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      title: 'My Note',
      body: 'Some body text.',
    });
  });

  test('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ body: 'No title here' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /api/notes', () => {
  test('returns 200 and an array', async () => {
    const res = await request(app).get('/api/notes');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('PUT /api/notes/:id', () => {
  test('updates a note and returns 200 with updated note', async () => {
    const created = await request(app)
      .post('/api/notes')
      .send({ title: 'Original', body: 'Original body' });

    const id = created.body.id;

    const res = await request(app)
      .put(`/api/notes/${id}`)
      .send({ title: 'Updated', body: 'Updated body' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id,
      title: 'Updated',
      body: 'Updated body',
    });
  });

  test('returns 404 when note to update does not exist', async () => {
    const res = await request(app)
      .put('/api/notes/nonexistent-id')
      .send({ title: 'Updated', body: 'Updated body' });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('DELETE /api/notes/:id', () => {
  test('deletes a note and returns 200', async () => {
    const created = await request(app)
      .post('/api/notes')
      .send({ title: 'To Delete', body: 'Delete me' });

    const id = created.body.id;

    const res = await request(app).delete(`/api/notes/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  test('returns 404 when note to delete does not exist', async () => {
    const res = await request(app).delete('/api/notes/nonexistent-id');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});