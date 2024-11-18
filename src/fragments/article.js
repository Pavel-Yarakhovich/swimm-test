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

export const articleDataFragment = graphql`
  fragment articleData on DirectusData_articles {
    id
    slug
    publish_date
    author {
      first_name
      last_name
      avatar {
        id
      }
    }
    image {
      id
    }
    translations {
      title
      body
      id
      languages_id {
        code
      }
    }
  }
`;

export const articleApolloFragment = gql`
  fragment articleData on articles {
    id
    slug
    publish_date
    author {
      first_name
      last_name
      avatar {
        id
      }
    }
    image {
      id
    }
    translations {
      title
      body
      id
      languages_id {
        code
      }
    }
  }
`;
