document.addEventListener('DOMContentLoaded', function() {
    // Sample data for badges
    const badges = [
        { name: "Explorateur", icon: "compass", color: "#1DB954", description: "Vous avez écouté des artistes de 20 pays différents" },
        { name: "Night Owl", icon: "moon", color: "#7358FF", description: "Plus de 100 heures d'écoute nocturne" },
        { name: "First Day Fan", icon: "star", color: "#FF6437", description: "Vous avez écouté 5 albums le jour de leur sortie" },
        { name: "Genre Master", icon: "music", color: "#E91429", description: "Plus de 30 genres musicaux explorés" },
        { name: "Marathon", icon: "headphones", color: "#148A08", description: "8 heures d'écoute consécutives" }
    ];
    
    // Sample data for active challenges
    const activeChallenges = [
        { 
            name: "Explorer des genres", 
            description: "Écoutez 5 nouveaux genres cette semaine", 
            progress: 65,
            deadline: "3 jours restants",
            reward: "Badge Explorateur"
        },
        { 
            name: "Découverte locale", 
            description: "Écoutez 10 artistes de votre région", 
            progress: 30,
            deadline: "5 jours restants",
            reward: "Playlist personnalisée"
        },
        { 
            name: "Voyage musical", 
            description: "Écoutez des artistes de 5 continents", 
            progress: 80,
            deadline: "2 jours restants",
            reward: "Badge Globetrotter"
        }
    ];
    
    // Sample data for completed challenges
    const completedChallenges = [
        { 
            name: "Rétro", 
            description: "Écoutez 20 chansons des années 80", 
            dateCompleted: "11 Mars 2025",
            reward: "Badge Vintager"
        },
        { 
            name: "Diversité", 
            description: "Écoutez 10 artistes que vous n'avez jamais écoutés", 
            dateCompleted: "25 Février 2025",
            reward: "Playlist découverte"
        }
    ];
    
    // Initialize challenges page
    initBadges();
    initActiveChallenges();
    initCompletedChallenges();
    
    // Also initialize the challenge preview on home page
    initChallengePreview();
    
    function initBadges() {
        const badgesContainer = document.querySelector('.badges-container');
        if (!badgesContainer) return;
        
        badges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'badge';
            badgeEl.style.backgroundColor = badge.color;
            
            badgeEl.innerHTML = `
                <div class="badge-icon">
                    <i class="fas fa-${badge.icon}"></i>
                </div>
                <div class="badge-info">
                    <h3>${badge.name}</h3>
                    <p>${badge.description}</p>
                </div>
            `;
            
            badgesContainer.appendChild(badgeEl);
            
            // Add tooltip functionality
            badgeEl.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'badge-tooltip';
                tooltip.textContent = badge.description;
                badgeEl.appendChild(tooltip);
            });
            
            badgeEl.addEventListener('mouseleave', function() {
                const tooltip = badgeEl.querySelector('.badge-tooltip');
                if (tooltip) {
                    badgeEl.removeChild(tooltip);
                }
            });
        });
    }
    
    function initActiveChallenges() {
        const challengesContainer = document.querySelector('.challenges-container');
        if (!challengesContainer) return;
        
        activeChallenges.forEach(challenge => {
            const challengeEl = document.createElement('div');
            challengeEl.className = 'challenge-item';
            
            challengeEl.innerHTML = `
                <div class="challenge-header">
                    <h3>${challenge.name}</h3>
                    <span class="deadline">${challenge.deadline}</span>
                </div>
                <p>${challenge.description}</p>
                <div class="challenge-progress-bar">
                    <div class="challenge-progress-fill" style="width: ${challenge.progress}%"></div>
                </div>
                <div class="challenge-footer">
                    <span class="challenge-progress-text">${challenge.progress}% complété</span>
                    <span class="reward"><i class="fas fa-gift"></i> ${challenge.reward}</span>
                </div>
            `;
            
            challengesContainer.appendChild(challengeEl);
        });
    }
    
    function initCompletedChallenges() {
        const completedContainer = document.querySelector('.completed-container');
        if (!completedContainer) return;
        
        completedChallenges.forEach(challenge => {
            const challengeEl = document.createElement('div');
            challengeEl.className = 'completed-item challenge-item'; // Ajout de challenge-item pour partager le style
            
            challengeEl.innerHTML = `
                <div class="challenge-header">
                    <h3>${challenge.name}</h3>
                    <span class="completion-date">${challenge.dateCompleted}</span>
                </div>
                <p>${challenge.description}</p>
                <div class="challenge-footer">
                    <span class="reward"><i class="fas fa-award"></i> Récompense : ${challenge.reward}</span>
                </div>
            `;
            
            completedContainer.appendChild(challengeEl);
        });
    }
    
    function initChallengePreview() {
        // Update the challenge preview on the home page
        const previewProgress = document.querySelector('.challenge-progress circle.progress-bar');
        const previewText = document.querySelector('.progress-text');
        
        if (previewProgress && previewText) {
            // Get the first active challenge for the preview
            const firstChallenge = activeChallenges[0];
            previewProgress.style.setProperty('--progress', `${firstChallenge.progress}%`);
            previewText.textContent = `${firstChallenge.progress}%`;
            
            // Update challenge info
            const challengeTitle = document.querySelector('.challenge-info h3');
            const challengeDesc = document.querySelector('.challenge-info p');
            
            if (challengeTitle && challengeDesc) {
                challengeTitle.textContent = firstChallenge.name;
                challengeDesc.textContent = firstChallenge.description;
            }
        }
    }
});