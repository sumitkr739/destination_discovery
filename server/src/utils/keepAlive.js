import axios from 'axios';
import Logger from './logger.js';

const logger = new Logger('KeepAlive');

const BACKEND_URL = process.env.BACKEND_URL || 'https://destination-discovery.onrender.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://destination-discovery-t4sl.vercel.app';
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (before 15min timeout)

class KeepAliveService {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
  }

  async pingBackend() {
    try {
      const response = await axios.get(`${BACKEND_URL}/health`, {
        timeout: 10000
      });
      logger.info('Backend ping successful', { 
        status: response.status,
        uptime: response.data.uptime 
      });
      return true;
    } catch (error) {
      logger.error('Backend ping failed', error);
      return false;
    }
  }

  async pingFrontend() {
    try {
      const response = await axios.get(FRONTEND_URL, {
        timeout: 10000,
        headers: {
          'User-Agent': 'CultureLens-KeepAlive/1.0'
        }
      });
      logger.info('Frontend ping successful', { status: response.status });
      return true;
    } catch (error) {
      logger.error('Frontend ping failed', error);
      return false;
    }
  }

  async ping() {
    logger.info('Starting keep-alive ping...');
    
    const [backendSuccess, frontendSuccess] = await Promise.allSettled([
      this.pingBackend(),
      this.pingFrontend()
    ]);

    logger.info('Keep-alive ping completed', {
      backend: backendSuccess.status === 'fulfilled' && backendSuccess.value,
      frontend: frontendSuccess.status === 'fulfilled' && frontendSuccess.value,
      nextPing: new Date(Date.now() + PING_INTERVAL).toISOString()
    });
  }

  start() {
    if (this.isRunning) {
      logger.warn('Keep-alive service already running');
      return;
    }

    logger.info('Starting keep-alive service', {
      backendUrl: BACKEND_URL,
      frontendUrl: FRONTEND_URL,
      interval: `${PING_INTERVAL / 60000} minutes`
    });

    this.ping();

    this.intervalId = setInterval(() => {
      this.ping();
    }, PING_INTERVAL);

    this.isRunning = true;
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      logger.info('Keep-alive service stopped');
    }
  }
}

const keepAliveService = new KeepAliveService();

export default keepAliveService;
