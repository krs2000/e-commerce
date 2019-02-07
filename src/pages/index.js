import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import 'react-sticky-header/styles.css'
import 'semantic-ui-css/semantic.min.css'
import ProductList from '../components/productList'
import { graphql } from 'gatsby'
import { connect } from 'react-redux'
import _, { get} from 'lodash'
import Headroom from 'react-headroom'

class IndexPage extends React.Component {
  
  render() {
    const products = get(this, 'props.data.allProductsJson.edges')
    const filterProducts = products.filter(
      x =>  this.props.category !== undefined ?  x.node.category === this.props.category : x
    ).filter(
      x => this.props.search !== '' ?  _.includes( x.node.name.toLowerCase(), this.props.search.toLowerCase())  ?  x : '' : x 
    )

    return (
      <>
      <Layout>
      <SEO title="Home" keywords={[`yoga`, `shop`, `yoga pants`]} />
      <ProductList products={filterProducts}/>
    </Layout>
    </>
    )
  }
}

export const query =graphql`
{
  allProductsJson {
    edges {
      node {
        id
        name
        price
        category
        img
        isNew
        isSale
        description
        reviews { 
          text
          rating
        }
      }
    }
  }
}
`

function mapStateToProps(state) {
  return {
    category: state.productFilter.category,
    search: state.productFilter.search
  }
}
export default connect(
  mapStateToProps,
)(IndexPage)


