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

            // Convertir la respuesta a JSON
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Error al logearse');
            }

            // Mostrar mensaje de éxito
            showAlert('Usuario logeado exitosamente');

            // Esperar 1 segundo antes de redirigir
            setTimeout(() => {
                if (responseData.message === 'Usuario logeado correctamente' && responseData.tokenuser) {
                    // Redirigir a profile.html con el token
                    window.location.href = `/profile.html?token=${responseData.tokenuser}`;
                }
            }, 1000);

        } catch (error) {
            console.error('Error:', error.message);
            showAlert('Error al logearse. Usuario o contraseña incorrecta.');
        }
    });

    function showAlert(message) {
        alert(message);
    }
});
