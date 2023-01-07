export const logger = (logData: any) /* eslint-disable-line */ => {
  const logType = typeof logData
  if (logType === "string" || logType === "number") {
    return console.log({ log: logData, timeStamp: new Date() }) // eslint-disable-line
  }
  return console.log({ ...logData, timeStamp: new Date() }) // eslint-disable-line
}
