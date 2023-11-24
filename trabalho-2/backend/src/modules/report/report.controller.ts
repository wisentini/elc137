import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as reportService from './report.service';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import config from '../../config/config';

export const generateReport = catchAsync(async (request: Request, response: Response) => {
  const filter = pick(request.query, ['startDate', 'endDate']);

  const report = await reportService.generateReport(filter);

  response
    .status(StatusCodes.OK)
    .send({
      serverIP: config.server.ip,
      data: report
    });
});
