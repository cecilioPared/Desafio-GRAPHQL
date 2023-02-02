const STATUS_CODE = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  
export class BaseError extends Error {
  constructor(message, metadata = {}) {
    super(message)
    this.metadata = metadata
  }
}

export class NotFoundError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = STATUS_CODE.NOT_FOUND
  }
}

export class BadRequestError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode =  STATUS_CODE.BAD_REQUEST
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = STATUS_CODE.UNAUTHORIZED
  }
}

export class InternalServerError extends BaseError {
  constructor(message, metadata) {
    super(message, metadata)
    this.httpStatusCode = STATUS_CODE.INTERNAL_SERVER_ERROR
  }
}

export function errorHandler (err, req, res, next) {
  let error = err  
  if (!err instanceof BaseError) {
    error = new InternalServerError('Ah ocurrido un error desconocido', err)
  }
  res.status(error.httpStatusCode).json({statusCode: error.httpStatusCode, message: error.message})
}

