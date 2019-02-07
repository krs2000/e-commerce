import React from 'react'
import { Item, Rating } from 'semantic-ui-react'
import AddToCart from './addToCart'

export default product => (
  <Item.Group>
    <Item style={{ alignItems: 'center'}}>
      <Item.Image size="medium">
        <img src={product.img[0]} alt={product.name} />
      </Item.Image>
      <Item.Content>
        <Item.Header>{product.name}</Item.Header>
        <Item.Description style={{ paddingBottom: '2rem' }}>
          <p>{product.price}$</p>
          <p>{product.description}</p>
        </Item.Description>
        <Item.Extra>
          <AddToCart {...{product}} />
        </Item.Extra>
      </Item.Content>
    </Item>
    { product.reviews.map( (review,index) => 
    // TO_DO extend review with id,date and author 
    <div key={`review-${index}`}><i>{review.text}</i>
    <Rating icon='heart' defaultRating={review.rating} maxRating={5} />
    </div>)
    }
  </Item.Group>
)
