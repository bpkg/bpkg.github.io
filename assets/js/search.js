class packageData {
  title;
  date;
  author;
  description;
  category;
  tags;
  url;

  constructor(data) {
    this.title =       data.title;
    this.date =        data.date;
    this.author =      data.author;
    this.description = data.description;
    this.category =    data.category;
    this.tags =        data.tags;
    this.url =         data.url;
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const search = document.getElementById('search');
  const results = document.getElementById('results');
  let generated = '';
  let data = [];
  let search_term = '';

  fetch('/feed/search.json')
    .then((response) => response.json())
    .then((data_server) => {
      generated = data_server.generated;
      data = data_server.posts.map(post => new packageData(post));
    });

  search.addEventListener('input', (event) => {
    search_term = event.target.value.toLowerCase();
    showList();
  });

  const showList = () => {
    results.innerHTML = '';

    if (search_term.length == 0) return;

    const match = new RegExp(`${search_term}`, 'gi');
    let result = data.filter((name) => match.test(name.title));

    if (result.length == 0) {
      const li = document.createElement('li');
      li.innerHTML = `Zero results found`;
      results.appendChild(li);
    }

    result.forEach((e) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${e.url}">${e.title}</a>`;
      results.appendChild(li);
    });
  };

});
