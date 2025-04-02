document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Player controls functionality
    initPlayerControls();
    
    // Volume control functionality
    initVolumeControl();
    
    // Card hover effects and play button functionality
    initCardInteractions();
});

function initNavigation() {
    // Handle sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding page
            pages.forEach(page => {
                if (page.id === pageName) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });
    
    // Handle back/forward navigation
    const backButton = document.querySelector('.nav-button.back');
    const forwardButton = document.querySelector('.nav-button.forward');
    let navHistory = [];
    let currentNavIndex = -1;
    
    // When a nav item is clicked, add it to history
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            
            // If we're not at the end of history, truncate it
            if (currentNavIndex < navHistory.length - 1) {
                navHistory = navHistory.slice(0, currentNavIndex + 1);
            }
            
            // Add current page to history and increase index
            navHistory.push(pageName);
            currentNavIndex = navHistory.length - 1;
            
            // Update button states
            updateNavButtonStates();
        });
    });
    
    backButton.addEventListener('click', function() {
        if (currentNavIndex > 0) {
            currentNavIndex--;
            navigateToPage(navHistory[currentNavIndex]);
            updateNavButtonStates();
        }
    });
    
    forwardButton.addEventListener('click', function() {
        if (currentNavIndex < navHistory.length - 1) {
            currentNavIndex++;
            navigateToPage(navHistory[currentNavIndex]);
            updateNavButtonStates();
        }
    });
    
    function navigateToPage(pageName) {
        // Update active nav item
        navItems.forEach(nav => {
            if (nav.getAttribute('data-page') === pageName) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
        
        // Show corresponding page
        pages.forEach(page => {
            if (page.id === pageName) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }
    
    function updateNavButtonStates() {
        backButton.disabled = currentNavIndex <= 0;
        forwardButton.disabled = currentNavIndex >= navHistory.length - 1;
        
        // Visual indication of disabled state
        if (backButton.disabled) {
            backButton.classList.add('disabled');
        } else {
            backButton.classList.remove('disabled');
        }
        
        if (forwardButton.disabled) {
            forwardButton.classList.add('disabled');
        } else {
            forwardButton.classList.remove('disabled');
        }
    }
    
    // Initialize with homepage in history
    navHistory.push('home');
    currentNavIndex = 0;
    updateNavButtonStates();
    
    // Library tabs functionality
    const libraryTabs = document.querySelectorAll('.library-controls .tab');
    libraryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            libraryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Here you would also switch content based on the active tab
        });
    });
    
    // See all challenges button
    const seeAllButton = document.querySelector('.see-all-button');
    if (seeAllButton) {
        seeAllButton.addEventListener('click', function() {
            const challengesNavItem = document.querySelector('.nav-item[data-page="challenges"]');
            challengesNavItem.click();
        });
    }
}

function initPlayerControls() {
    const playPauseBtn = document.querySelector('.play-pause');
    const prevBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');
    const shuffleBtn = document.querySelector('.shuffle');
    const repeatBtn = document.querySelector('.repeat');
    const progressBar = document.querySelector('.player-bar .progress-bar');
    const progress = document.querySelector('.player-bar .progress');
    const currentTimeEl = document.querySelector('.current-time');
    const totalTimeEl = document.querySelector('.total-time');
    const likeButton = document.querySelector('.like-button');
    
    // Simulate playing state
    let isPlaying = false;
    
    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            this.innerHTML = '<i class="fas fa-pause"></i>';
            simulatePlayback();
        } else {
            this.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(playbackInterval);
        }
    });
    
    // Previous and Next buttons
    prevBtn.addEventListener('click', function() {
        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // You would typically load the previous track here
        // For simulation, we'll just update the track info
        updateTrackInfo('Titre précédent', 'Artiste précédent', 'https://i.scdn.co/image/ab67616d000048516c35dc99a693cf32aa8375d4');
    });
    
    nextBtn.addEventListener('click', function() {
        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // You would typically load the next track here
        // For simulation, we'll just update the track info
        updateTrackInfo('Titre suivant', 'Artiste suivant', 'https://i.scdn.co/image/ab67616d00004851bd69dea9e6395870adc8c185');
    });
    
    // Toggle buttons
    shuffleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    repeatBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Like button functionality
    likeButton.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.classList.remove('active');
        }
    });
    
    // Progress bar interaction
    progressBar.addEventListener('click', function(e) {
        const clickPosition = e.clientX - this.getBoundingClientRect().left;
        const progressWidth = this.clientWidth;
        const percentage = (clickPosition / progressWidth) * 100;
        
        // Update progress bar
        progress.style.width = percentage + '%';
        
        // Update time display
        const totalSeconds = convertTimeToSeconds(totalTimeEl.textContent);
        const newSeconds = Math.floor((percentage / 100) * totalSeconds);
        currentTimeEl.textContent = formatTime(newSeconds);
    });
    
    // Playback simulation
    let playbackInterval;
    function simulatePlayback() {
        const totalSeconds = convertTimeToSeconds(totalTimeEl.textContent);
        let currentSeconds = convertTimeToSeconds(currentTimeEl.textContent);
        
        playbackInterval = setInterval(() => {
            currentSeconds++;
            if (currentSeconds > totalSeconds) {
                currentSeconds = 0;
                // Simulate track end - could auto advance to next track
                if (!repeatBtn.classList.contains('active')) {
                    nextBtn.click();
                }
            }
            
            const percentage = (currentSeconds / totalSeconds) * 100;
            progress.style.width = percentage + '%';
            currentTimeEl.textContent = formatTime(currentSeconds);
        }, 1000);
    }
    
    // Helper functions
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    function convertTimeToSeconds(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }
    
    function updateTrackInfo(title, artist, imageUrl) {
        const trackTitle = document.querySelector('.track-details h4');
        const trackArtist = document.querySelector('.track-details p');
        const trackImage = document.querySelector('.track-info img');
        
        trackTitle.textContent = title;
        trackArtist.textContent = artist;
        trackImage.src = imageUrl;
    }
}

function initVolumeControl() {
    const volumeControl = document.querySelector('.volume-control');
    const volumeIcon = volumeControl.querySelector('i');
    const volumeSlider = volumeControl.querySelector('.volume-slider');
    const volumeProgress = volumeControl.querySelector('.volume-progress');
    
    let previousVolume = 100; // Store previous volume level
    
    // Update volume on slider click
    volumeSlider.addEventListener('click', function(e) {
        const clickPosition = e.clientX - this.getBoundingClientRect().left;
        const sliderWidth = this.clientWidth;
        const percentage = (clickPosition / sliderWidth) * 100;
        
        updateVolume(percentage);
    });
    
    // Toggle mute on icon click
    volumeIcon.addEventListener('click', function() {
        if (volumeIcon.classList.contains('fa-volume-up') || 
            volumeIcon.classList.contains('fa-volume-down')) {
            // Store current volume and mute
            previousVolume = parseInt(volumeProgress.style.width) || 100;
            updateVolume(0);
        } else {
            // Unmute to previous volume
            updateVolume(previousVolume);
        }
    });
    
    function updateVolume(percentage) {
        // Update volume slider
        volumeProgress.style.width = percentage + '%';
        
        // Update icon based on volume level
        volumeIcon.className = ''; // Remove all classes
        if (percentage === 0) {
            volumeIcon.classList.add('fas', 'fa-volume-mute');
        } else if (percentage < 50) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        }
    }
}

function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        
        // Show play button on hover
        card.addEventListener('mouseenter', function() {
            playButton.style.opacity = '1';
            playButton.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            playButton.style.opacity = '0';
            playButton.style.transform = 'translateY(10px)';
        });
        
        // Play functionality
        playButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            // Get track info from card
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const imageUrl = card.querySelector('img').src;
            
            // Update player track info
            const trackTitle = document.querySelector('.track-details h4');
            const trackArtist = document.querySelector('.track-details p');
            const trackImage = document.querySelector('.track-info img');
            
            trackTitle.textContent = title;
            trackArtist.textContent = description;
            trackImage.src = imageUrl;
            
            // Start playing
            const playPauseButton = document.querySelector('.play-pause');
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            document.dispatchEvent(new CustomEvent('startPlayback'));
        });
    });
}