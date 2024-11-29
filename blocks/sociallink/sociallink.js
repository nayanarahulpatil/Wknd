export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const li = document.createElement('li');
      while (col.firstElementChild) li.append(col.firstElementChild);
      [...li.children].forEach((div) => {
        div.className = 'sociallink-card';
      });
      ul.append(li);
      block.textContent = '';
      block.append(ul);
    });
  });
}
