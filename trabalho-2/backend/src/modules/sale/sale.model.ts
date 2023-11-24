import { Schema, model } from 'mongoose';

import { ISaleDocument, ISaleModel } from './sale.interfaces';
import { paginate } from '../paginate';
import { toJSON } from '../toJSON';

const parseInteger = (value: string): Number => {
  if (typeof value === typeof undefined) return NaN;

  return Number.parseInt(value.toString(), 10);
};

const parseDecimal = (value: string): Number => {
  if (typeof value === typeof undefined) return NaN;

  return Number.parseFloat(value.toString());
};

const saleSchema = new Schema<ISaleDocument, ISaleModel>(
  {
    invoiceNumber: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    date: { type: Date, required: true },
    storeNumber: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    storeName: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    address: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    city: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    zipCode: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    storeLocation: {
      type: Schema.Types.String,
      required: false,
      trim: true
    },
    countyNumber: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    county: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    category: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    categoryName: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    vendorNumber: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    vendorName: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    itemNumber: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    itemDescription: {
      type: Schema.Types.String,
      required: true,
      trim: true
    },
    pack: {
      type: Schema.Types.BigInt,
      required: true,
      get: parseInteger,
    },
    bottleVolumeMl: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseInteger,
    },
    stateBottleCost: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    stateBottleRetail: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    bottlesSold: {
      type: Schema.Types.BigInt,
      required: true,
      get: parseInteger,
    },
    saleDollars: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    volumeSoldLiters: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseDecimal,
    },
    volumeSoldGallons: {
      type: Schema.Types.Decimal128,
      required: true,
      get: parseDecimal,
    }
  },
  {
    collection: 'sales',
    toJSON: {
      getters: true
    }
  }
);

saleSchema.plugin(toJSON);
saleSchema.plugin(paginate);

const Sale = model<ISaleDocument, ISaleModel>('Sale', saleSchema);

export default Sale;
