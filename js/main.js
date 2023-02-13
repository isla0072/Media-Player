
import MEDIA from './data.js';

const APP = {
  audio: new Audio(),
  src: MEDIA,
  currentTrack: 0,

  init: () => {
    APP.addListeners();
    APP.buildPlaylist();
    APP.loadCurrentTrack();
    APP.errorHandler();
   },
  addListeners: () => {
    document.getElementById('btnPrev').addEventListener('click', APP.playPrevious);
    document.getElementById('btnPlay').addEventListener('click', APP.togglePlayPause);
    document.getElementById('btnNext').addEventListener('click', APP.playNext);
    APP.audio.addEventListener('error', APP.errorHandler);
    APP.audio.addEventListener('play', APP.updatePlaylist);
    APP.audio.addEventListener('pause', APP.updatePlaylist);
    APP.audio.addEventListener('ended', APP.playNext);
  },
  buildPlaylist: () => {
    //read the contents of MEDIA and create the playlist
    let ul = document.getElementById('playlist');
    let html = MEDIA.map((item, id) => {
      return `
          <li class="track__item" id=${id}>
            <div class="track__thumb">
              <img src="${item.thumbnail}" alt="Album Art for ${item.title}">
            </div>
            <div class="track__details">
              <p class="track__title">${item.title}</p>
              <p class="track__artist">${item.artist}</p>
            </div>
            <div class="track__time">
              <time>00:00</time>
            </div>
          </li>
        `;
      }).join('');
      ul.innerHTML = html;
    
    document.querySelectorAll('.track__item').forEach(track => {
      track.addEventListener('click', () => {
        const largeImg = document.querySelector('.album_art__full img');
        largeImg.src = `${MEDIA[track.id].large}`;
        APP.currentTrack = track.id;
        APP.loadCurrentTrack();
        APP.updatePlaylist();
      });
    });
        
    const largeImg = document.querySelector('.album_art__full img');
    largeImg.src = `${MEDIA[APP.currentTrack].large}`;
    APP.updatePlaylist();
  },
  updatePlaylist: () => {
    
  },
  loadCurrentTrack: () => {
    APP.audio.src = `${APP.src[APP.currentTrack].src}`;
  },
  togglePlayPause: () => {
    if (APP.audio.paused) {
      APP.audio.play();
      btnPlay.innerHTML= '<i class="material-icons">pause</i>';
    } else {
      APP.audio.pause();
      btnPlay.innerHTML= '<i class="material-icons">play_arrow</i>';
    }
  },
  playPrevious: () => {
    //start the track loaded into APP.audio playing
  },
  playNext: () => {
    //start the track loaded into APP.audio playing
  },
  pause: () => {
    APP.audio.pause();
  },
  errorHandler: (ev) => {
    if (!ev) return;
    console.error("There was an error loading the audio:", ev);
  },
  timeUpdate: () => {
    const currentTimeDisplay = document.getElementById('current-time');
    audio.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audio.currentTime);
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeDisplay.innerHTML = `${minutes}:${seconds} |`;
  });
  },
};

document.addEventListener('DOMContentLoaded', APP.init);