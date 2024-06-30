document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/sessions/check-token');
        const data = await response.json();

        if (data.tokenValid) {
            // Ocultar opciones de inicio de sesión y registro
            document.querySelector('.registerButton').style.display = 'none';
            document.querySelector('.loginButton').style.display = 'none';

            // Mostrar opción de perfil
            document.getElementById('profileLink').style.display = 'block';
            document.querySelector('.logoutButton').style.display = 'block';
        } else {
            // Mostrar opciones de inicio de sesión y registro
            document.querySelector('.registerButton').style.display = 'block';
            document.querySelector('.loginButton').style.display = 'block';
            // Ocultar opción de perfil
            document.getElementById('profileLink').style.display = 'none';
            document.querySelector('.logoutButton').style.display = 'none';
        }
    } catch (error) {
        console.error('Error verificando el token:', error);
    }
    
});

// Función para ir al pefil
function goProfile() {
    window.history.go(-1);
}