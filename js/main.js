const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const ROOT_URL = 'https://itunes.apple.com/search?media=music&term=';

let inputEl;
let searchButtonEl;
let playButtonEl;
let pauseButtonEl;
let playNextButtonEl;
let playPreviousButtonEl;
let playerEl;
let audio;
let thumbnailEl;
let trackTitleEl;
let trackDetailsEl;
let isPlaying = false;

let playlist;
let playlistIndex = 0;

const init = () => {
  inputEl = document.getElementById('term');
  searchButtonEl = document.getElementById('search');
  playButtonEl = document.getElementById('play');
  playerEl = document.getElementById('player');
  thumbnailEl = document.getElementById('thumbnail');
  trackTitleEl = document.getElementById('track-title');
  trackDetailsEl = document.getElementById('track-details');
  playButtonEl = document.getElementById('btn-play');
  pauseButtonEl = document.getElementById('btn-pause');
  playNextButtonEl = document.getElementById('btn-next');
  playPreviousButtonEl = document.getElementById('btn-prev');

  searchButtonEl.addEventListener('click', onClickSearch);
  playButtonEl.addEventListener('click', onTogglePlay);
  pauseButtonEl.addEventListener('click', onTogglePlay);
  playNextButtonEl.addEventListener('click', onClickNext);
  playPreviousButtonEl.addEventListener('click', onClickPrev);

  pauseButtonEl.setAttribute('class', 'material-icons hide');

  getResults();
};

const onTogglePlay = () => {
  if (playerEl.paused) {
    playerEl.play();
    playButtonEl.setAttribute('class', 'material-icons hide');
    pauseButtonEl.setAttribute('class', 'material-icons');
  } else {
    playerEl.pause();
    pauseButtonEl.setAttribute('class', 'material-icons hide');
    playButtonEl.setAttribute('class', 'material-icons');
  }
};

const onClickNext = () => {
  playlistIndex++;
  updatePlaylist(playlist, playlistIndex);
};

const onClickPrev = () => {
  playlistIndex--;
  updatePlaylist(playlist, playlistIndex);
};

const onClickSearch = () => {
  const term = inputEl.value;

  console.log('term', term);

  if (term.length >= 3) {
    inputEl.value = '';
    getResults(term);
  }
};

const getResults = async (searchTerm = 'michael jackson') => {
  const term = encodeURIComponent(searchTerm);
  const res = await fetch(PROXY_URL + ROOT_URL + term);
  const json = await res.json();

  //   console.log('json', json);

  const songs = json.results;

  playlist = songs;
  updatePlaylist();
};

const updatePlaylist = (songs = playlist, playlistIndex = 0) => {
  // playlist = songs;
  loadSong(songs[playlistIndex]);
};

const loadSong = song => {
  //   console.log('song', song);

  trackTitleEl.innerHTML = song.trackName;
  trackDetailsEl.innerHTML = `${song.artistName} - ${song.collectionName}`;
  thumbnailEl.src = song.artworkUrl100.replace('100x100', '500x500');

  const soundUrl = song.previewUrl;

  //   console.log('soundUrl', soundUrl);

  playerEl.children[0].setAttribute('src', soundUrl);
  playerEl.load();
};

window.onload = init;
