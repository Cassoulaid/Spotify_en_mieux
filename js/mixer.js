document.addEventListener('DOMContentLoaded', function() {
    // Initialize the mixer when on the mixer page
    initMixer();
    
    function initMixer() {
        // Get all needed elements
        const moodOptions = document.querySelectorAll('.mood-option');
        const tempoSlider = document.getElementById('tempo-slider');
        const intensitySlider = document.getElementById('intensity-slider');
        const acousticSlider = document.getElementById('acoustic-slider');
        const sliderValues = document.querySelectorAll('.slider-value');
        const tracksContainer = document.querySelector('.tracks-container');
        const saveMixButton = document.querySelector('.save-mix-button');
        const canvas = document.getElementById('mixer-canvas');
        
        if (!canvas) return; // Exit if we're not on the mixer page
        
        // Set up canvas
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 200;
        
        // Sample tracks data
        const tracks = [
            { title: "Summer Vibes", artist: "Beach Harmony", energy: 70, tempo: 65, acoustic: 20, genre: "Pop", albumArt: "https://i.scdn.co/image/ab67616d00004851cb4ec52c48a6b071ed2ab6bc" },
            { title: "Midnight Dreams", artist: "Luna Echo", energy: 40, tempo: 45, acoustic: 80, genre: "Ambient", albumArt: "https://i.scdn.co/image/ab67616d0000485171c65edbeed32ae9a22fbed6" },
            { title: "Electric Rush", artist: "Voltage", energy: 90, tempo: 85, acoustic: 10, genre: "Electronic", albumArt: "https://i.scdn.co/image/ab67616d0000485133f428b53d2d2ff62bd1b36c" },
            { title: "Mountain Air", artist: "Nature Sounds", energy: 30, tempo: 40, acoustic: 95, genre: "Acoustic", albumArt: "https://i.scdn.co/image/ab67616d000048511b6cc5d87fcb25006bf3428a" },
            { title: "Urban Pulse", artist: "City Beats", energy: 75, tempo: 80, acoustic: 30, genre: "Hip Hop", albumArt: "https://i.scdn.co/image/ab67616d0000485174a899bd85f3e7af5855006a" }
        ];
        
        // Current settings
        let currentSettings = {
            mood: "",
            tempo: 50,
            intensity: 50,
            acoustic: 50
        };
        
        // Mood selection
        moodOptions.forEach(option => {
            option.addEventListener('click', function() {
                const mood = this.getAttribute('data-mood');
                
                // Remove active class from all options
                moodOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to selected option
                this.classList.add('active');
                
                // Update current settings
                currentSettings.mood = mood;
                
                // Update sliders based on mood
                updateSlidersByMood(mood);
                
                // Update visualization and tracks
                updateVisualization();
                updateRecommendedTracks();
            });
        });
        
        // Function to set slider values based on mood
        function updateSlidersByMood(mood) {
            switch(mood) {
                case 'relaxing':
                    setSliders(30, 20, 75);
                    break;
                case 'energetic':
                    setSliders(80, 85, 30);
                    break;
                case 'focused':
                    setSliders(45, 40, 60);
                    break;
                case 'happy':
                    setSliders(65, 70, 50);
                    break;
                case 'melancholic':
                    setSliders(35, 30, 80);
                    break;
                default:
                    // Don't change anything
                    break;
            }
        }
        
        // Function to set slider values and update UI
        function setSliders(tempo, intensity, acoustic) {
            tempoSlider.value = tempo;
            intensitySlider.value = intensity;
            acousticSlider.value = acoustic;
            
            // Update current settings
            currentSettings.tempo = tempo;
            currentSettings.intensity = intensity;
            currentSettings.acoustic = acoustic;
            
            // Update slider value texts
            updateSliderValues();
        }
        
        // Slider event listeners
        tempoSlider.addEventListener('input', function() {
            currentSettings.tempo = this.value;
            updateSliderValues();
            updateVisualization();
            updateRecommendedTracks();
        });
        
        intensitySlider.addEventListener('input', function() {
            currentSettings.intensity = this.value;
            updateSliderValues();
            updateVisualization();
            updateRecommendedTracks();
        });
        
        acousticSlider.addEventListener('input', function() {
            currentSettings.acoustic = this.value;
            updateSliderValues();
            updateVisualization();
            updateRecommendedTracks();
        });
        
        // Update slider value texts
        function updateSliderValues() {
            // Tempo value text
            let tempoText;
            if (currentSettings.tempo < 33) {
                tempoText = "Lent";
            } else if (currentSettings.tempo < 66) {
                tempoText = "Modéré";
            } else {
                tempoText = "Rapide";
            }
            document.querySelector('#tempo-slider').previousElementSibling.querySelector('.slider-value').textContent = tempoText;
            
            // Intensity value text
            let intensityText;
            if (currentSettings.intensity < 33) {
                intensityText = "Douce";
            } else if (currentSettings.intensity < 66) {
                intensityText = "Modérée";
            } else {
                intensityText = "Forte";
            }
            document.querySelector('#intensity-slider').previousElementSibling.querySelector('.slider-value').textContent = intensityText;
            
            // Acoustic/Electronic value text
            let acousticText;
            if (currentSettings.acoustic < 33) {
                acousticText = "Électronique";
            } else if (currentSettings.acoustic < 66) {
                acousticText = "Mixte";
            } else {
                acousticText = "Acoustique";
            }
            document.querySelector('#acoustic-slider').previousElementSibling.querySelector('.slider-value').textContent = acousticText;
        }
        
        // Visualization
        function updateVisualization() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background
            ctx.fillStyle = '#121212';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Number of bars
            const numBars = 30;
            const barWidth = canvas.width / numBars;
            
            // Generate bar heights based on current settings
            for (let i = 0; i < numBars; i++) {
                // Calculate bar height
                const tempo = currentSettings.tempo / 100;
                const intensity = currentSettings.intensity / 100;
                const acoustic = currentSettings.acoustic / 100;
                
                // More chaotic for high tempo, smoother for low tempo
                const frequency = 0.1 + tempo * 0.5;
                const amplitude = 0.5 + intensity * 0.5;
                const smoothness = acoustic * 0.8; 
                
                // Generate a height using sin waves + noise
                let height = Math.sin(i * frequency) * amplitude * 0.7;
                height += (1 - smoothness) * (Math.random() * 0.4);
                height = Math.abs(height) * canvas.height;
                
                // Ensure minimum height
                height = Math.max(height, 5);
                
                // Gradient color based on acoustic/electronic
                let gradientColor;
                if (currentSettings.acoustic < 33) {
                    // More electronic - purples and blues
                    gradientColor = `rgb(${100 + Math.round(intensity * 50)}, ${50}, ${200 + Math.round(intensity * 55)})`;
                } else if (currentSettings.acoustic < 66) {
                    // Mix - greens and teals
                    gradientColor = `rgb(${20}, ${120 + Math.round(intensity * 80)}, ${120 + Math.round(intensity * 80)})`;
                } else {
                    // More acoustic - warm browns and oranges
                    gradientColor = `rgb(${200 + Math.round(intensity * 55)}, ${100 + Math.round(intensity * 55)}, ${20})`;
                }
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - height);
                gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
                gradient.addColorStop(1, gradientColor);
                
                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
            }
        }
        
        // Find tracks that match current settings
        function updateRecommendedTracks() {
            // Clear current tracks
            tracksContainer.innerHTML = '';
            
            // Calculate score for each track based on how well it matches current settings
            // Lower score = better match
            const scoredTracks = tracks.map(track => {
                let score = 0;
                score += Math.abs(track.tempo - currentSettings.tempo);
                score += Math.abs(track.energy - currentSettings.intensity);
                score += Math.abs(track.acoustic - currentSettings.acoustic);
                return { ...track, score };
            });
            
            // Sort by score (lowest first)
            scoredTracks.sort((a, b) => a.score - b.score);
            
            // Display top 3 matches
            const topTracks = scoredTracks.slice(0, 3);
            
            topTracks.forEach(track => {
                const trackEl = document.createElement('div');
                trackEl.className = 'track-item';
                
                trackEl.innerHTML = `
                    <img src="${track.albumArt}" alt="${track.title}">
                    <div class="track-info">
                        <h3>${track.title}</h3>
                        <p>${track.artist}</p>
                        <span class="genre">${track.genre}</span>
                    </div>
                    <button class="play-track"><i class="fas fa-play"></i></button>
                `;
                
                tracksContainer.appendChild(trackEl);
                
                // Play button functionality
                const playBtn = trackEl.querySelector('.play-track');
                playBtn.addEventListener('click', function() {
                    // Update player track info
                    updatePlayerInfo(track);
                    
                    // Start playing
                    const playPauseButton = document.querySelector('.play-pause');
                    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
                    
                    // Dispatch event for player to handle
                    document.dispatchEvent(new CustomEvent('startPlayback'));
                });
            });
        }
        
        // Update player information when track is selected
        function updatePlayerInfo(track) {
            const trackInfo = document.querySelector('.player-bar .track-info');
            const trackImage = trackInfo.querySelector('img');
            const trackTitle = trackInfo.querySelector('h4');
            const trackArtist = trackInfo.querySelector('p');
            
            trackImage.src = track.albumArt;
            trackTitle.textContent = track.title;
            trackArtist.textContent = track.artist;
            
            // Reset progress bar
            const progress = document.querySelector('.player-bar .progress');
            progress.style.width = '0%';
            document.querySelector('.current-time').textContent = '0:00';
            
            // Simulate random track length
            const totalMinutes = Math.floor(Math.random() * 2) + 3;
            const totalSeconds = Math.floor(Math.random() * 60);
            document.querySelector('.total-time').textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
        }
        
        // Save mix button functionality
        saveMixButton.addEventListener('click', function() {
            // Create mix name based on settings
            let mixName = "Mix ";
            
            // Add mood if selected
            if (currentSettings.mood) {
                mixName += currentSettings.mood.charAt(0).toUpperCase() + currentSettings.mood.slice(1) + " ";
            }
            
            // Add additional descriptor based on settings
            if (currentSettings.tempo > 70) {
                mixName += "Rapide";
            } else if (currentSettings.acoustic > 70) {
                mixName += "Acoustique";
            } else if (currentSettings.intensity > 70) {
                mixName += "Intense";
            } else {
                mixName += "Personnalisé";
            }
            
            // Show save confirmation
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${mixName} enregistré dans vos playlists</span>
            `;
            document.body.appendChild(toast);
            
            // Remove toast after 3 seconds
            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
            
            // Add to playlists in the sidebar
            const playlists = document.querySelector('.sidebar .playlists ul');
            const newPlaylist = document.createElement('li');
            newPlaylist.textContent = mixName;
            playlists.prepend(newPlaylist);
            
            // Highlight with animation
            newPlaylist.classList.add('new-playlist');
            setTimeout(() => {
                newPlaylist.classList.remove('new-playlist');
            }, 3000);
        });
        
        // Animation frame for visualization
        let animationFrameId;
        function animateVisualization() {
            updateVisualization();
            animationFrameId = requestAnimationFrame(animateVisualization);
        }
        
        // Start visualization animation only when player is playing
        document.addEventListener('startPlayback', function() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animateVisualization();
            
            // Simulate playback progress
            simulatePlayback();
        });
        
        // Playback simulation
        let playbackInterval;
        function simulatePlayback() {
            // Clear any existing interval
            if (playbackInterval) {
                clearInterval(playbackInterval);
            }
            
            const progress = document.querySelector('.player-bar .progress');
            const currentTimeElement = document.querySelector('.current-time');
            const totalTimeText = document.querySelector('.total-time').textContent;
            const totalTimeParts = totalTimeText.split(':');
            const totalSeconds = parseInt(totalTimeParts[0]) * 60 + parseInt(totalTimeParts[1]);
            
            let currentSeconds = 0;
            
            playbackInterval = setInterval(() => {
                currentSeconds++;
                
                // Update progress bar
                const percentage = (currentSeconds / totalSeconds) * 100;
                progress.style.width = `${percentage}%`;
                
                // Update current time display
                const minutes = Math.floor(currentSeconds / 60);
                const seconds = currentSeconds % 60;
                currentTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // End playback when finished
                if (currentSeconds >= totalSeconds) {
                    clearInterval(playbackInterval);
                    document.querySelector('.play-pause').innerHTML = '<i class="fas fa-play"></i>';
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            }, 1000);
        }
        
        // Add play/pause toggle functionality
        const playPauseButton = document.querySelector('.play-pause');
        if (playPauseButton) {
            playPauseButton.addEventListener('click', function() {
                const isPlaying = this.querySelector('i').classList.contains('fa-pause');
                
                if (isPlaying) {
                    // Pause
                    this.innerHTML = '<i class="fas fa-play"></i>';
                    clearInterval(playbackInterval);
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                } else {
                    // Resume or start playing
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    simulatePlayback();
                    if (!animationFrameId) {
                        animateVisualization();
                    }
                }
            });
        }
        
        // Handle window resize for canvas
        window.addEventListener('resize', function() {
            canvas.width = canvas.parentElement.clientWidth;
            updateVisualization();
        });
        
        // Volume control functionality
        const volumeControl = document.querySelector('.volume-control');
        const volumeSlider = volumeControl.querySelector('.volume-slider');
        const volumeProgress = volumeSlider.querySelector('.volume-progress');
        
        volumeSlider.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            volumeProgress.style.width = `${position * 100}%`;
            
            // Update volume icon based on level
            const volumeIcon = volumeControl.querySelector('i');
            if (position === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (position < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        });
        
        // Initialize with default visualization and tracks
        updateVisualization();
        updateRecommendedTracks();
        
        // Add event listeners for next and previous buttons
        const nextButton = document.querySelector('.next');
        const previousButton = document.querySelector('.previous');
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                // Get a random track and play it
                const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                updatePlayerInfo(randomTrack);
                
                // If currently playing, start playback of new track
                if (document.querySelector('.play-pause i').classList.contains('fa-pause')) {
                    document.dispatchEvent(new CustomEvent('startPlayback'));
                }
            });
        }
        
        if (previousButton) {
            previousButton.addEventListener('click', function() {
                // Similar to next button but with different logic if needed
                const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                updatePlayerInfo(randomTrack);
                
                if (document.querySelector('.play-pause i').classList.contains('fa-pause')) {
                    document.dispatchEvent(new CustomEvent('startPlayback'));
                }
            });
        }
    }
});