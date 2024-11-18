import { graphql } from 'gatsby';

/**
 * translationData
 * usage:
 
  {
   translations{
     ...translationData
   }
  }

 */

export const translationDataFragment = graphql`
  fragment translationData on DirectusData_articles_translations_1 {
    title
    body
    id
    languages_code {
      code
    }
  }
`;
