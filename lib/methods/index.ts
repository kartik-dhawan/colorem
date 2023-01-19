/**
 * logs data onto the console
 * @param {any} logData
 * @returns
 */
export const logger = (logData: any) /* eslint-disable-line */ => {
  const logType = typeof logData
  if (logType === "string" || logType === "number") {
    return console.log({ log: logData, timeStamp: new Date() }) // eslint-disable-line
  }
  return console.log({ ...logData, timeStamp: new Date() }) // eslint-disable-line
}

/**
 * checks if two arrays are equal
 * @param {any[]} array1
 * @param {any[]} array2
 * @returns
 */
export const areArraysEqual = (array1: any[], array2: any[]) => {
  return array1.every((value) => {
    return array2.includes(value)
  })
}
