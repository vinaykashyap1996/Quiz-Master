import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../utils/logger';
interface IDatabaseConnection {
  connect(): Promise<void>;
}

const DatabaseConnection: IDatabaseConnection = {
  connect: async (): Promise<void> => {
    try {
      await mongoose.connect(config.auth.mongodb.url);
      logger.info('MongoDB connected successfully');
    } catch (error) {
      logger.error('MongoDB connection failed', { error });
      process.exit(1); 
    }
  },
};

export default DatabaseConnection;