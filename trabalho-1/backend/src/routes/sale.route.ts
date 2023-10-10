import express, { Router } from 'express';

import { saleController } from '../modules/sale';

const saleRouter: Router = express.Router();

saleRouter.get('/', saleController.findSales);

saleRouter
  .route('/')
  .get(saleController.findSales)
  .post(saleController.saveSale)
  .delete(saleController.deleteSaleByInvoiceNumber);

saleRouter
  .route('/:invoiceNumber')
  .delete(saleController.deleteSaleByInvoiceNumber)
  .patch(saleController.updateSaleByInvoiceNumber);

saleRouter
  .route('/report')
  .get(saleController.generateReport);

export default saleRouter;
