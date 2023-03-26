
import MEDIA from './data.js';
import './utils.js';

const APP = {
  audio: new Audio(),
  currentTrack: 0,
  audioFolder: 'media/',
  thumbnailFolder: 'img/',
  largeImgFolder: 'img/',

  init: () => {
    APP.addListeners();
    APP.buildPlaylist();
    APP.updatePlaylist();
    APP.loadCurrentTrack();
  },  
  addListeners: () => {
    document.getElementById('playlist').addEventListener('click', APP.clickPlaylist);
    document.getElementById('btnPrev').addEventListener('click', APP.playPrevious);
    document.getElementById('btnPlay').addEventListener('click', APP.togglePlayPause);
    document.getElementById('btnNext').addEventListener('click', APP.playNext);
    document.getElementById('btnShuffle').addEventListener('click', APP.shufflePlaylist);
    APP.audio.addEventListener('play', APP.updatePlaylist);
    APP.audio.addEventListener('pause', APP.updatePlaylist);
    APP.audio.addEventListener('ended', APP.playNext);
    APP.audio.addEventListener('timeupdate', APP.updateTime);
    APP.audio.addEventListener('durationchange', APP.updateDuration);
    APP.audio.addEventListener('timeupdate', APP.updateBar);
  },
  buildPlaylist: () => {
    let ul = document.getElementById('playlist');
    let html = MEDIA.map((item, id) => {
      return `
          <li class="track__item" data-filename="${item.track}" data-src="${APP.audioFolder}${item.track}">
            <div class="track__thumb">
              <img src="${APP.thumbnailFolder}${item.thumbnail}" alt="Album Art for ${item.title}">
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
  },
  updatePlaylist: () => {
    MEDIA.forEach((track) => {
      let tempAudio = new Audio(`./${APP.audioFolder}${track.track}`);
      tempAudio.addEventListener('durationchange', (ev) => {
        let duration = ev.target.duration;
        track['duration'] = duration;
        let timeElement = document.querySelector(`li[data-filename="${track.track}"] time`);
        let timeString = APP.convertSeconds(duration);
        timeElement.textContent = timeString;
      });
    });
  },  
  updateBar: () => {
    const progress = document.querySelector('.progress');
    const played = document.querySelector('.played');
    progress.addEventListener('click', (ev) => {
      const percentage = ev.x / progress.clientWidth;
      played.style.width = `${percentage * 100}vw`;
      APP.audio.currentTime = APP.audio.duration * percentage;
    });
    APP.audio.addEventListener('timeupdate', () => {
      const percentage = APP.audio.currentTime / APP.audio.duration;
      played.style.width = `${percentage * 100}%`;
    });
  },
  highlightTrack: () => {
    const allTracks = document.querySelectorAll('.track__item');
    allTracks.forEach(track => track.classList.remove('selected'));
    const currentSong = document.querySelector(`li[data-filename="${MEDIA[APP.currentTrack].track}"]`);
    if (currentSong) {
      currentSong.classList.add('selected');
    }
  },  
  loadCurrentTrack: () => {
    APP.audio.src = `./${APP.audioFolder}${MEDIA[APP.currentTrack].track}`;
    APP.highlightTrack();
  }, 
  clickPlaylist: (e) => {
      let trackItem = e.target;
      while (!trackItem.classList.contains('track__item')) 
      { trackItem = trackItem.parentElement;
      if (!trackItem) {
      return;
        }
      }
      if (trackItem) {
      const largeImg = document.querySelector('.album_art__full img');
      const src = trackItem.dataset.src;
      const filename = trackItem.dataset.filename;
      const id = MEDIA.findIndex(item => item.track === filename);
      largeImg.src = `${APP.largeImgFolder}${MEDIA[id].large}`;
      APP.currentTrack = id;
      APP.loadCurrentTrack();
      APP.updatePlaylist();
      APP.togglePlayPause();
    }
  },
  shufflePlaylist: () => {
    APP.pause();
    MEDIA.shuffle();
    APP.buildPlaylist();
    APP.updatePlaylist();
    APP.currentTrack = 0;
    APP.loadCurrentTrack();
    APP.updateAlbumArt();
    APP.audio.play();
    APP.updatePlaylist();
    btnPlay.innerHTML = '<i class="material-icons">pause</i>';
  },  
  togglePlayPause: () => {
    const body = document.querySelector('body');
    if (APP.audio.paused) {
      APP.audio.play();
      btnPlay.innerHTML = '<i class="material-icons">pause</i>';
      body.classList.add('playing');
    } else {
      APP.audio.pause();
      btnPlay.innerHTML = '<i class="material-icons">play_arrow</i>';
      body.classList.remove('playing');
    }
  },  
  updateAlbumArt: () => {
    const largeImg = document.querySelector('.album_art__full img');
    largeImg.src = `${APP.largeImgFolder}${MEDIA[APP.currentTrack].large}`;
  },
  playPrevious: () => {
    APP.audio.pause();
    APP.currentTrack--;
    if (APP.currentTrack < 0) {
        APP.currentTrack = MEDIA.length - 1;
    }
    APP.loadCurrentTrack();
    APP.updateAlbumArt();
    APP.audio.play();
    APP.updatePlaylist();
    btnPlay.innerHTML = '<i class="material-icons">pause</i>';
  },
  playNext: () => {
    APP.audio.pause();
    APP.currentTrack++;
    if (APP.currentTrack >= MEDIA.length) {
        APP.currentTrack = 0;
    }
    APP.loadCurrentTrack();
    APP.updateAlbumArt();
    APP.audio.play();
    APP.updatePlaylist();
    btnPlay.innerHTML = '<i class="material-icons">pause</i>';
  },
  pause: () => {
    APP.audio.pause();
  },
  updateTime: () => {
    const displayTime = document.getElementById('current-time');
    const currentTime = APP.audio.currentTime;
    displayTime.innerText = `${APP.convertSeconds(currentTime)} |`;
  },
  updateDuration: () => {
  const durationDisplay = document.getElementById('duration');
  const duration = APP.audio.duration;
  durationDisplay.innerText = APP.convertSeconds(duration);
  },
  convertSeconds: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  },
};

document.addEventListener('DOMContentLoaded', APP.init);