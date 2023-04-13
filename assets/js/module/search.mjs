// https://github.com/krisk/Fuse
import { default as Fuse } from '//cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.min.js'

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
  _searchDelay = 500;
  _resultsField;

  _packages;
  _fuse;

  _fuseOptions = {
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: [
      {weight: 2.0, name: 'title'},
      {weight: 0.5, name: 'date'},
      {weight: 1.0, name: 'author'},
      {weight: 1.5, name: 'description'},
      {weight: 0.5, name: 'category'},
      {weight: 0.5, name: 'tags'},
      {weight: 0.1, name: 'repository'},
    ],
  };

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

    this.fuse = this._packages.items;
  }

  get packages() {
    return this._packages;
  }

  set fuse(items) {
    if (! items instanceof Array)
      throw new TypeError("Valid fuse set not provided");

      this._fuse = new Fuse(
        items,
        this._fuseOptions,
        Fuse.createIndex(
          this._fuseOptions.keys,
          items
        )
      );
    }

  get fuse() {
    return this._fuse;
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
      throw new Error('Valid search template not provided: ' + template);
    else if (! data instanceof Object)
      throw new TypeError('Valid result object not provided: ' + typeof data);

    try {
      return eval('`' + this.templates[template].innerHTML + '`');
    } catch (error) {
      console.log('Issue with configured template (' + template + '): ' + this.templates[template].innerHTML, data);
    }
  }

  _search(query) {
    this._showResults(
      this._highlightResults(
        this.fuse.search(query)
      )
    );
  }

  _highlightResults(results) {
    if (this._fuseOptions.hasOwnProperty('includeMatches') && this._fuseOptions.includeMatches) {
      results = results.map(result => {
        // Deep copy
        let highlight = JSON.parse(JSON.stringify(result.item));

        result.matches.forEach(match => {
          if (match.key === 'tags') {
            highlight.tags[match.refIndex] = this._highlightString(match.value, match.indices);
          } else if (highlight.hasOwnProperty(match.key)) {
            highlight[match.key] = this._highlightString(match.value, match.indices);
          }
        });

        result.highlight = highlight;
        return result;
      });
    }

    return results;
  }

  _highlightString(string, indices) {
    let markers = [];

    indices.forEach(index => {
      markers.push([index[0], true]);
      markers.push([index[1], false]);
    });

    string = string.split('');
    let match = 0;

    markers.forEach(mark => {
      string[mark[0]] = mark[1] ?
        '<span class="highlight match-group-' + (match++ % 14) + '">' + string[mark[0]] :
        string[mark[0]] + '</span>';
    });

    return string.join('');
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
