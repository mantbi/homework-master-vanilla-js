const API_KEY = "0d720d9ec399cd0d44f361e8a7dc9255";
const searchInput = document.querySelector("input");
const th = document.querySelector("th");
const h4 = document.querySelector("h4");
const tbody = document.querySelector("tbody");
const searchButtonSvg = document.querySelector("svg");

async function getMovieList(data) {
  if (data != "") {
    let = MOVIE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${data}`;
    const response = await fetch(MOVIE_URL);
    const jsn = await response.json();
    let sortedJSON = jsn.results.sort((a, b) => b.vote_average > a.vote_average);
    autoCompleteTable(sortedJSON);
  }
}

searchButtonSvg.addEventListener("click", searchButton);
searchInput.addEventListener("input", getInputValue);

function searchButton() {
  console.log(searchInput.value);
}

function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const debouceCall = debounce((data) => getMovieList(data));

function getInputValue(data) {
  let result = data.target.value;
  if (result.length > 2) {
    debouceCall(result);
  } else {
    debouceCall("");
    tbody.innerHTML = "";
  }
}

searchInput.addEventListener("focus", (event) => {
  h4.hidden = false;
  searchInput.style.color = "#17222B";
  searchInput.placeholder = "";
  searchInput.style.backgroundImage = "var(--movie-black)";
  searchInput.style.backgroundPosition = "0.75rem center";
  searchInput.style.backgroundRepeat = "no-repeat";
  searchInput.style.backgroundSize = "30px 30px";
  th.style.background = "white";
});

searchInput.addEventListener("blur", (event) => {
  h4.hidden = true;
  searchInput.style.color = "white";
  searchInput.style.background = "";
  searchInput.placeholder = "Enter a movie name";
  th.style.background = "";
});

function autoCompleteTable(value) {
  let resultLength = 0;
  value.length > 8 ? (resultLength = 8) : (resultLength = value.length);

  tbody.innerHTML = "";
  for (let i = 0; i < resultLength; i++) {
    let rowCell = tbody.insertRow().insertCell();
    rowCell.innerHTML = `${value[i].original_title}
    <p>${value[i].vote_average} Rating.
     ${value[i].release_date.slice(0, 4)}</p>`;
  }
  rowHandler();
}

function rowHandler() {
  let rows = tbody.childNodes;
  for (let i = 0; i < rows.length; i++) {
    rows[i].onclick = function () {
      let id = this.cells[0].innerHTML;
      searchInput.value = id.split("\n")[0];
      tbody.innerHTML = "";
    };
  }
}
