import { Link } from 'gatsby'
import React from 'react'
import logo from '../images/logo.svg'
import MenuButtons from './menuCategories'
import { category_change, search_change, toggle_drawer } from '../state/Actions'
import Search from './search'
import { connect } from 'react-redux'
import Bag from '../images/bag.svg'
import styled from 'styled-components'


const Badge = styled.div`
  position: absolute;
  top: -0.5rem;
  right: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
  height: 2rem;
  width: 2rem;
  background-color: tomato;
  border-radius: 50%;
`

const WrapperCategories = styled.div`

@media (max-width: 767px) {
  width:100%;
  position:fixed;
  bottom:0;
  left:0;
  z-index:80 ;
}
`

const LogoWrapper = styled.div`

img{
  width:160px;
}
      @media (max-width: 767px) { 
        width:100%; 
        border-bottom:1px solid rgba(34, 36, 38, 0.1);
        display:flex;
        justify-content:center;
        img{
          width:130px;
        padding-top:20%;
        b
      }
`

class Header extends React.PureComponent {
  clearFilters = () => {
    this.props.category_change(undefined)
    this.props.search_change('')
  }

  render() {
    return (
      <>
        <div style={{ paddingTop: '1.5rem', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ position: 'relative' }}>
              {this.props.cart.countAll > 0 && (
                <Badge>{this.props.cart.countAll}</Badge>
              )}
              <img
                style={{ height: 40, margin: '0 1.5rem', cursor: 'pointer' }}
                src={Bag}
                alt={'cart'}
                onClick={() => this.props.toggle_drawer(true)}
              />
            </div>
            {/* TO_DO optimize this temprorary fix */}
            {window.location.pathname !== '/checkout' && <Search />}
          </div>
          <h1 style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
          <LogoWrapper> <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
           
                <img
                  onClick={() => this.clearFilters()}
                  src={logo}
                  alt={'logo'}
                />
         
            </Link>
            </LogoWrapper>
          </h1>
          <WrapperCategories>  <MenuButtons />        </WrapperCategories> 
        </div>

        <section
          style={{
            textDecoration: `none`,
            minHeight: '80px',
            background: 'white',
          }}
        />
      </>
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
  { category_change, search_change, toggle_drawer }
)(Header)
