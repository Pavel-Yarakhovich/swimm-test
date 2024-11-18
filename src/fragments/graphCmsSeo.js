import { graphql } from 'gatsby';

/**
 * GraphCmsSeoDefault
 * usage:
 
  {
   grapchms{
     ...GraphCmsSeoDefault
   }
  }

 */

export const defaultGraphCmsSeoFragment = graphql`
  fragment GraphCmsSeoDefault on GraphCms {
    globals {
      value
      key
    }
    seo(where: { id: "cl7syp3169zxy0bt9zbdy7n0d" }) {
      keywords
      image {
        url
        url_sharp {
          childrenImageSharp {
            original {
              src
              width
              height
            }
          }
        }
      }
      title
      description
    }
  }
`;
