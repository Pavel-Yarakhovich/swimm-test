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
export const audioFragment = gql`
  fragment audioData on audio {
    audio_title
    audio {
      id
    }
    image {
      id
      description
    }
    translations {
      title
    }
    year
  }
`;
export const audioLocationsFragment = gql`
  fragment locationAudioData on audio {
    slug
    location {
      name
      y
      x
    }
  }
`;
