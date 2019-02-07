import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import MatSvg from '../images/yogamat.svg'
import PillowSvg from '../images/pillow.svg'
import PantsSvg from '../images/pants.svg'
import { category_change } from '../state/Actions'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import { color } from '../assets/const'

class MenuButtons extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.category_change(name)
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu style={{ justifyContent: 'center' }}>
        <Menu.Item
          as="div"
          name="mats"
          active={activeItem === 'mats'}
          onClick={this.handleItemClick}
          style={{ borderLeft: '1px solid rgba(34,36,38,.1)' }}
        >
          <Link
            style={{
              color: color.dark,
              textDecoration: `none`,
            }}
            to="/"
          >
            <Image
              style={{ height: 40, width: 30, margin: '0 .5rem 0 0' }}
              src={MatSvg}
              alt={'logo'}
            />
            Mats
          </Link>
        </Menu.Item>

        <Menu.Item
          as="div"
          name="pills"
          active={activeItem === 'pills'}
          onClick={this.handleItemClick}
        >
          <Link
            style={{
              color: color.dark,
              textDecoration: `none`,
            }}
            to="/"
          >
            <Image
              style={{ height: 40, width: 42, margin: '0 .3rem 0 0' }}
              src={PillowSvg}
              alt={'logo'}
            />
            Pillows
          </Link>
        </Menu.Item>

        <Menu.Item
          as="div"
          name="pants"
          active={activeItem === 'pants'}
          onClick={this.handleItemClick}
        >
          <Link
            style={{
              color: color.dark,
              textDecoration: `none`,
            }}
            to="/"
          >
            <Image
              style={{ height: 40, width: 36, margin: '0 .3rem 0 0' }}
              src={PantsSvg}
              alt={'logo'}
            />
            Pants
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    category: state.category,
    cart: state.cart,
  }
}
export default connect(
  mapStateToProps,
  { category_change }
)(MenuButtons)
