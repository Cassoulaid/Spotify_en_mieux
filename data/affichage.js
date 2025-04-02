// Script pour charger et afficher les albums dans la bibliothèque

// Données des albums depuis le fichier musique.json
const musicData = {
    "tracks": [
      {
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night at the Opera",
        "duration": "5:55",
        "genre": "Rock",
        "cover": "https://cdn-images.dzcdn.net/images/cover/8f4ec8393fbb35bdc8dd19a84bff1b46/0x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Billie Jean",
        "artist": "Michael Jackson",
        "album": "Thriller",
        "duration": "4:54",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/544862aa5be45bc82ad4ab1a14daf63a/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Hotel California",
        "artist": "Eagles",
        "album": "Hotel California",
        "duration": "6:30",
        "genre": "Rock",
        "cover": "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg"
      },
      {
        "title": "Imagine",
        "artist": "John Lennon",
        "album": "Imagine",
        "duration": "3:07",
        "genre": "Rock",
        "cover":"https://cdn-images.dzcdn.net/images/cover/2675a9277dfabb74c32b7a3b2c9b0170/0x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Smells Like Teen Spirit",
        "artist": "Nirvana",
        "album": "Nevermind",
        "duration": "5:01",
        "genre": "Grunge",
        "cover": "https://cdn-images.dzcdn.net/images/cover/f0282817b697279e56df13909962a54a/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Like a Rolling Stone",
        "artist": "Bob Dylan",
        "album": "Highway 61 Revisited",
        "duration": "6:13",
        "genre": "Folk Rock",
        "cover": "https://i.scdn.co/image/ab67616d0000b27341720ef0ae31e10d39e43ca2"
      },
      {
        "title": "Stairway to Heaven",
        "artist": "Led Zeppelin",
        "album": "Led Zeppelin IV",
        "duration": "8:02",
        "genre": "Rock",
        "cover": "https://cdn-images.dzcdn.net/images/cover/460a0edd96f743be03b7405eac38c633/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Hey Jude",
        "artist": "The Beatles",
        "album": "Single",
        "duration": "7:11",
        "genre": "Rock",
        "cover": "https://upload.wikimedia.org/wikipedia/en/0/0a/Heyjudealbum.jpg"
      },
      {
        "title": "Superstition",
        "artist": "Stevie Wonder",
        "album": "Talking Book",
        "duration": "4:26",
        "genre": "Funk",
        "cover":  "https://i1.sndcdn.com/artworks-000153316247-e13f5i-t500x500.jpg"
      },
      {
        "title": "Purple Haze",
        "artist": "Jimi Hendrix",
        "album": "Are You Experienced",
        "duration": "2:50",
        "genre": "Psychedelic Rock",
        "cover": "https://cdn-images.dzcdn.net/images/cover/b83888148da4c3978b9c3870d8cb3166/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Sweet Child O' Mine",
        "artist": "Guns N' Roses",
        "album": "Appetite for Destruction",
        "duration": "5:56",
        "genre": "Rock",
        "cover":"https://i.scdn.co/image/ab67616d0000b27368384dd85fd5e95831252f60"
      },
      {
        "title": "Thriller",
        "artist": "Michael Jackson",
        "album": "Thriller",
        "duration": "5:57",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/544862aa5be45bc82ad4ab1a14daf63a/0x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Yesterday",
        "artist": "The Beatles",
        "album": "Help!",
        "duration": "2:05",
        "genre": "Rock",
        "cover": "https://upload.wikimedia.org/wikipedia/en/e/e5/Beatles-singles-yesterday.jpg"
      },
      {
        "title": "Rolling in the Deep",
        "artist": "Adele",
        "album": "21",
        "duration": "3:49",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/d66197eb2ff199a77b8c6b9387fa1143/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Lose Yourself",
        "artist": "Eminem",
        "album": "8 Mile",
        "duration": "5:26",
        "genre": "Hip-Hop",
        "cover": "https://m.media-amazon.com/images/I/51i4O6PHoUL._UF894,1000_QL80_.jpg"
      },
      {
        "title": "Uptown Funk",
        "artist": "Mark Ronson ft. Bruno Mars",
        "album": "Uptown Special",
        "duration": "4:30",
        "genre": "Funk",
        "cover": "https://cdn-images.dzcdn.net/images/cover/3734366a73152d0367a83a4b09fd163f/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Shape of You",
        "artist": "Ed Sheeran",
        "album": "÷ (Divide)",
        "duration": "3:53",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/107c2b43f10c249077c1f7618563bb63/0x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Blinding Lights",
        "artist": "The Weeknd",
        "album": "After Hours",
        "duration": "3:20",
        "genre": "Synthwave",
        "cover": "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
      },
      {
        "title": "Levitating",
        "artist": "Dua Lipa ft. DaBaby",
        "album": "Future Nostalgia",
        "duration": "3:24",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/3c5cd0eb919ff9a7767b8ac7acc89e40/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Dance Monkey",
        "artist": "Tones and I",
        "album": "The Kids Are Coming",
        "duration": "3:29",
        "genre": "Electropop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/3d7b540eb85c84a37cd5bf53740991cb/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Old Town Road",
        "artist": "Lil Nas X",
        "album": "7 EP",
        "duration": "2:37",
        "genre": "Country Rap",
        "cover": "https://m.media-amazon.com/images/I/41RuQ-XAMSL._UXNaN_FMjpg_QL85_.jpg"
      },
      {
        "title": "HUMBLE.",
        "artist": "Kendrick Lamar",
        "album": "DAMN.",
        "duration": "2:57",
        "genre": "Hip-Hop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/1900x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Señorita",
        "artist": "Shawn Mendes & Camila Cabello",
        "album": "Single",
        "duration": "3:10",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/4426e8a06d8d0cd96263094c6178bbf9/0x1900-000000-80-0-0.jpg"
      },
      {
        "title": "Perfect",
        "artist": "Ed Sheeran",
        "album": "÷ (Divide)",
        "duration": "4:23",
        "genre": "Pop",
        "cover": "https://cdn-images.dzcdn.net/images/cover/000a9228cecfcc7c2093d9cd7bb66447/1900x1900-000000-80-0-0.jpg"
      }
    ]
  };
  
  // Fonction pour initialiser l'affichage des albums
function initializeLibraryAlbums() {
    // Sélectionner l'onglet "Albums" lors du chargement de la page
    const albumTab = document.querySelector('.tab:nth-child(3)');
    const allTabs = document.querySelectorAll('.tab');
    
    allTabs.forEach(tab => tab.classList.remove('active'));
    albumTab.classList.add('active');
    
    // Créer le conteneur de la grille d'albums s'il n'existe pas
    const libraryItems = document.querySelector('.library-items');
    libraryItems.innerHTML = ''; // Vider le contenu existant
    
    // Ajouter une classe pour le style de grille
    libraryItems.classList.add('albums-grid');
    
    // Vérifier si le filtre existe déjà
    const existingFilter = document.querySelector('.genre-filter');
    if (!existingFilter) {
      // Créer un filtre par genre seulement si aucun n'existe
      const genres = ['Tous', ...new Set(musicData.tracks.map(track => track.genre))];
      
      const filterContainer = document.createElement('div');
      filterContainer.className = 'genre-filter';
      
      const filterLabel = document.createElement('span');
      filterLabel.textContent = 'Filtrer par genre:';
      filterContainer.appendChild(filterLabel);
      
      const filterSelect = document.createElement('select');
      filterSelect.id = 'genre-filter';
      
      genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        filterSelect.appendChild(option);
      });
      
      filterContainer.appendChild(filterSelect);
      
      // Insérer le filtre avant la grille d'albums
      const librarySection = document.querySelector('#library');
      librarySection.insertBefore(filterContainer, libraryItems);
      
      // Ajouter l'événement de changement sur le filtre
      filterSelect.addEventListener('change', function() {
        renderAlbums(this.value);
      });
    }
    
    // Générer les cartes d'albums
    renderAlbums('Tous');
  }
  
  // Fonction pour afficher les albums
  function renderAlbums(selectedGenre) {
    const libraryItems = document.querySelector('.library-items');
    libraryItems.innerHTML = ''; // Vider le contenu existant
    
    // Filtrer les albums par genre si nécessaire
    const filteredAlbums = selectedGenre === 'Tous' 
      ? musicData.tracks 
      : musicData.tracks.filter(track => track.genre === selectedGenre);
    
    // Créer une carte pour chaque album
    filteredAlbums.forEach(track => {
      const albumCard = document.createElement('div');
      albumCard.className = 'album-card';
      
      // Image de couverture avec gestion d'erreur
      const coverImg = document.createElement('div');
      coverImg.className = 'album-cover';
      
      const img = document.createElement('img');
      img.src = track.cover;
      img.alt = `${track.album} cover`;
      img.onerror = function() {
        this.src = 'https://via.placeholder.com/150'; // Image par défaut en cas d'erreur
      };
      
      // Bouton de lecture
      const playButton = document.createElement('button');
      playButton.className = 'play-button';
      playButton.innerHTML = '<i class="fas fa-play"></i>';
      
      coverImg.appendChild(img);
      coverImg.appendChild(playButton);
      
      // Informations sur l'album
      const albumInfo = document.createElement('div');
      albumInfo.className = 'album-info';
      
      const albumTitle = document.createElement('h3');
      albumTitle.textContent = track.album;
      
      const artistName = document.createElement('p');
      artistName.textContent = track.artist;
      
      const genreTag = document.createElement('span');
      genreTag.className = 'genre-tag';
      genreTag.textContent = track.genre;
      
      albumInfo.appendChild(albumTitle);
      albumInfo.appendChild(artistName);
      albumInfo.appendChild(genreTag);
      
      // Assembler la carte
      albumCard.appendChild(coverImg);
      albumCard.appendChild(albumInfo);
      
      // Ajouter la carte à la grille
      libraryItems.appendChild(albumCard);
    });
    
    // Afficher un message si aucun album n'est trouvé
    if (filteredAlbums.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.textContent = 'Aucun album trouvé dans ce genre.';
      libraryItems.appendChild(noResults);
    }
  }
  
  // CSS pour la grille d'albums
  const style = document.createElement('style');
  style.textContent = `
    .albums-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 24px;
      padding: 20px 0;
    }
    
    .album-card {
      background-color: rgba(24, 24, 24, 0.7);
      border-radius: 8px;
      padding: 16px;
      transition: background-color 0.3s ease;
    }
    
    .album-card:hover {
      background-color: rgba(40, 40, 40, 0.7);
    }
    
    .album-cover {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      margin-bottom: 16px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .album-cover img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .album-cover .play-button {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 40px;
      height: 40px;
      background-color: #1DB954;
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .album-card:hover .play-button {
      opacity: 1;
      transform: translateY(0);
    }
    
    .album-info h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .album-info p {
      font-size: 14px;
      color: #b3b3b3;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .genre-tag {
      display: inline-block;
      padding: 2px 8px;
      background-color: rgba(29, 185, 84, 0.2);
      color: #1DB954;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .genre-filter {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .genre-filter select {
      background-color: rgba(40, 40, 40, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: white;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
    }
    
    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #b3b3b3;
    }
    
    /* Style pour les onglets */
    .tabs .tab {
      cursor: pointer;
    }
  `;
  
  document.head.appendChild(style);
  
  // Exécuter l'initialisation des albums quand l'onglet Bibliothèque est cliqué
  document.addEventListener('DOMContentLoaded', function() {
    // Observer les clics sur les onglets de navigation
    const libraryNavItem = document.querySelector('.nav-item[data-page="library"]');
    
    libraryNavItem.addEventListener('click', function() {
      // Attendre que la page de bibliothèque soit active
      setTimeout(initializeLibraryAlbums, 100);
    });
    
    // Observer les clics sur les onglets de la bibliothèque
    const albumTab = document.querySelector('.tab:nth-child(3)');
    
    albumTab.addEventListener('click', function() {
      const allTabs = document.querySelectorAll('.tab');
      allTabs.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');
      
      initializeLibraryAlbums();
    });
  });