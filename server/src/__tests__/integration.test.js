import request from 'supertest';
import app from '../app.js';

describe('Integration Tests', () => {
  let authToken;
  let userId;

  describe('Complete User Journey', () => {
    it('should register, login, create trip, and fetch it', async () => {
      const email = `test${Date.now()}@example.com`;
      
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          email,
          password: 'password123',
          name: 'Test User'
        });

      expect(registerRes.status).toBe(201);
      expect(registerRes.body.token).toBeDefined();
      authToken = registerRes.body.token;
      userId = registerRes.body.user.id;

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email,
          password: 'password123'
        });

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeDefined();

      const tripRes = await request(app)
        .post('/api/trips/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          destination: 'Tokyo',
          budget: 'Mid-range',
          duration: '5 days',
          personality: 'Foodie',
          interests: ['Sushi', 'Temples']
        });

      expect(tripRes.status).toBe(200);
      expect(tripRes.body.tripId).toBeDefined();

      const getRes = await request(app)
        .get(`/api/trips/${tripRes.body.tripId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getRes.status).toBe(200);
      expect(getRes.body.data.destination).toBe('Tokyo');
    }, 60000);
  });

  describe('Error Handling', () => {
    it('should handle invalid trip data', async () => {
      const response = await request(app)
        .post('/api/trips/generate')
        .send({
          destination: ''
        });

      expect(response.status).toBe(400);
    });

    it('should handle unauthorized access', async () => {
      const response = await request(app)
        .get('/api/auth/profile');

      expect(response.status).toBe(401);
    });
  });
});
