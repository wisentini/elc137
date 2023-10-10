import { Request, Response, NextFunction } from 'express';

const catchAsync = (fn: any) => (request: Request, response: Response, next: NextFunction) => {
  Promise.resolve(fn(request, response, next)).catch((error) => next(error));
};

export default catchAsync;
