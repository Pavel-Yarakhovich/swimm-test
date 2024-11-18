import React, { useContext, useEffect } from 'react';
import { graphql } from 'gatsby';
import { useQuery, gql } from '@apollo/client';

import { PageContext } from '../../context/pageState';
import { useCanvasStore } from '../../context/canvasContext.js';
import { experienceFragment } from '../../fragments/experience';
import Seo from '../../components/Seo';
import { locations } from '../../locations/all';
import { COLORS } from '../../const/colors.const.js';

const APOLLO_EXPERIENCE_QUERY = gql`
  ${experienceFragment}
  query audioLocations($slug: String) {
    experience(filter: { Slug: { _eq: $slug } }) {
      ...allData
    }
  }
`;

const APOLLO_NEXT_QUERY = gql`
  query ExperienceData($sort: GraphQLStringOrFloat) {
    experience(filter: { sort: { _eq: $sort } }) {
      Slug
      location {
        name
      }
    }
  }
`;

export default function ExperienceTemplate({ data: staticData, id }) {
  const { setData } = useContext(PageContext);
  const { completedExperiences, setCanvasData } = useCanvasStore();

  useEffect(() => {
    setData({
      introFinished: true,
    });
    setCanvasData({
      completedExperiences: [...completedExperiences, id],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { loading, error, data } = useQuery(APOLLO_EXPERIENCE_QUERY, {
    variables: {
      slug: id,
    },
  });

  const { data: next } = useQuery(APOLLO_NEXT_QUERY, {
    variables: {
      sort: data?.experience[0]?.sort === locations.length ? 1 : data?.experience[0]?.sort + 1,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanvasData({
        loading,
        error,
        data: {
          ...data,
          next: next?.experience[0],
          langData: staticData?.locales.edges,
        },
      });

      return () => clearTimeout(timeout);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [loading, error, next, data, setCanvasData, staticData]);

  useEffect(() => {
    return () => {
      setCanvasData({ isLoaded: false });
      setData({ themeColor: COLORS.DARK_GREEN });
    };
  }, []);

  return (
    <div>
      <Seo title={`Experience ${id}`} />
    </div>
  );
}

export const query = graphql`
  query {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
