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

export const experienceFragment = gql`
  fragment allData on experience {
    sort
    enter_panel {
      title_intro
      nav_title_intro
      languages_code {
        code
      }
    }
    scroll_stops {
      experience_page_id {
        year
        translations {
          nav_title
          title
          preview_text
          detail_subtitle
          detail_text
          languages_code {
            code
          }
        }
        gallery {
          directus_files_id {
            id
            description
          }
        }
        content {
          collection
          id
          item {
            ... on audiofile {
              audio {
                id
              }
            }
            ... on audio_text {
              audio {
                id
              }
              translations {
                audio_title
                text
                languages_code {
                  code
                }
              }
            }
            ... on image_landscape {
              image {
                id
                description
              }
              translations {
                caption
                languages_code {
                  code
                }
              }
            }
            ... on image {
              image {
                id
                description
              }
              translations {
                caption
                languages_code {
                  code
                }
              }
            }
            ... on text {
              translations {
                languages_code {
                  code
                }
                text
              }
            }
            ... on video {
              translations {
                text
                video {
                  id
                }
                languages_code {
                  code
                }
                video_caption
                video_subtitles {
                  id
                }
              }

              video_cover {
                id
              }
            }
          }
        }
      }
    }
  }
`;
export const experienceLocationsFragment = gql`
  fragment locationData on experience {
    sort
    Slug
    location {
      name
      y
      x
    }
  }
`;
