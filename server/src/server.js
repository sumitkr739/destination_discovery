import dotenv from 'dotenv';
import app from './app.js';
import keepAliveService from './utils/keepAlive.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      keepAliveService.start();
      console.log('⏰ Keep-alive service started');
    }, 5000);
  }
});

process.on('SIGTERM', () => {
  keepAliveService.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  keepAliveService.stop();
  process.exit(0);
});