import { toDate, parse, format } from 'date-fns';

import { TReport } from './report.types';
import Sale from '../sale/sale.model';
import { ISaleDocument } from '../sale/sale.interfaces';

const DATE_FORMAT: string = 'dd/MM/yyyy';

export const generateReport = async (filter: Record<string, string>): Promise<TReport> => {
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
  } as TReport;
};
