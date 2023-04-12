export class PackageData {
  title;
  date;
  author;
  description;
  category;
  tags;
  repository;
  url;

  constructor(data) {
    this.title       = data.title;
    this.date        = data.date;
    this.author      = data.author;
    this.description = data.description;
    this.category    = data.category;
    this.tags        = data.tags;
    this.repository  = data.repository;
    this.url         = data.url;
  }
}

export class PackageSearch {
  _feed;
  _templates = {};
  _queryField;
  _searchDelay = 1000;
  _resultsField;
  _packages;

  constructor(options) {
    if (options instanceof Object) this.options = options;
  }

  set options(options) {
    if (! options instanceof Object)
      throw new TypeError('Valid options object not provided: ' + typeof options);

    [
      'feed',
      'templates',
      'queryField',
      'searchDelay',
      'resultsField',
    ].forEach(prop => {
      if (options.hasOwnProperty(prop))
        this[prop] = options[prop];
    });
  }

  get options() {
    let options = {
      feed: this.feed,
      templates: this.templates,
      queryField: this.queryField,
      searchDelay: this.searchDelay,
      resultsField: this.resultsField,
    };

    Object.keys(options).forEach(key => options[key] === undefined && delete options[key]);

    return options;
  }

  set feed(url) {
    if (typeof url !== 'string')
      throw new TypeError('Valid search feed URI not provided');

    this._feed = url;
  }

  get feed() {
    return this._feed;
  }

  set templates(templates) {
    if (! templates instanceof Object)
      throw new TypeError("Valid templates object not provided");

    [
      'noQuery',
      'noResults',
      'result',
    ].forEach(template => {
      if (templates.hasOwnProperty(template)) {
        let tag = templates[template];

        if (typeof tag == 'string') {
          tag = document.createElement('template');
          tag.innerHTML = templates[template];
        }

        if (tag instanceof Element)
          this._templates[template] = tag;
      }
    });
  }

  get templates() {
    return this._templates;
  }

  set queryField(element) {
    if (! element instanceof Element || element.tagName.toLowerCase() !== 'input')
      throw new TypeError('Valid query box form field not provided');

    this._queryField = element;
  }

  get queryField() {
    return this._queryField;
  }

  set searchDelay(delay) {
    if (typeof delay !== 'number' || ! Number.isInteger(delay))
      throw new TypeError('Valid search delay integer not provided');

    this._searchDelay = delay;
  }

  get searchDelay() {
    return this._searchDelay;
  }

  set resultsField(element) {
    if (! element instanceof Element)
      throw new TypeError('Valid search results element not provided');

    this._resultsField = element;
  }

  get resultsField() {
    return this._resultsField;
  }

  set packages(packages) {
    if (! packages instanceof Object)
      throw new TypeError('Valid packages not provided');

    this._packages = {
      generated: new Date(packages.generated),
      items: packages.posts.map(item => new PackageData(item)),
    };
  }

  get packages() {
    return this._packages;
  }

  isSetup() {
    return this.feed !== undefined &&
      this.queryField !== undefined &&
      this.resultsField !== undefined;
  }

  initialize() {
    if (! this.isSetup())
      throw new Error('Search is not setup correctly prior to initialization');

    this._initializeTemplates();
    this._initializeQueryField();
    this._initializeResultsField();
  }

  _initializeTemplates() {
    if (this.templates.noQuery === undefined)
      this.templates = { noQuery: this.resultsField.innerHTML === '' ?
        'No query provided.' :
        this.resultsField.innerHTML
      };
    if (this.templates.noResults === undefined)
      this.templates = { noResults: 'Zero results found.' };
    if (this.templates.result === undefined)
      this.templates = { result: '<a href="${data.item.url}">${data.item.title}</a>' };
  }

  _initializeQueryField() {
    if (document.activeElement === this.queryField) {
      this._fetchFeed();
    } else {
      this.queryField.addEventListener(
        'focus',
        () => this._fetchFeed(),
        {
          capture: true,
          once: true,
          passive: true,
        }
      );
    }

    let searchTimeout = null;

    this.queryField.addEventListener(
      'input',
      () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(
          () => this._search(this.queryField.value.toLowerCase()),
          this.searchDelay
        );
      }
    );
  }

  _initializeResultsField() {
    this._setNoResults();
  }

  _fetchFeed() {
    fetch(this.feed)
      .then((response) => response.json())
      .then((data) => {
        console.log('Search feed fetched');
        this.packages = data;
        console.log('Search feed loaded');
      });
    console.log('Fetching search feed');
  }

  _getStringFromTemplate(template, data) {
    if (! this.templates.hasOwnProperty(template))
      throw new Error("Valid search template not provided" + template);
    else if (! data instanceof Object)
      throw new TypeError("Valid result object not provided: " + (typeof data));

    try {
      return eval("`" + this.templates[template].innerHTML + "`");
    } catch (error) {
      console.log('Issue with configured template (' + template + '): ' + this.templates[template].innerHTML, data);
    }
  }

  _search(query) {
    this.resultsField.innerHTML = '';

    let results;

    if (query.trim().length !== 0) {
      const match = new RegExp(`${query.trim()}`, 'gi');
      results = this._packages.items.filter(
        packageItem => match.test(packageItem.title)
      )
    }

    this._showResults(results);
  }

  _setNoResults() {
    this.resultsField.innerHTML = this._getStringFromTemplate(
      this.queryField.value.trim() === '' ? 'noQuery' : 'noResults'
    );
  }

  _showResults(results) {
    if (results === undefined || results.length === 0) {
      this._setNoResults();
    } else {
      const ul = document.createElement('ul');

      results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = this._getStringFromTemplate('result', result);

        ul.appendChild(li);
      });

      this.resultsField.replaceChildren(ul);
    }
  }
}
