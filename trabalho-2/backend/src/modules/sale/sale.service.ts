import Sale from './sale.model';
import { ISale, ISaleDocument } from './sale.interfaces';
import { IOptions, QueryResult } from '../paginate/paginate';

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
