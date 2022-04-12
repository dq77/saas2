import commonApis from './common'
import orderApis from './order'
import projectApis from './project'
import deliverApis from './deliver'
import reserveOrderApis from './reserveOrder'
import billingApis from './billing'
import projectPriceApis from './projectPrice'
import customerPriceApis from './customerPrice'
import priceStrategyApis from './priceStrategy'
import productApis from './product'
import productAttributeApis from './productAttribute'
import productClassifyApis from './productClassify'
import workbenchApis from './workbench'
import financeApis from './finance'
import warehouseApis from './warehouse'
import setBase from './setBase'
import discount from './discount'

const getFactoryApis = (instanceQuiet) => {
  return {
    ...commonApis(instanceQuiet),
    ...orderApis(instanceQuiet),
    ...projectApis(instanceQuiet),
    ...deliverApis(instanceQuiet),
    ...reserveOrderApis(instanceQuiet),
    ...billingApis(instanceQuiet),
    ...projectPriceApis(instanceQuiet),
    ...customerPriceApis(instanceQuiet),
    ...priceStrategyApis(instanceQuiet),
    ...productApis(instanceQuiet),
    ...productAttributeApis(instanceQuiet),
    ...productClassifyApis(instanceQuiet),
    ...workbenchApis(instanceQuiet),
    ...financeApis(instanceQuiet),
    ...warehouseApis(instanceQuiet),
    ...setBase(instanceQuiet),
    ...discount(instanceQuiet)
  }
}

export default getFactoryApis
