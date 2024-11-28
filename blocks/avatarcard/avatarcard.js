import { createOptimizedPicture ,buildBlock} from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    // [...row.children].forEach((col) => {
    //   console.log(col)
    // })
    // console.log(row)
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'avatarcard-card-image';
      // else if (div.children.length == 3 && !div.querySelector('picture')) div.className = 'avatarcard-social-link';
      else div.className = 'avatarcard-card-body';
      // console.log(div.children.length)
      // if (div.children.length ===3){
      //   console.log(div.children.length)
      // }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
// function buildsocialBlock(block) {
//   const h1 = main.querySelector('h1');
//   const picture = main.querySelector('picture');
//   // eslint-disable-next-line no-bitwise
//   if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
//     const section = document.createElement('div');
//     section.append(buildBlock('hero', { elems: [picture, h1] }));
//     main.prepend(section);
//   }
// }
// buildsocialBlock()