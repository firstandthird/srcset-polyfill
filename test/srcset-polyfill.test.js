import test from 'tape-rollup';
import srcsetPolyfill from '../index';

const base64imgXS = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const base64imgXL = 'data:image/gif;base64,C0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const pictureElement = `
    <picture>
      <source srcset="${base64imgXL}" media="(min-width: 768px)">
      <img srcset="${base64imgXS}">
    </picture>
`;

const init = () => {
  const container = document.createElement('div');
  container.id = 'fixture';
  document.body.appendChild(container);
};

const setup = () => {
  const container = document.getElementById('fixture');
  container.innerHTML = pictureElement;
  return container;
};

init();

test('SrcsetPolyfill - Returs an image with src from source', assert => {
  const container = setup();

  srcsetPolyfill();

  const image = container.querySelector('img');

  assert.ok(image.src, 'img element has src tag');
  assert.equals(image.src, base64imgXS, 'img element has the right src tag value');

  assert.end();
});
