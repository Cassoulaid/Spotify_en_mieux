// Fichier js/player.js - À créer

// Classe pour gérer la lecture de musique
class MusicPlayer {
    constructor() {
      this.audioElement = new Audio();
      this.currentTrack = null;
      this.playlist = [];
      this.currentIndex = 0;
      this.isPlaying = false;
      this.volume = 0.7;
      this.initEventListeners();
      this.loadTracks();
    }
  
    // Charger les pistes depuis le JSON
    async loadTracks() {
      try {
        // En production, vous pourriez faire une requête API
        // Pour l'instant, nous utilisons directement les données de votre musique.json
        const response = await fetch('data/musique.json');
        const data = await response.json();
        this.playlist = data.tracks.map(track => ({
          ...track,
          // Ajout d'une URL audio fictive - à remplacer par de vraies URLs
          audioUrl: `audio/${track.title.toLowerCase().replace(/\s+/g, '-')}.mp3`
        }));
        
        // Mettre à jour l'interface
        this.updateTracksList();
        
        // Charger la première piste
        if (this.playlist.length > 0) {
          this.loadTrack(0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des pistes:", error);
      }
    }
  
    // Charger une piste spécifique
    loadTrack(index) {
      if (index < 0 || index >= this.playlist.length) return;
      
      this.currentIndex = index;
      this.currentTrack = this.playlist[index];
      this.audioElement.src = this.currentTrack.audioUrl;
      this.audioElement.load();
      
      // Mettre à jour l'interface
      this.updatePlayerUI();
    }
  
    // Jouer ou mettre en pause
    togglePlay() {
      if (this.audioElement.paused) {
        this.audioElement.play();
        this.isPlaying = true;
        document.querySelector('.play-pause i').classList.replace('fa-play', 'fa-pause');
      } else {
        this.audioElement.pause();
        this.isPlaying = false;
        document.querySelector('.play-pause i').classList.replace('fa-pause', 'fa-play');
      }
    }
  
    // Piste suivante
    nextTrack() {
      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= this.playlist.length) {
        nextIndex = 0; // Revenir au début
      }
      this.loadTrack(nextIndex);
      if (this.isPlaying) {
        this.audioElement.play();
      }
    }
  
    // Piste précédente
    previousTrack() {
      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = this.playlist.length - 1; // Aller à la dernière piste
      }
      this.loadTrack(prevIndex);
      if (this.isPlaying) {
        this.audioElement.play();
      }
    }
  
    // Mise à jour du temps de lecture
    updateProgressBar() {
      const currentTime = this.audioElement.currentTime;
      const duration = this.audioElement.duration || 1;
      const progressPercent = (currentTime / duration) * 100;
      
      // Mettre à jour la barre de progression
      document.querySelector('.progress').style.width = `${progressPercent}%`;
      
      // Mettre à jour l'affichage du temps
      document.querySelector('.current-time').textContent = this.formatTime(currentTime);
      document.querySelector('.total-time').textContent = this.formatTime(duration);
    }
  
    // Formater le temps en minutes:secondes
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  
    // Mettre à jour l'interface du lecteur
    updatePlayerUI() {
      if (!this.currentTrack) return;
      
      // Mettre à jour les informations de la piste
      const trackInfoImg = document.querySelector('.track-info img');
      const trackTitle = document.querySelector('.track-details h4');
      const trackArtist = document.querySelector('.track-details p');
      
      trackInfoImg.src = this.currentTrack.cover;
      trackInfoImg.alt = this.currentTrack.title;
      trackTitle.textContent = this.currentTrack.title;
      trackArtist.textContent = this.currentTrack.artist;
      
      // Réinitialiser le temps et la barre de progression
      this.updateProgressBar();
    }
  
    // Mise à jour de la liste des pistes dans l'interface
    updateTracksList() {
      const tracksContainer = document.querySelector('.library-items.albums-grid');
      if (!tracksContainer) return;
      
      tracksContainer.innerHTML = '';
      
      this.playlist.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.className = 'album-item';
        trackElement.innerHTML = `
          <div class="album-cover">
            <img src="${track.cover}" alt="${track.title}">
            <button class="album-play-button" data-index="${index}">
              <i class="fas fa-play"></i>
            </button>
          </div>
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        `;
        
        tracksContainer.appendChild(trackElement);
        
        // Ajouter un événement de clic pour jouer cette piste
        const playButton = trackElement.querySelector('.album-play-button');
        playButton.addEventListener('click', () => {
          this.loadTrack(index);
          this.togglePlay();
        });
      });
    }
  
    // Initialisation des écouteurs d'événements
    initEventListeners() {
      // Boutons de contrôle
      document.querySelector('.play-pause').addEventListener('click', () => this.togglePlay());
      document.querySelector('.next').addEventListener('click', () => this.nextTrack());
      document.querySelector('.previous').addEventListener('click', () => this.previousTrack());
      
      // Barre de progression
      const progressBar = document.querySelector('.progress-bar');
      progressBar.addEventListener('click', (e) => {
        const progressBarWidth = progressBar.clientWidth;
        const clickPosition = e.offsetX;
        const duration = this.audioElement.duration;
        
        this.audioElement.currentTime = (clickPosition / progressBarWidth) * duration;
      });
      
      // Contrôle du volume
      const volumeSlider = document.querySelector('.volume-slider');
      volumeSlider.addEventListener('click', (e) => {
        const sliderWidth = volumeSlider.clientWidth;
        const clickPosition = e.offsetX;
        
        this.volume = clickPosition / sliderWidth;
        this.audioElement.volume = this.volume;
        document.querySelector('.volume-progress').style.width = `${this.volume * 100}%`;
      });
      
      // Événements de l'audio
      this.audioElement.addEventListener('timeupdate', () => this.updateProgressBar());
      this.audioElement.addEventListener('ended', () => this.nextTrack());
    }
  }
  
  // Initialiser le lecteur après le chargement du DOM
  document.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = new MusicPlayer();
  });