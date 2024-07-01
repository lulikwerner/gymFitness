document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/sessions/check-token');
        const data = await response.json();

        if (data.tokenValid) {
            // Ocultar opciones de inicio de sesión y registro
            document.querySelector('.registerButton').style.display = 'none';
            document.querySelector('.loginButton').style.display = 'none';

            // Mostrar opción de perfil y botón de logout
            const profileLink = document.getElementById('profileLink');
            const logoutButton = document.getElementById('logoutButton');
            if (profileLink) profileLink.style.display = 'block';
            if (logoutButton) logoutButton.style.display = 'block';
        } else {
            // Mostrar opciones de inicio de sesión y registro
            document.querySelector('.registerButton').style.display = 'block';
            document.querySelector('.loginButton').style.display = 'block';

            // Ocultar opción de perfil y botón de logout
            const profileLink = document.getElementById('profileLink');
            const logoutButton = document.getElementById('logoutButton');
            if (profileLink) profileLink.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Error verificando el token:', error);
    }
});

// Función para ir al perfil
function goProfile() {
    window.history.go(-1);
}
