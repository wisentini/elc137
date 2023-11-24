import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ISale {
  invoiceNumber: string;
  date: Date;
  storeNumber: string;
  storeName: string;
  address: string;
  city: string;
  zipCode: string;
  storeLocation?: string;
  countyNumber: string;
  county: string;
  category: string;
  categoryName: string;
  vendorNumber: string;
  vendorName: string;
  itemNumber: string;
  itemDescription: string;
  pack: Number;
  bottleVolumeMl: Number;
  stateBottleCost: Number;
  stateBottleRetail: Number;
  bottlesSold: Number;
  saleDollars: Number;
  volumeSoldLiters: Number;
  volumeSoldGallons: Number;
};

export interface ISaleDocument extends ISale, Document {

}

export interface ISaleModel extends Model<ISaleDocument> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
