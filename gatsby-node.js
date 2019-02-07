
const path = require(`path`); 

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
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
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }
      result.data.allProductsJson.edges.forEach(({ node }) => {
        createPage({
          path: `/product/${node.id}`, 
          component: path.resolve('src/templates/ProductPage.js'), 
          context: {
            product: node
          },
        });
      });

      resolve();
    });
  });
};