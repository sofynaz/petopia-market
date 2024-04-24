import 'reflect-metadata';
import config from './conf/config';
import { db } from './conf/db.conf';
import { Express } from './app';

const main = async () => {
  // initialize database
  await db.$connect();

  // Create the Express application
  const app = new Express();

  // Get port and host from the configuration
  const port: number = config.get('port');
  const host: string = config.get('host');

  // Start the server
  app.listen(port, host);
};

main();
