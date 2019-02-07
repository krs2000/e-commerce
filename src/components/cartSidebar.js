import React from 'react'
import { connect } from 'react-redux'
import { List, Image, Button, Icon, } from 'semantic-ui-react'
import { substract_cart, toggle_drawer } from '../state/Actions'
import { Link } from 'gatsby'

const cartSidebar = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '2em',
    }}
  >
    {props.cart.items.length === 0 && <span>Your Cart is Empty</span>}
    {props.cart.items.length > 0 && (
      <List verticalAlign="middle">
        <List.Item>
          <List.Content floated="right">
            <List.Header style={{ marginBottom: '1em' }}>
              Total Price: {props.cart.valueAll} $
            </List.Header>
            <Link to="checkout" onClick={()=>props.toggle_drawer(false)}>
              <Button animated style={{ marginBottom: '2em' }}>
                <Button.Content visible>Checkout</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Link>
          </List.Content>
        </List.Item>
        {props.cart.items.map(item => {
          const product = item.product
          return (
            <List.Item key={`card-item-${product.id}`}>
              <Image size="tiny" avatar src={product.img[0]} />

              <List.Content>
                <List.Header style={{ marginBottom: '.5em' }}>
                  {product.name}
                </List.Header>
                <List.Description>
                  Quantity: {item.count}
                  <br />
                  Price: {item.value} $
                </List.Description>
              </List.Content>
              <Button
                size="mini"
                icon
                onClick={() => props.substract_cart(product.id)}
                style={{ float: 'right', marginLeft: '1em', marginTop: '3em' }}
                circular
              >
                <Icon name="cancel" />
              </Button>
            </List.Item>
          )
        })}
      </List>
    )}
  </div>
)

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(
  mapStateToProps,
  { substract_cart, toggle_drawer }
)(cartSidebar)
