import { toDate, parse, format } from 'date-fns';

import Sale from './sale.model';
import { ISale, ISaleDocument, TSaleReport } from './sale.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

const DATE_FORMAT: string = 'dd/MM/yyyy';

export const findSales = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  return await Sale.paginate(filter, options);
};

export const findSaleByInvoiceNumber = async (invoiceNumber: string): Promise<ISaleDocument> => {
  return await Sale.findOne({
    invoiceNumber: {
      $regex: invoiceNumber,
      $options: 'i'
    }
  }).exec();
};

export const saveSale = async (sale: ISale): Promise<ISaleDocument> => {
  return await Sale.create(sale);
};

export const deleteSaleByInvoiceNumber = async (invoiceNumber: string): Promise<void> => {
  await Sale.deleteOne({
    invoiceNumber: {
      $regex: invoiceNumber,
      $options: 'i'
    }
  }).exec();
};

export const updateSaleByInvoiceNumber = async (invoiceNumber: string, bottlesSold: number): Promise<ISaleDocument> => {
  const sale = await findSaleByInvoiceNumber(invoiceNumber);

  sale.bottlesSold = bottlesSold;
  sale.saleDollars = sale.stateBottleRetail.valueOf() * bottlesSold;
  sale.volumeSoldLiters = sale.bottleVolumeMl.valueOf() * bottlesSold;
  sale.volumeSoldGallons = sale.volumeSoldLiters.valueOf() / 3.785411784;

  return await sale.save();
};

export const generateReport = async (filter: Record<string, string>): Promise<TSaleReport> => {
  const startDate: Date = toDate(parse(filter.startDate, DATE_FORMAT, new Date()));
  const endDate: Date = toDate(parse(filter.endDate, DATE_FORMAT, new Date()));

  const sales = await Sale.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).exec();

  let bottlesSold: number = 0;
  let saleDollars: number = 0;

  sales.forEach((sale: ISaleDocument) => {
    bottlesSold += sale.bottlesSold.valueOf();
    saleDollars += sale.saleDollars.valueOf();
  });

  return {
    startDate: format(startDate, DATE_FORMAT),
    endDate: format(endDate, DATE_FORMAT),
    bottlesSold: bottlesSold,
    saleDollars: saleDollars
  } as TSaleReport;
};
