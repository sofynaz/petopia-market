import cors from 'cors';
import express from 'express';
import passport from 'passport';
import config from './conf/config';
import appRouter from './apps/app.router';
import useragent from 'express-useragent';
import {
  notFound,
  logHandler,
  validation,
  errorHandler,
} from './shared/middlewares';

export class Express {
  public app: express.Application;

  constructor() {
    // create application
    this.app = express();
    // configure application
    this.config();
  }

  // configure application
  private config(): void {
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
  private routers(): void {
    this.app.use('/api', appRouter());
    this.app.use(notFound);
  }

  // Error handling middleware
  private errorHandlers(): void {
    this.app.use(validation); // Validation error handler
    this.app.use(errorHandler); // Error handler middleware
  }

  // start server
  public listen(port: number, host: string, callback: () => void): void {
    this.app.listen(port, host, callback);
  }
}
