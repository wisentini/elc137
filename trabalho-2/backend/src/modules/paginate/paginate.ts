import { Schema, Document, Model } from 'mongoose';

export interface QueryResult {
  results: Document[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface IOptions {
  sortBy?: string;
  projectBy?: string;
  populate?: string;
  limit?: number;
  page?: number;
}

const defineSort = (options: IOptions): string => {
  if (!(options.sortBy)) return 'createdAt';

  const sortingCriteria: any = [];

  options.sortBy.split(',').forEach((sortOption: string) => {
    const [key, order] = sortOption.split(':');

    sortingCriteria.push(`${(order === 'desc' ? '-' : '')}${key}`);
  });

  return sortingCriteria.join(' ');
}

const defineProject = (options: IOptions): string => {
  if (!(options.projectBy)) return '-createdAt -updatedAt';

  const projectionCriteria: string[] = [];

  options.projectBy.split(',').forEach((projectOption) => {
    const [key, include] = projectOption.split(':');

    projectionCriteria.push(`${(include === 'hide' ? '-' : '')}${key}`);
  });

  return projectionCriteria.join(' ');
}

const defineLimit = (options: IOptions): number => {
  if (!(options.limit)) return 10;

  const limit: number = parseInt(options.limit.toString(), 10);

  return Math.max(limit, 10);
}

const definePage = (options: IOptions): number => {
  if (!(options.page)) return 1;

  const page: number = parseInt(options.page.toString(), 10);

  return Math.max(page, 1);
}

const paginate = <T extends Document, U extends Model<U>>(schema: Schema<T>): void => {
  schema.static('paginate', async function (filter: Record<string, any>, options: IOptions): Promise<QueryResult> {
    const sort: string = defineSort(options);
    const project: string = defineProject(options);
    const limit: number = defineLimit(options);
    const page: number = definePage(options);
    const skip = (page - 1) * limit;

    const countDocumentsPromise = this.countDocuments(filter).exec();
    
    let documentsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).select(project);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption: any) => {
        documentsPromise = documentsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a: string, b: string) => ({ path: b, populate: a }))
        );
      });
    }

    documentsPromise = documentsPromise.exec();

    return Promise.all([countDocumentsPromise, documentsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };

      return Promise.resolve(result);
    });
  });
};

export default paginate;
