// // usage of hooks & fragments? https://github.com/gatsbyjs/gatsby/issues/14699
// // what are hooks & fragments? https://www.gatsbyjs.com/docs/conceptual/graphql-concepts/#fragments
// // what are hooks & fragments? https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/#composing-custom-usestaticquery-hooks

// // useStaticQuery (is limited to 1 per page) ==> hooks provide a solution to this
// // Hooks are used for static reusable content

import { useStaticQuery, graphql } from 'gatsby';

export const useCategories = () => {
  const {
    directus: { categories },
  } = useStaticQuery(graphql`
    query catergories {
      directus {
        categories {
          name
          key
          color
          translations {
            languages_code {
              code
            }
            name
          }
        }
      }
    }
  `);
  return categories;
};
