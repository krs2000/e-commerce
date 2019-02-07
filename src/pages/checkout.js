import React from 'react'
import { connect } from 'react-redux'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { substract_cart, toggle_drawer } from '../state/Actions'
import {
  List,
  Image,
  Label,
  Form,
  TextArea,
  Select,
  Checkbox,
} from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
// TO_DO  split in seperete files, error message display

const deliveryOptions = [
  { key: 'dhl', text: 'DHL', value: 'dhl' },
  { key: 'ups', text: 'UPS', value: 'ups' },
]
const Wrapper = styled.div`
  @media (min-width: 768px) {
    display:flex & > :nth-child(1) {
      width: 280px;
    }
    & > :nth-child(2) {
      width: 100%;
    }
  }
`
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      charge: this.props.cart.valueAll,
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      delivery: '',
      condutions: false,
      formErrors: {
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        delivery: '',
      },
      firstNameValid: false,
      lastNameValid: false,
      addressValid: false,
      phoneValid: false,
      deliveryValid: false,
      formValid: false,
      conditionsValid: false,
    }
  }

  handleUserInput = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value }, () => {
      this.validateField(name, value)
    })
  }

  //TO_DO needs change
  toggleConfirmation = () =>
    this.setState(
      {
        conditions: !this.state.conditions,
        conditionsValid: !this.state.conditionsValid,
      },
      this.validateForm
    )

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors
    let emailValid = this.state.emailValid
    let firstNameValid = this.state.firstNameValid
    let lastNameValid = this.state.lastNameValid
    let addressValid = this.state.addressValid
    let phoneValid = this.state.phoneValid
    let deliveryValid = this.state.deliveryValid
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'
        break
      case 'firstName':
        firstNameValid = value.length >= 3
        fieldValidationErrors.firstName = firstNameValid ? '' : ' is too short'
        break
      case 'lastName':
        lastNameValid = value.length >= 3
        fieldValidationErrors.lastName = lastNameValid ? '' : ' is too short'
        break
      case 'address':
        // TO_DO temprorary validation and slit adress in separate fields ;)
        addressValid = value.length > 20
        fieldValidationErrors.address = addressValid ? '' : ' is too short'
        break
      case 'phone':
        phoneValid = value.match(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
        )
        fieldValidationErrors.phone = phoneValid ? '' : ' is too short'
        break
      case 'delivery':
        // TO_DO temprorary validation ;)
        deliveryValid = value === 'dhl' || 'ups'
        fieldValidationErrors.delivery = deliveryValid
          ? ''
          : 'no valid shipping'
        break
      // case 'conditions':
      // // TO_DO temprorary validation ;)
      // conditionsValid = value;
      // fieldValidationErrors.conditions = conditionsValid ? '': 'no conditions agreement';
      // break;
      default:
        break
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        addressValid: addressValid,
        phoneValid: phoneValid,
      },
      this.validateForm
    )
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.addressValid &&
        this.state.conditionsValid,
    })
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error'
  }

  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }

  render() {
    return (
      <Layout>
        <SEO title="Checkout" />
        <Wrapper>
          <div style={{ marginBottom: '2rem' }}>
            <List verticalAlign="middle">
              <List.Item>
                <List.Content>
                  <List.Header style={{ marginBottom: '1em' }}>
                    <p>Order Summary </p>
                    <p>Price: {this.props.cart.valueAll} $</p>
                    <p>Shipping: {this.props.cart.valueAll} $</p>
                  </List.Header>
                </List.Content>
              </List.Item>
              {this.props.cart.items.map(item => {
                const product = item.product
                return (
                  <List.Item key={`card-item-${product.id}`}>
                    <List.Content>
                      <List.Header>
                        <Image
                          avatar
                          src={product.img[0]}
                          style={{ margin: 0 }}
                        />
                        <span>
                          {' '}
                          {item.count} X {product.name}{' '}
                        </span>
                      </List.Header>
                      <List.Description>
                        <Label style={{ width: '100px' }} tag>
                          Price: {item.value} $
                        </Label>
                      </List.Description>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </div>
          <div>
            <Form>
              <Form.Group widths={3}>
                <Form.Input
                  error={this.errorClass(this.state.formErrors.email)}
                  type="email"
                  name="email"
                  required
                  label="Email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                />
                <Form.Input
                  error={this.errorClass(this.state.formErrors.firstName)}
                  name="firstName"
                  required
                  label="First Name"
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.handleUserInput}
                />
                <Form.Input
                  error={this.errorClass(this.state.formErrors.lastName)}
                  name="lastName"
                  required
                  label="Last Name"
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.handleUserInput}
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  error={this.errorClass(this.state.formErrors.address)}
                  name="address"
                  required
                  label="Address"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={this.handleUserInput}
                />
                <Form.Input
                  error={this.errorClass(this.state.formErrors.phone)}
                  name="phone"
                  label="Phone"
                  placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.handleUserInput}
                />
              </Form.Group>
              <Form.Field
                required
                control={Select}
                options={deliveryOptions}
                error={this.errorClass(this.state.formErrors.delivery)}
                label="Delivery"
                name="delivery"
                placeholder="Delivery"
                search
                // value={this.state.delivery}
                onChange={this.handleUserInput}
              />
              <Form.Field
                control={TextArea}
                label="Coments"
                placeholder="..."
              />
              <Form.Field>
                <Checkbox
                  name="conditions"
                  checked={this.state.conditions}
                  onChange={this.toggleConfirmation}
                  required
                  label="I agree to the Terms and Conditions"
                />
              </Form.Field>
            </Form>
            {!this.state.formValid ? (
              <Label color="red">Fill form</Label>
            ) : (
              <StripeCheckout
                onClick={e => e.preventDefault()}
                token={this.onToken}
                label={`Pay ${this.state.charge}$ with card`}
                stripeKey="my_PUBLISHABLE_stripekey"
              />
            )}
          </div>
        </Wrapper>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(
  mapStateToProps,
  { substract_cart, toggle_drawer }
)(Checkout)
