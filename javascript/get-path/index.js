const jsdom = require('jsdom');

const getPath = (html, selector, text) => {
  const htmlTagRegex = /<\/?[\w\s="/.':;#-\/]+>/gi;

  if (
    html === null ||
    html === undefined ||
    html.toString().match(htmlTagRegex) === null
  ) {
    return 'The argument must be an html';
  } else if (typeof selector !== 'string' || typeof text !== 'string') {
    return 'The selector and text must be a string';
  }

  let container = generateDom(html);

  let element = findAndReturnDomElement(container, selector, text);

  if (element !== undefined) {
    return generateUniquePath(element);
  } else {
    return 'This element was not found';
  }
};

const generateDom = (html) => {
  const { JSDOM } = jsdom;
  let dom = new JSDOM(html, { runScripts: 'dangerously' });
  let container = dom.window.document.body;
  return container;
};

const findAndReturnDomElement = (container, selector, text) => {
  let elem = Array.from(container.querySelectorAll(selector)).find(
    (el) => el.innerHTML === text
  );
  return elem;
};

const generateUniquePath = (element) => {
  let path = [];
  let parent;
  while ((parent = element.parentNode)) {
    let tag = element.tagName,
      siblings;
    let classes = Array.from(element.classList.values());
    let classStr = classes.length ? `.${classes.join('.')}` : '';
    path.unshift(
      element.id
        ? `#${element.id}`
        : ((siblings = parent.children),
          [].filter.call(
            siblings,
            (sibling) =>
              sibling.tagName === tag &&
              JSON.stringify(classes.sort()) ===
                JSON.stringify(Array.from(sibling.classList.values()).sort())
          ).length === 1
            ? `${tag}${classStr}`
            : `${tag}${classStr}:nth-child(${
                1 + [].indexOf.call(siblings, element)
              })`)
    );
    if (element.tagName == 'BODY') break;
    element = parent;
  }
  return `${path.join(' > ')}`.toLowerCase();
};

module.exports = getPath;
