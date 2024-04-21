import { wrapper } from './wrapper';
import type { Constructor, ReqHandler } from './interfaces/utils.interface';

/**
 * make a controller factory function that returns a method to retrieve controller class methods as handlers.
 * @param cls - The constructor function of the controller class.
 * @returns An object containing a method to retrieve controller class methods as handlers.
 */
export const makeController = <T>(cls: Constructor<T>) => {
  let instance: InstanceType<any>;

  try {
    const { container } = require('tsyringe');
    // Resolve the controller class from the container.
    instance = container.resolve(cls);
  } catch (error) {
    throw new Error(
      "tsyringe is not installed, that way controller can't resolved",
    );
  }

  /**
   * Returns a wrapped handler function for the specified method of the controller class.
   * @param key - The method name to retrieve as a handler.
   * @throws Error if the specified method is not a function.
   */
  const getHandler = <K extends keyof T>(key: K): ReqHandler => {
    const handler = instance[key]; // Get the method from the controller instance.
    if (typeof handler !== 'function')
      throw new Error(`Handler ${key as string} is not a function`); // Check if the handler is a function.
    return wrapper(handler.bind(instance)); // Wrap the handler function and bind it to the controller instance.
  };

  return { getHandler };
};
