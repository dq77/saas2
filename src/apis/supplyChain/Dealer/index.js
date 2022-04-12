import orderApis from './order'

const getDealerApis = (instanceQuiet) => {
  return {
    ...orderApis(instanceQuiet),
  }
}

export default getDealerApis
