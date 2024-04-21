import * as z from 'zod';
import * as _ from 'lodash';
import * as dotenv from 'dotenv';
import { isUndefined } from './shared.utils';

// Define Options type for Config class
type Options = {
  schema: z.Schema; // Zod schema for validation
  path?: string | string[]; // Path to the env file(s)
  format: (env: any) => Record<string, any>; // Format function to transform validated env variables
};

// Config class for managing environment variables
export class Config {
  // Private storage for validated environment variables
  private declare storage: Record<string, any>;

  // Constructor for Config class
  constructor(options: Options) {
    // Load env variables from file(s)
    const value = this.loadEnv(options.path);
    // Validate env variables
    const env = this.validateEnv(options.schema, value);
    // Format and freeze the validated env variables
    this.storage = Object.freeze(options.format(env));
  }

  has(key: string): boolean {
    return _.has(this.storage, key);
  }

  // Get method to retrieve environment variables with optional default value
  get<T>(key: string, defaultValue?: T) {
    const value = _.get(this.storage, key, defaultValue) as T;

    if (isUndefined(value))
      throw new TypeError(`Configuration variable key "${key}" does not exist`);

    return value as Exclude<T, undefined>;
  }

  // Load environment variables from file(s)
  private loadEnv(path?: string | string[]) {
    let config: Record<string, any> = {};

    // Check if path is an array
    if (Array.isArray(path)) {
      // Iterate over each path in the array
      path.forEach((path) => {
        const { error, parsed } = dotenv.config({ path });
        // Throw error if encountered while loading env file
        if (error) throw error;
        // Deep merge parsed env variables
        config = _.merge(config, parsed);
      });
    }

    // If path is a string
    else {
      const { error, parsed } = dotenv.config({ path });
      // Throw error if encountered while loading env file
      if (error) throw error;
      // Deep merge parsed env variables
      config = _.merge(config, parsed);
    }

    return config;
  }

  // Validate environment variables against the provided schema
  private validateEnv<T extends z.Schema>(schema: T, value: any): z.infer<T> {
    try {
      return schema.readonly().parse(value);
    } catch (err) {
      // Handle validation errors
      if (err instanceof z.ZodError)
        console.error(
          '❌ Invalid environment variables',
          err.formErrors.fieldErrors,
        );
      else console.error('❌', err);
      // Exit the process if validation fails
      process.exit(1);
    }
  }
}
