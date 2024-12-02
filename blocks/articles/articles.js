import { createOptimizedPicture } from '../../scripts/aem.js';

async function processData(data) {
  const articleNames = JSON.parse(data.articleName);
  const details = JSON.parse(data.details);
  const images = data.profile
    .split('./')
    .filter(Boolean)
  const result = articleNames.map((name, index) => ({
    articleNames: name,
    profile: images[index] || null,
    details: details[index] || null,
  }));
  return result;
}

async function createcardHolder(containerDiv, data) {
  if (data?.path === '/') {
    const ul = document.createElement('ul');
    const processedData = await processData(data);
    [...processedData].forEach((item) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.setAttribute('alt', item.articleNames);
      img.setAttribute('src', `${window.hlx.codeBasePath}${item.profile}`);
      li.append(img);

      const articleName = document.createElement('h5');
      articleName.appendChild(document.createTextNode(item.articleNames));
      articleName.classList.add('article-name');
      li.append(articleName);

      const deatilText = document.createElement('p');
      deatilText.appendChild(document.createTextNode(item.details));
      deatilText.classList.add('deatil-text');
      li.append(deatilText);
      ul.append(li);
    });
    ul.querySelectorAll('picture > img').forEach((img) => img
      .closest('picture')
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]),
      ));
    containerDiv.append(ul);
  }
}
async function createCard(jsonURL) {
  let pathname = null;
  pathname = new URL(jsonURL);
  const resp = await fetch(pathname);
  const json = await resp.json();
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('articles-block');
  json.data.forEach((row) => {
    createcardHolder(containerDiv, row);
  });
  return containerDiv;
}

export default async function decorate(block) {
  const articles = block.querySelector('a[href$=".json"]');
  const parientDiv = document.createElement('div');
  if (articles) {
    parientDiv.append(await createCard(articles.href));
    articles.replaceWith(parientDiv);
  }
}
