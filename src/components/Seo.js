/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useSiteMetadata } from '../hooks/localSeo';

const Seo = ({ description, lang, image, meta, title }) => {
  let seo, globals;

  const { title: fallBackTitle, social: fallBackSocials } = useSiteMetadata();

  // site Title
  const siteTitle = globals?.find((data) => data.key === 'site-title')?.value || fallBackTitle;
  const twitter = globals?.find((data) => data.key === 'twitter')?.value || fallBackSocials?.twitter;

  const metaImage = seo?.image?.url_sharp?.childrenImageSharp[0]?.original;
  const metaDescription = seo?.description || description;
  const pageTitle = `${siteTitle} | ${title || seo?.title}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageTitle}
      titleTemplate={pageTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,

          content: pageTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: twitter || ``,
        },
        {
          name: `twitter:title`,

          content: pageTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `fb:app_id`,
          content: `544439570512787`,
        },
      ]
        .concat(
          image || metaImage
            ? [
                {
                  property: 'og:image',
                  content: image ? image.src : metaImage.src,
                },
                {
                  property: 'og:image:width',
                  content: image ? image.width : metaImage.width ? metaImage.width : null,
                },
                {
                  property: 'og:image:height',
                  content: image ? image.height : metaImage.height ? metaImage.height : null,
                },
                {
                  name: 'twitter:card',
                  content: 'summary_large_image',
                },
              ]
            : [
                {
                  name: 'twitter:card',
                  content: 'summary',
                },
              ]
        )
        .concat(meta)}
      link={
        image || metaImage
          ? [
              {
                rel: 'image_src',
                content: image ? image.src : metaImage.src,
              },
            ]
          : []
      }
    />
  );
};

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default Seo;
