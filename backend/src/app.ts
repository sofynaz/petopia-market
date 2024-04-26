import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import passport from 'passport';
import config from './conf/config';
import useragent from 'express-useragent';
import { apiRouter } from './apis/api.router';
import { notFound, logHandler, errorHandler } from './shared/middlewares';

export class Express {
  private app: express.Express;

  constructor() {
    // create application
    this.app = express();
    // configure application
    this.config();
  }

  // configure application
  private config() {
    // Middleware
    this.middleware();
    // Routers
    this.routers();
    // Error Handlers
    this.errorHandlers();
  }

  // Middlewares
  private middleware() {
    this.app.use(logHandler()); // Log requests
    this.app.use(useragent.express()); // Parse user agent
    this.app.use(cors(config.get('cors'))); // Cross Origin Resource Sharing (CORS)
    this.app.use(express.json({ limit: '30mb' })); // Parse JSON requests
    this.app.use(express.urlencoded({ extended: true, limit: '30mb' }));
    this.app.use(passport.initialize()); // Parse URL-encoded requests
  }

  // Initial Routers
  private routers() {
    this.app.get('/', (_, res) => res.json(config.get('package')));
    this.app.use('/api', apiRouter());
    // 404 Not Found
    this.app.use(notFound);
  }

  // Error handling middleware
  private errorHandlers() {
    this.app.use(errorHandler); // Error handler middleware
  }

  // start server
  public listen(port: number, host: string): void {
    this.app.listen(port, host, () =>
      console.log(`Listen on ${chalk.cyan(`http://${host}:${port}`)}\n`),
    );
  }
}
