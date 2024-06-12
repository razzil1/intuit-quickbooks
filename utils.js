export const flattenObject = (obj, parentKey = "") => {
  let flattened = {};

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      // Skip arrays
      continue;
    } else if (typeof obj[key] !== "object" || obj[key] === null) {
      // Skip non-object values
      flattened[parentKey + key.charAt(0).toUpperCase() + key.slice(1)] =
        obj[key];
    } else {
      // Recursively flatten nested objects
      const nested = flattenObject(
        obj[key],
        parentKey + key.charAt(0).toUpperCase() + key.slice(1)
      );
      flattened = { ...flattened, ...nested };
    }
  }

  return flattened;
};
