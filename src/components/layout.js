import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import './layout.css'
import { toggle_drawer } from '../state/Actions'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'
import CartSidebar from './cartSidebar'


class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen(open) {
    this.props.toggle_drawer(false)
  }

  render() {
    return (
      <Sidebar
        sidebar={<CartSidebar/>}
        open={this.props.isDrawerOpen}
        onSetOpen={this.onSetSidebarOpen}
        pullRight={true}
        styles={{
          sidebar: {
            background: 'white',
            zIndex: 99,
            minWidth: '260px',
          },
          overlay: { backgroundColor: 'transparent', zIndex: 80 },
        }}
      >
        <div>
          <StaticQuery
            query={graphql`
              query SiteTitleQuery {
                site {
                  siteMetadata {
                    title
                  }
                }
              }
            `}
            render={data => (
              <>
             <Header siteTitle={data.site.siteMetadata.title} />
                <div
                  style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `0px 1.0875rem 1.45rem`,
                    paddingTop: 0,
                    paddingBottom:'10rem'
                  }}
                >
                  {this.props.children}
                  {/* <footer>
            © {new Date().getFullYear()}, Any Shop
          </footer> */}
                </div>
              </>
            )}
          />
        </div>
      </Sidebar>
    )
  }
}


function mapStateToProps(state) {
  return {
    isDrawerOpen: state.cart.isDrawerOpen,
  }
}

export default connect(
  mapStateToProps,
  { toggle_drawer }
)(Layout)
