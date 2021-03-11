const getPath = require('./index');
const jsdom = require('jsdom');

const generateDom = (html) => {
  const { JSDOM } = jsdom;
  let dom = new JSDOM(html, { runScripts: 'dangerously' });
  let container = dom.window.document.body;
  return container;
};

const differentСases = [
  [
    '<body><header class="main-header"><nav class="main-header-nav"><ul class="site-navigation"><li class="site-navigation-item"><a href="#">Новости</a></li><li class="site-navigation-item"><a href="#">Обзоры</a></li><li class="site-navigation-item"><a href="#">Музыка</a></li><li class="site-navigation-item"><a href="#">Архитектура</a></li><li class="site-navigation-item"><a href="#">Кино</a></li><li class="site-navigation-item"><a href="#">Театр</a></li><li class="site-navigation-item"><a href="#">Литература</a></li><li class="site-navigation-item"><a href="#">Религия</a></li><li class="site-navigation-item"><a href="#">Живопись</a></li></ul></nav></header></body>',
    'a',
    'Литература',
    'body > header.main-header > nav.main-header-nav > ul.site-navigation > li.site-navigation-item:nth-child(7) > a',
  ],
  ['a', 'a', 'Литература', 'The argument must be an html'],
  [
    '<body><section class="promo"><h2>Абонементы в театр</h2><ul class="promo-list"><li class="promo-item"><h3>Скидка 50% на весь сезон 2020</h3><p>Покупая абонемент на сезон 2020 года вы сэкономите половину стоимости всех спектаклей</p></li><li class="promo-item"><h3>Места у сцены</h3><p>Только для обладателей абонементов будет возможность сесть поближе к сцене</p></li><li class="promo-item"><h3>Автограф-сессия актёров</h3><p>После спектаклей у вас будет возможность пообщаться с актёрами и взять у них автограф</p></li></ul><a href="#">Смотреть</a></section></body>',
    'h3',
    'Места у сцены',
    'body > section.promo > ul.promo-list > li.promo-item:nth-child(2) > h3',
  ],
  [
    '<body><header class="main-header">Header</header></body>',
    { a: 'a' },
    'Header',
    'The selector and text must be a string',
  ],
  [
    '<body><header class="main-header">Header</header></body>',
    'header',
    ['Header'],
    'The selector and text must be a string',
  ],
  [
    '<body><header class="main-header">Header</header></body>',
    'header',
    true,
    'The selector and text must be a string',
  ],
  [
    '<body><header class="main-header">Header</header></body>',
    0,
    'Header',
    'The selector and text must be a string',
  ],
  [null, 'header', 'Header', 'The argument must be an html'],
  [
    '<body><header class="main-header">Header</header></body>',
    'header',
    'Header',
    'body > header.main-header',
  ],
];

describe('returns a unique CSS selector for an item in the document', () => {
  test.each(differentСases)(
    'given %p as an html argument, %p as a selector, %p as a text and returns %p as result',
    (html, selector, text, expectedResult) => {
      const result = getPath(html, selector, text);
      expect(result).toEqual(expectedResult);
    },
  );
});

const casesForQuerySelector = [
  [
    '<body><header class="main-header"><nav class="main-header-nav"><ul class="site-navigation"><li class="site-navigation-item"><a href="#">Новости</a></li><li class="site-navigation-item"><a href="#">Обзоры</a></li><li class="site-navigation-item"><a href="#">Музыка</a></li><li class="site-navigation-item"><a href="#">Архитектура</a></li><li class="site-navigation-item"><a href="#">Кино</a></li><li class="site-navigation-item"><a href="#">Театр</a></li><li class="site-navigation-item"><a href="#">Литература</a></li><li class="site-navigation-item"><a href="#">Религия</a></li><li class="site-navigation-item"><a href="#">Живопись</a></li></ul></nav></header></body>',
    'a',
    'Литература',
    'Литература',
  ],
  [
    '<body><section class="promo"><h2>Абонементы в театр</h2><ul class="promo-list"><li class="promo-item"><h3>Скидка 50% на весь сезон 2020</h3><p>Покупая абонемент на сезон 2020 года вы сэкономите половину стоимости всех спектаклей</p></li><li class="promo-item"><h3>Места у сцены</h3><p>Только для обладателей абонементов будет возможность сесть поближе к сцене</p></li><li class="promo-item"><h3>Автограф-сессия актёров</h3><p>После спектаклей у вас будет возможность пообщаться с актёрами и взять у них автограф</p></li></ul><a href="#">Смотреть</a></section></body>',
    'h3',
    'Места у сцены',
    'Места у сцены',
  ],
  ['<body><header class="main-header">Header</header></body>', 'header', 'Header', 'Header'],
];

describe('unique CSS selector could be used in document.querySelector() and return sourse element', () => {
  test.each(casesForQuerySelector)(
    'given %p as an html argument, %p as a selector, %p as a text and returns %p as a result',
    (html, selector, text, expectedResult) => {
      const result = generateDom(html).querySelector(getPath(html, selector, text)).innerHTML;
      expect(result).toEqual(expectedResult);
    },
  );
});

const casesForQuerySelectorAll = [
  [
    '<body><header class="main-header"><nav class="main-header-nav"><ul class="site-navigation"><li class="site-navigation-item"><a href="#">Новости</a></li><li class="site-navigation-item"><a href="#">Обзоры</a></li><li class="site-navigation-item"><a href="#">Музыка</a></li><li class="site-navigation-item"><a href="#">Архитектура</a></li><li class="site-navigation-item"><a href="#">Кино</a></li><li class="site-navigation-item"><a href="#">Театр</a></li><li class="site-navigation-item"><a href="#">Литература</a></li><li class="site-navigation-item"><a href="#">Религия</a></li><li class="site-navigation-item"><a href="#">Живопись</a></li></ul></nav></header></body>',
    'a',
    'Литература',
    1,
    'Литература',
  ],
  [
    '<body><section class="promo"><h2>Абонементы в театр</h2><ul class="promo-list"><li class="promo-item"><h3>Скидка 50% на весь сезон 2020</h3><p>Покупая абонемент на сезон 2020 года вы сэкономите половину стоимости всех спектаклей</p></li><li class="promo-item"><h3>Места у сцены</h3><p>Только для обладателей абонементов будет возможность сесть поближе к сцене</p></li><li class="promo-item"><h3>Автограф-сессия актёров</h3><p>После спектаклей у вас будет возможность пообщаться с актёрами и взять у них автограф</p></li></ul><a href="#">Смотреть</a></section></body>',
    'h3',
    'Места у сцены',
    1,
    'Места у сцены',
  ],
  ['<body><header class="main-header">Header</header></body>', 'header', 'Header', 1, 'Header'],
];

describe('unique CSS selector could be used in document.querySelectorAll() and return only one element', () => {
  test.each(casesForQuerySelectorAll)(
    'given %p as an html argument, %p as a selector, %p as a text and returns %p as a result',
    (html, selector, text, expectedLength, expectedElement) => {
      const length = generateDom(html).querySelectorAll(getPath(html, selector, text)).length;
      const element = generateDom(html).querySelectorAll(getPath(html, selector, text))[0]
        .innerHTML;
      expect(length).toEqual(expectedLength);
      expect(element).toEqual(expectedElement);
    },
  );
});
