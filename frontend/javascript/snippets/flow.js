// Promises flow:
readFile("credentials.json")
    .then(authorize)
    .then(getSheet)
    .then(processSheet)
    .then(printSheet)
    .catch(e => console.log(e));