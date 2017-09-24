const { random, floor } = Math; 

export const makeMockData = (count = 10, columns = ['id', 'name', 'salary', 'boss'], includeNulls = false) => {
  const data = [];
  const shouldHaveValue = () => {
    return !includeNulls || random() > 0.5;
  }

  for (let i = 0; i < 10; i++) {
    const datum = columns.reduce((obj, colName) => {
      if (shouldHaveValue) {
        obj[colName] = `${colName}# ${i}`;
      }
      return obj;
    }, {});
    data.push(datum);
  }

  return data;
}