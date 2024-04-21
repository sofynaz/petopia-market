import httpStatus from 'http-status';
import { HttpRes } from './http.response';

/**
 * API Response Class
 */
export class ApiRes {
  /**
   * OK Response function.
   */
  static ok(data: any, message?: string) {
    return new HttpRes(data, httpStatus.OK, message || 'Success');
  }

  /**
   * Created Response function.
   */
  static created(data: any, message?: string) {
    return new HttpRes(
      data,
      httpStatus.CREATED,
      message || 'Resource created successfully',
    );
  }
}
