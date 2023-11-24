import express, { Router } from 'express';

import { saleController } from '../modules/sale';

const saleRouter: Router = express.Router();

saleRouter
  .route('/')
  .get(saleController.findSales)
  .post(saleController.saveSale)
  .delete(saleController.deleteSaleByInvoiceNumber);

saleRouter
  .route('/:invoiceNumber')
  .get(saleController.findSaleByInvoiceNumber)
  .patch(saleController.updateSaleByInvoiceNumber)
  .delete(saleController.deleteSaleByInvoiceNumber);

export default saleRouter;
