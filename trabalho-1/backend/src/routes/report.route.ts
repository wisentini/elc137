import express, { Router } from 'express';

import { reportController } from '../modules/report';

const reportRouter: Router = express.Router();

reportRouter
  .route('/')
  .get(reportController.generateReport)

export default reportRouter;
