import 'reflect-metadata';
import chalk from 'chalk';
import config from './conf/config';
import { Express } from './app';
import { db } from './conf/db.config';

const main = async () => {
  // initialize database
  await db.$connect();

  // Create the Express application
  const app = new Express();

  // Get port and host from the configuration
  const port: number = config.get('port');
  const host: string = config.get('host');

  // Start the server
  app.listen(port, host, () => {
    console.log(`Listen on ${chalk.cyan(`http://${host}:${port}`)}\n`);
  });
};

main();
