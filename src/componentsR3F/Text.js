import { useScroll } from '@react-three/drei';
import React, { useEffect } from 'react';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import { useRef } from 'react';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

export function Text({
  children,
  page = 1,
  style = {},
  html,
  scrollStop = false,
  className,
  start,
  end,
  startOffset = 0,
  endOffset = 0,
  ...props
}) {
  const ref = useRef();
  const splitTitle = useRef();
  let scroll = useScroll();
  const [animate, setAnimate] = useState(false);
  const [textLines, setTextLines] = useState(false);
  const showPage = isVisible();
  style.pointerEvents = showPage ? 'auto' : 'none';

  useEffect(() => {
    if (splitTitle.current) {
      import('splitting').then(({ default: Splitting }) => {
        let isLoaded = sessionStorage.getItem('Tailwind') === 'loaded';
        if (isLoaded) {
          setTimeout(() => {
            SplitText();
          }, 100);
        } else {
          document.addEventListener('TailwindCssLoaded', () => {
            setTimeout(() => {
              SplitText();
            }, 100);
          });
        }

        function SplitText() {
          const results = Splitting({
            target: splitTitle.current,
            by: 'lines',
            whitespace: false,
          });

          const splittedText = document.createDocumentFragment();
          const lines = [];
          results[0].lines.forEach((line) => {
            const container = document.createElement('div');
            line.forEach((word, index) => {
              container.append(word);
              if (index + 1 !== line.length) word.insertAdjacentHTML('afterend', `<span class="whitespace"> </span>`);
            });

            const showPage = isVisible();
            style.pointerEvents = showPage ? 'auto' : 'none';
            // initial Animation state
            if (showPage) {
              gsap.set(container, {
                opacity: 1,
              });
            } else {
              gsap.set(container, {
                opacity: 0,
              });
            }
            splittedText.append(container);
            lines.push(container);
          });
          splitTitle.current.innerHTML = '';
          splitTitle.current.appendChild(splittedText);
          setTextLines(lines);
        }
      });
    }
  }, [splitTitle, html]);

  useEffect(() => {
    if (!textLines) return;
    if (animate) {
      textLines.forEach((line, index) => {
        gsap.killTweensOf(line);
        gsap.set(line, {
          opacity: 0,
          scale: 1.1,
          y: 10,
        });
        gsap.to(line, {
          opacity: 1,
          scale: 1,
          y: 0,
          delay: index / 4 + 0.5,
          duration: 0.85,
        });
      });

      gsap.to(ref.current, { opacity: 1 });
    } else {
      textLines.forEach((line, index) => {
        gsap
          .timeline()
          .to(line, {
            opacity: 0,
            scale: 0.9,
            duration: 2,
          })
          .set(
            line,
            {
              scale: 1.2,
              y: -10,
              duration: 0,
            },
            '>'
          );
      });
      gsap.to(ref.current, { opacity: 0 });
    }
  }, [animate, textLines]);

  function isVisible() {
    const startPos = start || (page - 1) / scroll.pages + startOffset * (page / scroll.pages);
    const endPos = end || page / scroll.pages + endOffset * (page / scroll.pages);
    const showPage = scroll.offset >= startPos && scroll.offset <= endPos ? true : false;
    return showPage;
  }

  useFrame(() => {
    const showPage = isVisible();

    if (showPage !== animate) setAnimate(showPage);
  });

  return (
    <div
      ref={ref}
      style={{ ...style }}
      className={'data text ' + className}
      {...props}>
      {html ? (
        <h1
          ref={splitTitle}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <h1 ref={splitTitle}>{children}</h1>
      )}
    </div>
  );
}
