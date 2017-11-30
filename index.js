/* eslint-env browser */
import { find, findOne, on } from 'domassist';
import tinybounce from 'tinybounce';

export default function srcsetPolyfill() {
  const tImg = document.createElement('img');
  const isWSupported = ('sizes' in tImg);

  if (!isWSupported) {
    // Get all the pictures
    const pictures = find('picture');
    const matchMediaSupported = typeof window.matchMedia === 'function';

    // If any
    if (pictures.length) {
      pictures.forEach(picture => {
        // Get all sources and images
        const sources = find('source', picture);
        const img = findOne('img', picture);
        let source = null;

        // If match media isn't supported, we'll fallback to the default (mobile) image
        if (matchMediaSupported) {
          for (let i = 0, len = sources.length; i < len && !source; i++) {
            const media = sources[i].getAttribute('media');

            if (window.matchMedia(media).matches) {
              source = sources[i].getAttribute('srcset');
            }
          }
        }

        // If no matchmedia or no matches
        if (!source) {
          source = img.getAttribute('srcset');
        }

        img.src = source;
      });

      // If matchmedia is supported, allow resizing to act like real picture
      if (matchMediaSupported) {
        on(window, 'resize', tinybounce(srcsetPolyfill, 150));
      }
    }
    return pictures;
  }
}
