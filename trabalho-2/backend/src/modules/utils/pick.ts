const pick = (object: Record<string, any>, keys: string[]) =>
  keys.reduce((obj: any, key: string) => {
    if (object && Object.hasOwn(object, key)) {
      obj[key] = object[key];
    }
    
    return obj;
  }, {});

export default pick;
