import { useState } from 'react'
import { GET_DATA, SET_DATA } from '../../../Util/Util'
import Products from './Products'

export default function MergedProducts(props) {
  const [productType, setType] = useState(GET_DATA('mergedProducts.productType') || 'Service')

  const setProductType = (type) => {
    SET_DATA('mergedProducts.productType', type)
    setType(type)
  }

  return (
    <div>
      {productType === 'Service' && (
        <Products {...props} productType={productType} setProductType={setProductType} />
      )}
    </div>
  )
}
