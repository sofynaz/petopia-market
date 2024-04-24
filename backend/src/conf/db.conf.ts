import mongoose from 'mongoose';
import config from '@/conf/config';
import { format } from '@/shared/plugins';

class Database {
  private declare url: string;

  constructor() {
    this.url = config.get<string>('db.url');
    // global plugins
    this.$plugins();
  }

  private $plugins() {
    mongoose.plugin(format); // remove  database
  }

  async $connect() {
    // Start connection
    try {
      const instance = await mongoose.connect(this.url, {
        autoIndex: true,
      });
      // Close MongoDB server on exit
      process.on('SIGTERM', () => {
        instance.connection.close();
        process.exit(1);
      });
    } catch (error) {
      // Handle error
      console.error(error);
      process.exit(1);
    }
  }
}

export const db = new Database();
