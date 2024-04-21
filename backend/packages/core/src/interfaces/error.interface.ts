// Define a type for the body message of HTTP errors
export type BodyMessage = string | string[];

// Define the structure of HTTP error body
export interface HttpErrorBody {
  message: BodyMessage;
  error?: string;
  statusCode: number;
}
