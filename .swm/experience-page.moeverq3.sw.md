---
title: Experience Page
---
# Introduction

This document will walk you through the implementation of the <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="13:4:4" line-data="export function ExperiencePage({ data, isOpen, currentLang, closeOverlay, resetScroll }) {">`ExperiencePage`</SwmToken> component.

The <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="13:4:4" line-data="export function ExperiencePage({ data, isOpen, currentLang, closeOverlay, resetScroll }) {">`ExperiencePage`</SwmToken> component is designed to display a gallery of images, text, and multimedia content based on the provided data. It handles different screen sizes and user interactions.

We will cover:

1. How the images are processed and stored.
2. How the close button functionality is implemented.
3. How the layout adapts to different screen sizes.
4. How the content is dynamically rendered based on the data.

# Image processing and storage

<SwmSnippet path="/src/componentsR3F/ExperiencePage.js" line="13">

---

We use the <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="16:7:7" line-data="  const images = useMemo(() =&gt; {">`useMemo`</SwmToken> hook to process and store the images from the provided data. This ensures that the images are only recalculated when the data changes, improving performance.

```
export function ExperiencePage({ data, isOpen, currentLang, closeOverlay, resetScroll }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const images = useMemo(() => {
    let images = [];
    data.gallery.forEach((img, i) => {
      images[i] = {
        src: getAssetURL(img.directus_files_id.id),
        alt: img.directus_files_id?.description,
      };
    });
    return images;
  }, [data]);
```

---

</SwmSnippet>

# Close button functionality

<SwmSnippet path="/src/componentsR3F/ExperiencePage.js" line="26">

---

The <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="27:3:3" line-data="  const handleClick = () =&gt; {">`handleClick`</SwmToken> function is defined to reset the scroll position and close the overlay when the close button is clicked. This function is then assigned to the <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="39:1:1" line-data="        onClick={handleClick}">`onClick`</SwmToken> event of the <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="34:2:2" line-data="      &lt;ButtonIcon">`ButtonIcon`</SwmToken> component.

```

  const handleClick = () => {
    resetScroll();
    closeOverlay();
  };

  return (
    <>
      <ButtonIcon
        invert={isDesktop}
        className={cn('!absolute top-6 flex-shrink-0 right-6 transition-opacity z-10', {
          'opacity-0': !isOpen,
        })}
        onClick={handleClick}
        variant="cross"
      />
```

---

</SwmSnippet>

# Layout adaptation

<SwmSnippet path="/src/componentsR3F/ExperiencePage.js" line="42">

---

The layout of the component adapts to different screen sizes using inline styles and conditional classes. The width and height of the main container change based on whether the overlay is open and the screen size.

```

      <div
        style={{
          width: !isOpen || !isDesktop ? '100%' : '50vw',
          height: !isOpen || isDesktop ? '100%' : '60vh',
        }}
        className="h-full flex-shrink-0 transition-[width,height] duration-300 delay-100">
        {images.length === 1 && (
          <img
            src={images[0].src}
            alt={images[0].alt || 'History image'}
            className="h-full object-cover w-full shrink-0"
          />
        )}
        {images.length > 1 && (
          <Carousel
            className="h-full object-cover w-full overflow-hidden"
            images={images}
            invert={true}
            disable={!isOpen}
          />
        )}
      </div>
```

---

</SwmSnippet>

# Dynamic content rendering

<SwmSnippet path="/src/componentsR3F/ExperiencePage.js" line="65">

---

The component dynamically renders different types of content blocks (images, audio, video, text) based on the provided data. Each content block type is handled separately to ensure the correct rendering and styling.

```

      <div
        className="p-8 md:p-18 md:pt-22 md:h-full flex flex-col"
        style={{ width: isDesktop ? '40vw' : 'auto' }}>
        <div className="md:flex-1">
          <div className="uppercase">{data.langData?.experience.history}</div>
          {data.translations !== undefined && (
            <h2
              className="text-lg  font-semibold md:text-2xl mt-4 md:mt-8 leading-tight"
              dangerouslySetInnerHTML={{
                __html: data.translations?.detail_subtitle?.replace(/\n/g, '<br />'),
              }}></h2>
          )}
          {data.year && <div className="text-md md:text-lg mt-4 md:mt-8">&#40;{data.year} &#41;</div>}
        </div>

        <div
          className="flex-1 flex flex-col md:justify-center  mt-8 md:mt-0 wysiwyg"
          dangerouslySetInnerHTML={{
            __html: data.translations?.detail_text,
          }}></div>
      </div>
      {data?.content &&
        data.content.map((contentBlock, i) =>
          contentBlock.collection === 'image' ? (
            <figure
              className="pr-9 py-8 md:px-9 md:py-36 md:aspect-[0.7] w-full md:w-auto md:h-full  flex flex-col"
              key={i}>
              <figcaption className="my-4 px-8 italic">
                {selectTranslation(contentBlock.item.translations, currentLang)?.caption}
              </figcaption>
              <img
                className="w-full object-cover h-full object-center"
                src={getAssetURL(contentBlock.item.image?.id)}
                alt={contentBlock.item.image?.description || 'history image'}
              />
            </figure>
          ) : contentBlock.collection === 'image_landscape' ? (
            <figure
              className="md:pb-0 w-full md:w-auto h-full flex flex-col justify-end pr-9 py-8"
              key={i}>
              <figcaption className="my-4 px-8 italic">
                {selectTranslation(contentBlock.item.translations, currentLang)?.caption}
              </figcaption>
              <img
                className="w-full object-cover h-full object-center"
                src={getAssetURL(contentBlock.item.image?.id)}
                alt={contentBlock.item.image?.description || 'history image'}
              />
            </figure>
          ) : contentBlock.collection === 'audio_text' || contentBlock.collection === 'audiofile' ? (
            <div
              className="md:w-[40rem] px-9 py-8 md:py-36 md:h-full flex flex-col justify-between"
              key={i}>
              <Audio
                className="w-full "
                style={{
                  paddingBottom: contentBlock.collection === 'audio_text' ? '2rem' : 0,
                }}
                invert
                src={getAssetURL(contentBlock.item.audio?.id)}
                title={selectTranslation(contentBlock.item.translations, currentLang)?.audio_title}
              />
              {contentBlock.collection === 'audio_text' && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                  }}
                />
              )}
            </div>
          ) : contentBlock.collection === 'video' ? (
            <div
              className="w-full md:w-auto md:h-full md:pb-0 flex flex-col   "
              key={i}>
              <figure className="h-full w-full flex flex-col justify-end px-9 py-8 md:pb-0">
                <div
                  className="md:px-4 pt-2"
                  dangerouslySetInnerHTML={{
                    __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                  }}
                />
                <figcaption className="text-md-big font-semibold md:px-4 my-4">
                  {selectTranslation(contentBlock.item.translations, currentLang)?.video_caption}
                </figcaption>
                <div className="md:h-1/2 md:mb-36 ">
                  <div className="aspect-video w-full md:w-auto md:h-full">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls
                      config={{
                        file: {
                          attributes: { crossOrigin: 'anonymous' },
                          ...contentBlock.item.translations.map((track, i) => ({
                            kind: 'subtitles',
                            src: getAssetURL(track?.video_subtitles?.id),
                            srcLang: track?.languages_code.code,
                            default: track?.languages_code.code === currentLang,
                          })),
                        },
                      }}
                      light={contentBlock.item.video_cover?.id ? getAssetURL(contentBlock.item.video_cover?.id) : false}
                      playIcon={
                        <div className="bg-slate-500 bg-opacity-40 w-full h-full flex items-center justify-center">
                          <PlayBtn />
                        </div>
                      }
                      url={getAssetURL(selectTranslation(contentBlock.item.translations, currentLang)?.video?.id)}
                    />
                  </div>
                </div>
              </figure>
            </div>
          ) : contentBlock.collection === 'text' ? (
            <div
              className="wysiwyg md:w-[40rem] px-9 py-8 md:py-36 md:h-full flex flex-col justify-end"
              key={i}>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                }}
              />
            </div>
          ) : null
        )}
    </>
  );
}
```

---

</SwmSnippet>

This concludes the walkthrough of the <SwmToken path="/src/componentsR3F/ExperiencePage.js" pos="13:4:4" line-data="export function ExperiencePage({ data, isOpen, currentLang, closeOverlay, resetScroll }) {">`ExperiencePage`</SwmToken> component implementation. The design decisions made ensure efficient image processing, user interaction handling, responsive layout, and dynamic content rendering.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc3dpbW0tdGVzdCUzQSUzQVBhdmVsLVlhcmFraG92aWNo" repo-name="swimm-test"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
