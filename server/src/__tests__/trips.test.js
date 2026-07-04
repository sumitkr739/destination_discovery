import request from 'supertest';
import app from '../app.js';

describe('Trips API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('POST /api/trips/generate', () => {
    it('should generate a trip', async () => {
      const response = await request(app)
        .post('/api/trips/generate')
        .send({
          destination: 'Tokyo',
          budget: 'Mid-range',
          duration: '5 days',
          personality: 'Foodie',
          interests: ['Sushi', 'Temples']
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('tripId');
    }, 30000);

    it('should fail without required fields', async () => {
      const response = await request(app)
        .post('/api/trips/generate')
        .send({
          destination: 'Tokyo'
        });

      expect(response.status).toBe(400);
    });
  });
});
