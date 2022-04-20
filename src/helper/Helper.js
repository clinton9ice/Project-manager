// Returns Boolean
function isObject(a) {
  return typeof a === "object" && a !== null;
}

// Returns Boolean
function isEqual(arr1, arr2) {
  // check if the parameters is an array or object
  if (
    (!isObject(arr1) && !Array.isArray(arr1)) ||
    (!isObject(arr2) && !Array.isArray(arr2))
  ) {
    return false;
  }

  // Convert the properties to an array
  const key1 = Object.keys(arr1);
  const key2 = Object.keys(arr2);

  // return if their length doesn't match
  if (key1.length !== key2.length) return false;

  // Check the object values for match
  for (const key of key1) {
    const a1Val = arr1[key];
    const a2Val = arr2[key];
    const areObjects = isObject(a1Val) && isObject(a2Val);

    //   console.log();

    //   return false if the values do not match
    if (
      (areObjects && !isEqual(a1Val, a2Val)) ||
      (!areObjects && a1Val !== a2Val)
    ) {
      return false;
    }
  }

  return true;
}

module.exports = {
  isObject,
  isEqual,
};
