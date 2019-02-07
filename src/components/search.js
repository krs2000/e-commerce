import React, { Component } from 'react'
import { Input,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { search_change } from '../state/Actions'
  
 class Search extends Component {
    componentWillMount() {
      this.resetComponent()
    }
  
    resetComponent = () => this.setState({ value: '' })
  
  
    handleChange = (e,  {value} ) => {
      this.setState({ value })
      this.props.search_change(value)
      setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, 300)
    }
  
    render() {
      const { value } = this.state
      return (
        <Input style={{height: '2.7rem'}} onChange={this.handleChange} value={value} icon={<Icon name='search' inverted circular link />} placeholder='Search...' />
      )
    }
  }
  


  function mapStateToProps(state) {
    return {

    }
  }
  export default connect(
    mapStateToProps,
    { search_change }
  )(Search)