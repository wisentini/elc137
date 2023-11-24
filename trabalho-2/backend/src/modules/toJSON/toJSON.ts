import { Document } from 'mongoose';

const deleteAtPath = (object: any, path: any, index: number) => {
  if (index === path.length - 1) {
    delete object[path[index]];
  } else {
    deleteAtPath(object[path[index]], path, index + 1);
  }
};

const toJSON = (schema: any) => {
  let transform: Function;

  if (schema?.options?.toJSON?.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(document: Document, ret: any, options: Record<string, any>) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema?.paths[path]?.options?.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();

      delete ret._id;
      
      delete ret.__v;
      
      delete ret.createdAt;
      
      delete ret.updatedAt;

      if (transform) {
        return transform(document, ret, options);
      }
    },
  });
};

export default toJSON;
