import React from 'react'
import Link from 'gatsby-link'
import { Card, Image, Reveal } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  box-shadow: none !important;
  &:hover {
    transform: none !important;
  }
  .content {
    border-top: none !important;
  }
`
const Badge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: yellow;
  height: 2.5rem;
  width: 2.5rem;
  background-color: tomato;
  border-radius: 50%;
`

const FadeImage = props => (
  <div style={{ position: 'relative' }}>
    <Reveal animated="small fade">
      <Reveal.Content visible>
        <Image src={`${props.img[0]}`} style={{ margin: 0 }} />
      </Reveal.Content>
      <Reveal.Content hidden>
        <Image src={`${props.img[1]}`} style={{ margin: 0 }} />
      </Reveal.Content>
    </Reveal>
    {props.isNew && <Badge>New</Badge>}
    {props.isSale && <Badge>Sale</Badge>}
  </div>
)

const mapProductsToItems = products =>
  products.map(
    ({
      node: {
        name,
        id,
        img,
        background_colour,
        price,
        isNew,
        isSale,
        description,
        reviews,
      },
    }) => {
      return {
        as: StyledLink,
        to: `/product/${id}/`,
        key: `key-${id}`,
        image: <FadeImage {...{ isNew, isSale, img }} />,
        header: (
          <Card.Header style={{ color: 'dimgray', textAlign: 'center' }}>
            {name}
          </Card.Header>
        ),
        meta: (
          <Card.Meta style={{ color: 'dimgray', textAlign: 'center' }}>
            {price}$
          </Card.Meta>
        ),
      }
    }
  )

export default ({ products }) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={3} stackable />
)
