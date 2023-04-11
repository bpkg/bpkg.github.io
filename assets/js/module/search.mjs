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
  _queryField;
  _searchDelay = 1000;
  _resultsField;
  _packages;

  constructor(options) {
    if (options instanceof Object) {
      this.options = options;
    }
  }

  set options(options) {
    if (! options instanceof Object)
      throw new TypeError('Valid options object not provided: ' + typeof options);

    [
      'feed',
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

    this._initializeQueryField();
    this._initializeResultsField();
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
    this.resultsField.innerHTML = this.queryField.value.trim() === '' ?
      'No query provided' :
      'Zero results found';
  }

  _showResults(results) {
    if (results === undefined || results.length === 0) {
      this._setNoResults();
    } else {
      const ul = document.createElement('ul');

      results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${result.url}">${result.title}</a>`;

        ul.appendChild(li);
      });

      this.resultsField.replaceChildren(ul);
    }
  }
}
