// Initialisation de la page Connexion
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est déjà connecté
    checkLoggedInUser();
    
    // Configuration du formulaire de connexion
    setupLoginForm();
    
    // Configuration du lien vers la page d'inscription
    setupRegisterLink();
});

// Vérifier si un utilisateur est déjà connecté
function checkLoggedInUser() {
    const storedUser = localStorage.getItem('spotifyUser');
    const rememberMe = localStorage.getItem('rememberMe');
    
    if (storedUser && rememberMe === 'true') {
        const user = JSON.parse(storedUser);
        // Redirection vers la page principale si l'utilisateur est connecté
        window.location.href = 'index.html';
    }
}

// Configuration du formulaire de connexion
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Authentifier l'utilisateur
            authenticateUser(email, password, rememberMe);
        });
    }
}

// Authentification de l'utilisateur
function authenticateUser(email, password, rememberMe) {
    // Afficher un message de chargement
    showMessage('Connexion en cours...', 'info');
    
    // Récupérer les utilisateurs du localStorage
    const users = JSON.parse(localStorage.getItem('spotifyUsers') || '[]');
    
    // Rechercher l'utilisateur correspondant
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Créer une copie sans le mot de passe pour la stocker dans la session
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            playlists: user.playlists || [],
            favorites: user.favorites || [],
            createdAt: user.createdAt
        };
        
        // Enregistrer l'utilisateur et l'option "se souvenir de moi" dans le localStorage
        localStorage.setItem('spotifyUser', JSON.stringify(sessionUser));
        localStorage.setItem('rememberMe', rememberMe.toString());
        
        // Afficher un message de succès
        showMessage('Connexion réussie !', 'success');
        
        // Rediriger vers la page d'accueil après un court délai
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showMessage('Identifiants incorrects. Veuillez réessayer.', 'error');
    }
}

// Configuration du lien vers la page d'inscription
function setupRegisterLink() {
    const registerLink = document.getElementById('register-link');
    
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'inscription.html';
        });
    }
}

// Affichage des messages à l'utilisateur
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