describe('Messages API (e2e)', () => {
  let token: string;
  let channelId: string;

  beforeAll(async () => {
    // Setup: login and get channel
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    token = loginRes.body.accessToken;
    channelId = 'test-channel-id'; // Should be created in setup
  });

  it('should send message', () => {
    return request(app.getHttpServer())
      .post(`/api/messages/${channelId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 'user-id',
        content: 'Hello, world!',
        type: 'text',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('content', 'Hello, world!');
        expect(res.body).toHaveProperty('type', 'text');
      });
  });

  it('should get channel messages', () => {
    return request(app.getHttpServer())
      .get(`/api/messages/channel/${channelId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('should add reaction', () => {
    return request(app.getHttpServer())
      .post(`/api/messages/message-id/reactions`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: 'user-id',
        emoji: '👍',
      })
      .expect(201);
  });
});
