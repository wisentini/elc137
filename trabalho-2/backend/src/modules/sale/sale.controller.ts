import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as saleService from './sale.service';
import { IOptions } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import config from 'config/config';

const FILTER_FIELDS = [
  'invoiceNumber', 'date', 'storeNumber', 'storeName', 'address', 'city', 'zipCode',
  'storeLocation', 'countyNumber', 'county', 'category', 'categoryName', 'vendorNumber',
  'vendorName', 'itemNumber', 'itemDescription', 'pack', 'bottleVolumeMl', 'stateBottleCost',
  'stateBottleRetail', 'bottlesSold', 'saleDollars', 'volumeSoldLiters', 'volumeSoldGallons'
];

export const findSales = catchAsync(async (request: Request, response: Response) => {
  const filter = pick(request.query, FILTER_FIELDS);

  const options: IOptions = pick(request.query, ['sortBy', 'limit', 'page', 'projectBy']);

  const sales = await saleService.findSales(filter, options);

  response
    .status(StatusCodes.OK)
    .send({
      serverIP: config.server.ip,
      data: sales
    });
});

export const findSaleByInvoiceNumber = catchAsync(async (request: Request, response: Response) => {
  const { invoiceNumber } = request.params;

  const sale = await saleService.findSaleByInvoiceNumber(invoiceNumber);

  response
    .status(StatusCodes.OK)
    .send({
      serverIP: config.server.ip,
      data: sale
    });
});

export const saveSale = catchAsync(async (request: Request, response: Response) => {
  const sale = await saleService.saveSale(request.body);

  response
    .status(StatusCodes.CREATED)
    .send({
      serverIP: config.server.ip,
      data: sale
    });
});

export const deleteSaleByInvoiceNumber = catchAsync(async (request: Request, response: Response) => {
  const { invoiceNumber } = request.params;

  await saleService.deleteSaleByInvoiceNumber(invoiceNumber);

  response
    .status(StatusCodes.NO_CONTENT)
    .send({
      serverIP: config.server.ip
    });
});

export const updateSaleByInvoiceNumber = catchAsync(async (request: Request, response: Response) => {
  const { invoiceNumber } = request.params;
  const { bottlesSold } = request.body;

  const sale = await saleService.updateSaleByInvoiceNumber(invoiceNumber, bottlesSold);

  response
    .status(StatusCodes.OK)
    .send({
      serverIP: config.server.ip,
      data: sale
    });
});
