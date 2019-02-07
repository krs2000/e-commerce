import React from 'react'
import { Input, Icon, Transition } from 'semantic-ui-react'
import { add_cart ,toggle_drawer} from '../state/Actions'
import { connect } from 'react-redux'

class AddToCart extends React.Component {
  state = {
    error: '',
    loading: false,
    quantity: 1,
    visible: false,
  }

  _handleSubmit = e => {
    const { product } = this.props
    const { quantity } = this.state

    const error = this.validate(quantity)
    this.setState({ error })
    if (!error) {
      this.setState({
        loading: true,
      })
    }

    this.props.add_cart(product, quantity)

      setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      500
    )
  }

  toggleMessage = () => {
    setTimeout(() => {
      this.setState({ visible: false })
    }, 1000)
  }

  _handleChange = ({ target: { value } }) => {
    this.setState({
      quantity: value,
    })
  }

  validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  render() {
    const { loading, quantity, visible, error } = this.state
    return (
      <React.Fragment>
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min={1}
          step={1}
          error={!!error}
          onChange={e => this._handleChange(e)}
          action={{
            color: 'orange',
            content: 'Add',
            icon: 'plus cart',
            onClick: e => this._handleSubmit(e),
            loading,
            disabled: loading,
          }}
        />
        {error && (
          <div style={{ color: 'red', position: 'absolute' }}>{error}</div>
        )}
        <Transition duration={{ hide: 500, show: 500 }} visible={visible}>
          <div style={{ color: 'green', position: 'absolute' }}>
            <Icon name="check" />
            Added to cart
          </div>
        </Transition>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.items
  }
}
export default connect(
  mapStateToProps,
  { add_cart, toggle_drawer }
)(AddToCart)
