export abstract class BaseResponse {
  public readonly statusCode: 0 | 1;

  constructor(statusCode: 0 | 1) {
    this.statusCode = statusCode;
  }
}

export class SuccessResponse<T> extends BaseResponse {
  public readonly data: T;

  constructor(data: T) {
    super(0);
    this.data = data;
  }
}

export class FailureResponse<E, D> extends BaseResponse {
  public readonly error: E;
  public readonly details: D;
  public readonly timestamp: string;
  public readonly path: string;

  constructor(error: E, details: D, path: string) {
    super(1);
    this.error = error;
    this.details = details;
    this.timestamp = new Date().toISOString();
    this.path = path;
  }
}
