import 'regenerator-runtime/runtime';

const TAGS = ['best', 'beauty', 'morning', 'motivational', 'patience'];
const CACHE_KEY = 'IMAGE_CACHE';

function main() {
  let { quote = {}, url } = getCachedData();
  let { text, author, tag } = quote;

  if (url) {
    document.body.style.backgroundImage = `url(${url})`;
    document.getElementById('quote-content').innerHTML = `<div>${text} (#${tag})<div> <div class="author">  <em> -${author} </em> </div>`;
  } else {
    // Very first time
    cacheAndGetData().then((data = {}) => {
      let { quote = {}, url } = data;
      document.body.style.backgroundImage = `url(${url})`;
    });
  }

}

function getCachedData() {
  let cachedData = localStorage.getItem(CACHE_KEY) || '{}';
  cachedData = JSON.parse(cachedData);

  let { time } = cachedData;

  var FIFTEEN_MIN = 15 * 60 * 1000;
  FIFTEEN_MIN = 3000;

  if ((new Date() - new Date(time)) > FIFTEEN_MIN) {
    cacheAndGetData();
  }

  return cachedData;
}

function cacheData({ url, quote }) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    url,
    quote,
    time: new Date()
  }))
}

async function cacheAndGetData() {
  let url = await cacheAndGetImageUrl();
  let quote = await cacheAndGetQuote();

  cacheData({
    url, quote
  });

  return {
    url, quote
  }
}

function cacheAndGetImageUrl() {
  return fetch('https://source.unsplash.com/1600x900/?nature,water').then((response) => {
    let { url } = response;
    return download(url);
  })
}

function cacheAndGetQuote() {
  let tag = getTag();
  return fetch(`https://goquotes-api.herokuapp.com/api/v1/random?count=1&tag=${tag}`).then((response) => {
    return response.json().then((json = {}) => {
      return json.quotes && json.quotes[0];
    });
  })
}

function getTag() {
  const position = Math.floor(Math.random() * 4);
  return TAGS[position];
}

function download(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}


window.onload = main;
