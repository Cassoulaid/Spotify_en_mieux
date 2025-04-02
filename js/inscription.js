// Initialisation de la page Inscription
document.addEventListener('DOMContentLoaded', function() {
    // Configuration du formulaire d'inscription
    setupRegistrationForm();
    
    // Configuration du lien vers la page de connexion
    setupLoginLink();
});

// Configuration du formulaire d'inscription
function setupRegistrationForm() {
    const registrationForm = document.getElementById('register-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validation du mot de passe
            if (password !== confirmPassword) {
                showMessage('Les mots de passe ne correspondent pas.', 'error');
                return;
            }
            
            // Vérifier si l'email existe déjà
            if (emailExists(email)) {
                showMessage('Cet email est déjà utilisé. Veuillez vous connecter.', 'warning');
                return;
            }
            
            // Créer un nouvel utilisateur
            registerUser({
                name,
                email,
                password
            });
        });
    }
}

// Vérifier si l'email existe déjà dans la base d'utilisateurs
function emailExists(email) {
    const users = JSON.parse(localStorage.getItem('spotifyUsers') || '[]');
    return users.some(user => user.email === email);
}

// Inscription d'un nouvel utilisateur
function registerUser(userData) {
    // Afficher un message de chargement
    showMessage('Création de votre compte...', 'info');
    
    // Générer un identifiant unique
    const userId = 'user_' + Date.now() + Math.random().toString(36).substr(2, 5);
    
    // Créer l'utilisateur avec données par défaut
    const newUser = {
        id: userId,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        playlists: [],
        favorites: [],
        createdAt: new Date().toISOString()
    };
    
    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('spotifyUsers') || '[]');
    
    // Ajouter le nouvel utilisateur
    users.push(newUser);
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem('spotifyUsers', JSON.stringify(users));
    
    // Créer une copie sans le mot de passe pour la session
    const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        playlists: newUser.playlists,
        favorites: newUser.favorites,
        createdAt: newUser.createdAt
    };
    
    // Connecter automatiquement l'utilisateur
    localStorage.setItem('spotifyUser', JSON.stringify(sessionUser));
    localStorage.setItem('rememberMe', 'true');
    
    // Afficher un message de succès
    showMessage('Inscription réussie !', 'success');
    
    // Rediriger vers la page d'accueil après un court délai
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
}

// Configuration du lien vers la page de connexion
function setupLoginLink() {
    const loginLink = document.getElementById('login-link');
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'login.html';
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