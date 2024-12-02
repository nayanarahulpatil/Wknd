import { createOptimizedPicture } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'avatarcard-card-image';
      } else {
        div.className = 'avatarcard-card-body';
        (async () => {
          try {
            const navPath = '/sociallink';
            const fragment = await loadFragment(navPath);
            if (fragment) {
              const fragmentSection = fragment.querySelector('.sociallink-container');
              if (fragmentSection) {
                li.append(fragmentSection);
              }
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log('failed to load component for', error);
          }
        })();
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(
    createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
  ));
  block.textContent = '';
  block.append(ul);
}
