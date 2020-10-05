// For handling the request/response for different endpoint calls of twitter API's
//Author : Priti Sharma
const form = document.querySelectorAll('form'); // grabbing an element on the page
const errorElement = document.querySelectorAll('.error-message');
const loadingElement = document.querySelector('.loading');
const tweetsElement = document.querySelector('.tweets');
const loadMoreElement = document.querySelector('#loadMore');
const API_URL = 'http://localhost:3000/';

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;

console.log(form);
errorElement[0].style.display = 'none';
errorElement[1].style.display = 'none';
// errorElement[2].style.display = 'none';

document.addEventListener('scroll', () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

listAllTweets();

form[0].addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form[0]);
  const name = formData.get('name');
  const content = formData.get('content');

  if (content.trim()) {
    errorElement[0].style.display = 'none';
    form[0].style.display = 'none';
    loadingElement.style.display = '';

    const tweet = {
      tweet_message: content,
    };

    fetch('http://localhost:3000/tweets/create', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify(tweet),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response
              .json()
              .then((error) => Promise.reject(error.message));
          } else {
            return response.text().then((message) => Promise.reject(message));
          }
        }
      })
      .then(() => {
        form[0].reset();
        setTimeout(() => {
          form[0].style.display = '';
        }, 300);
        listAllTweets();
      })
      .catch((errorMessage) => {
        form[0].style.display = '';
        errorElement[0].textContent = errorMessage;
        errorElement[0].style.display = '';
        loadingElement.style.display = 'none';
      });
  } else {
    errorElement[0].textContent = 'Name and content are required!';
    errorElement[0].style.display = '';
  }
});

//This to manipulate data from form 1: Search Tweets
form[1].addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form[1]);
  const noOfTweets = formData.get('noOfTweets');
  const searchString = formData.get('searchString');

  if (noOfTweets.trim() && searchString.trim()) {
    errorElement[1].style.display = 'none';
    form[1].style.display = 'none';
    loadingElement.style.display = '';

    form[1].reset();
    setTimeout(() => {
      form[1].style.display = '';
    }, 300);
    searchAllTweets(noOfTweets, searchString);
  } else {
    errorElement[1].textContent =
      'No of Tweets and Search Message are required!';
    errorElement[1].style.display = '';
  }
});

//This to manipulate data from form 3: Delete Tweets
form[2].addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form[2]);
  const tweetID = formData.get('tweetID');

  if (tweetID.trim()) {
    errorElement[2].style.display = 'none';
    form[2].style.display = 'none';
    loadingElement.style.display = '';

    const tweetDelete = {
      tweetid: tweetID,
    };

    fetch('http://localhost:3000/tweets/destroy/', {
      method: 'DELETE',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify(tweetDelete),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response
              .json()
              .then((error) => Promise.reject(error.message));
          } else {
            return response.text().then((message) => Promise.reject(message));
          }
        }
      })
      .then(() => {
        form[2].reset();
        setTimeout(() => {
          form[2].style.display = '';
        }, 300);
        listAllTweets();
      })
      .catch((errorMessage) => {
        form[2].style.display = '';
        errorElement[2].textContent = errorMessage;
        errorElement[2].style.display = '';
        loadingElement.style.display = 'none';
      });
  } else {
    errorElement[2].textContent = 'Name and content are required!';
    errorElement[2].style.display = '';
  }
});

function deleteTweet2(tweetID) {
  alert(tweetID);
}

function deleteTweet(tweetID) {
  if (tweetID.trim()) {
    loadingElement.style.display = '';

    const tweetDelete = {
      tweetid: tweetID,
    };

    fetch('http://localhost:3000/tweets/destroy/', {
      method: 'DELETE',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify(tweetDelete),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response
              .json()
              .then((error) => Promise.reject(error.message));
          } else {
            return response.text().then((message) => Promise.reject(message));
          }
        }
      })
      .then(() => {
        listAllTweets();
      })
      .catch((errorMessage) => {
        errorElement[2].textContent = errorMessage;
        errorElement[2].style.display = '';
        loadingElement.style.display = 'none';
      });
  } else {
    errorElement[2].textContent = 'Name and content are required!';
    errorElement[2].style.display = '';
  }
}

function reTweet(tweetID) {
  if (tweetID.trim()) {
    loadingElement.style.display = '';
    const reTweetURL = 'http://localhost:3000/tweets/' + tweetID;

    fetch(reTweetURL, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response
              .json()
              .then((error) => Promise.reject(error.message));
          } else {
            return response.text().then((message) => Promise.reject(message));
          }
        }
      })
      .then(() => {
        listAllTweets();
      })
      .catch((errorMessage) => {
        errorElement[2].textContent = errorMessage;
        errorElement[2].style.display = '';
        loadingElement.style.display = 'none';
      });
  } else {
    errorElement[2].textContent = 'Name and content are required!';
    errorElement[2].style.display = '';
  }
}

function loadMore() {
  skip += limit;
  listAllTweets(false);
}

function listAllTweets(reset = true) {
  loading = true;
  if (reset) {
    tweetsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }

  fetch('http://localhost:3000/index/list')
    .then((response) => response.json())
    .then((result) => {
      console.log(result.statuses);
      console.log(result);
      result.forEach((status) => {
        const div = document.createElement('div');

        const header = document.createElement('h6');
        header.textContent = status.user.name;

        const header1 = document.createElement('small');
        header1.textContent = status.user.screen_name;

        const contents = document.createElement('p');
        contents.textContent = status.text;

        const date = document.createElement('small');
        date.textContent =
          new Date(status.created_at) + ' ID: ' + status.id_str;

        div.appendChild(header);
        //div.appendChild(header1);
        div.appendChild(contents);
        div.appendChild(date);

        tweetsElement.appendChild(div);
      });
      loadingElement.style.display = 'none';
      if (!result.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}

function loadMore() {
  skip += limit;
  listAllTweets(false);
}

function listAllTweets(reset = true) {
  loading = true;
  if (reset) {
    tweetsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }

  fetch('http://localhost:3000/index/list')
    .then((response) => response.json())
    .then((result) => {
      console.log(result.statuses);
      console.log(result);
      result.forEach((status) => {
        const div = document.createElement('div');

        const header = document.createElement('h5');
        header.textContent = status.user.name;

        const header1 = document.createElement('small');
        header1.textContent = status.user.screen_name;

        const contents = document.createElement('p');
        contents.textContent = status.text;

        const date = document.createElement('small');
        date.textContent = new Date(status.created_at);

        var btn = document.createElement('button');
        btn.style = 'float: right; border:none;';
        btn.setAttribute('tweed-id', status.id_str);
        btn.addEventListener('click', function () {
          deleteTweet(this.getAttribute('tweed-id'));
        });

        var btn2 = document.createElement('button');
        btn2.style = 'float: right; border:none;';
        btn2.setAttribute('tweed-id', status.id_str);
        btn2.addEventListener('click', function () {
          reTweet(this.getAttribute('tweed-id'));
        });

        var iconspan = document.createElement('span');
        iconspan.style.color = '#00B7FF';
        iconspan.style.fontSize = '20px';
        iconspan.setAttribute('class', 'glyphicon glyphicon-trash');

        btn.appendChild(iconspan);

        var iconspan2 = document.createElement('span');
        iconspan2.style.color = '#00B7FF';
        iconspan2.style.fontSize = '20px';
        iconspan2.setAttribute('class', 'glyphicon glyphicon-retweet');

        btn2.appendChild(iconspan2);

        div.appendChild(header);
        div.appendChild(btn);
        div.appendChild(btn2);
        div.appendChild(contents);
        div.appendChild(date);

        tweetsElement.appendChild(div);
      });

      loadingElement.style.display = 'none';
      if (!result.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}

function searchAllTweets(noOfTweets, searchString, reset = true) {
  loading = true;
  if (reset) {
    tweetsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }
  const searchJSON = {
    search_message: searchString,
    search_count: noOfTweets,
  };

  fetch('http://localhost:3000/index/search', {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    body: JSON.stringify(searchJSON),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.statuses);
      console.log(result);
      result.statuses.forEach((status) => {
        const div = document.createElement('div');

        const header = document.createElement('h5');
        header.textContent = status.user.name;

        const contents = document.createElement('p');
        contents.textContent = status.text;

        const date = document.createElement('small');
        date.textContent = new Date(status.created_at) + ' ID: ' + status.id;

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        tweetsElement.appendChild(div);
      });
      loadingElement.style.display = 'none';
      if (!result.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}
