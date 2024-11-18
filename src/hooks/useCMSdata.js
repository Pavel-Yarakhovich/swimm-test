import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { useCanvasStore } from '../context/canvasContext';
import { experienceFragment } from '../fragments/experience';

const APOLLO_EXPERIENCE_QUERY = gql`
  ${experienceFragment}
  query SingleExperience($slug: String) {
    experience(filter: { Slug: { _eq: $slug } }) {
      ...allData
    }
  }
`;

export const useCMSdata = (slug) => {
  const { loading, error, data } = useQuery(APOLLO_EXPERIENCE_QUERY, {
    variables: {
      slug,
    },
  });
  const { setCanvasData } = useCanvasStore();

  useEffect(() => {
    setCanvasData({
      loading,
      error,
      data,
    });
  }, [loading, error, data, setCanvasData]);
  return { loading, error, data };
};
