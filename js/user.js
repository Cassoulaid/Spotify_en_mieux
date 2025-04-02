// Fichier pour la gestion des utilisateurs sur toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si un utilisateur est connecté
    const currentUser = getUserFromLocalStorage();
    
    // Mettre à jour l'interface en fonction de l'état de connexion
    updateUI(currentUser);
    
    // Configuration du bouton de déconnexion
    setupLogoutButton();
});

// Récupérer l'utilisateur depuis le localStorage
function getUserFromLocalStorage() {
    const user = localStorage.getItem('spotifyUser');
    return user ? JSON.parse(user) : null;
}

// Mettre à jour l'interface utilisateur
function updateUI(user) {
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const userProfileButton = document.getElementById('user-profile');
    const userNameDisplay = document.getElementById('user-name');
    
    if (user) {
        // Utilisateur connecté
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        
        if (userProfileButton) userProfileButton.style.display = 'block';
        if (userNameDisplay) {
            userNameDisplay.textContent = user.name;
            userNameDisplay.style.display = 'block';
        }
    } else {
        // Utilisateur non connecté
        if (loginButton) loginButton.style.display = 'block';
        if (registerButton) registerButton.style.display = 'block';
        
        if (userProfileButton) userProfileButton.style.display = 'none';
        if (userNameDisplay) userNameDisplay.style.display = 'none';
    }
}

// Configuration du bouton de déconnexion
function setupLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Supprimer les données utilisateur du localStorage
            localStorage.removeItem('spotifyUser');
            localStorage.removeItem('rememberMe');
            
            // Afficher un message
            showMessage('Déconnexion réussie !', 'info');
            
            // Rediriger vers la page d'accueil
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
}

// Fonction pour afficher des messages à l'utilisateur
function showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('message-container');
    
    if (!messageContainer) {
        // Créer le conteneur de message s'il n'existe pas
        const container = document.createElement('div');
        container.id = 'message-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.padding = '10px 20px';
        container.style.borderRadius = '5px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    
    const container = document.getElementById('message-container');
    container.textContent = message;
    
    // Appliquer le style en fonction du type de message
    switch (type) {
        case 'success':
            container.style.backgroundColor = '#1DB954'; // Vert Spotify
            container.style.color = 'white';
            break;
        case 'error':
            container.style.backgroundColor = '#E22134'; // Rouge
            container.style.color = 'white';
            break;
        case 'warning':
            container.style.backgroundColor = '#FF9800'; // Orange
            container.style.color = 'white';
            break;
        case 'info':
        default:
            container.style.backgroundColor = '#333333'; // Gris foncé Spotify
            container.style.color = 'white';
            break;
    }
    
    // Afficher le message pendant 3 secondes
    container.style.display = 'block';
    setTimeout(function() {
        container.style.display = 'none';
    }, 3000);
}