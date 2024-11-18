import { graphql } from 'gatsby';
import { gql } from '@apollo/client';

/**
 * articleData
 * usage:
 
  {
   articles{
     ...articleData
   }
  }

 */
export const collectionDataFragment = graphql`
  fragment collectionData on DirectusData_collection {
    slug
    year
    translations {
      title
      content
    }
    image {
      id
      imageFile {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      description
      title
    }
    categories {
      categories_key {
        key
      }
    }
  }
`;
export const collectionApolloFragment = gql`
  fragment collectionData on collection {
    slug
    year
    translations {
      title
      content
    }
    image {
      id
      description
      title
    }
    categories {
      categories_key {
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
`;
