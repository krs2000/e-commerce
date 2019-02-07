import React from 'react'
import ProductItem from '../components/productItem'
import Layout from '../components/layout'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const product = this.props.pathContext.product;
    return (
      <Layout>      <div>
        {/* <Helmet title={slug} /> */}
        <ProductItem {...product}/>
      </div>
      </Layout>

    )
  }
}

export default ProductPageTemplate