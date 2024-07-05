document.addEventListener('DOMContentLoaded', () => {
    const logInForm = document.getElementById('logInForm');

    logInForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const logInData = new FormData(logInForm);
        const logInDataJSON = Object.fromEntries(logInData.entries());

        try {
            const response = await fetch('/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logInDataJSON)
            });

            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Error al logear usuario');
            }

            if (responseData.message === 'Usuario logeado correctamente' && responseData.tokenuser) {
                // Redirigir a profile.html con el token de usuario
                window.location.href = `/profile.html?token=${responseData.tokenuser}`;
            } else if (responseData.message === 'Usuario admin logeado correctamente' && responseData.token) {
                // Redirigir a admin.html con el token de administrador
                window.location.href = `/admin.html?token=${responseData.token}`;
            } else {
                // Mostrar un mensaje de error genérico si el tipo de usuario no está reconocido
                showAlert('Error al logearse. Tipo de usuario desconocido.');
            }

        } catch (error) {
            console.error('Error:', error.message);
            showAlert('Error al logearse. Usuario o contraseña incorrecta.');
        }
    });

    function showAlert(message) {
        alert(message);
    }
});

