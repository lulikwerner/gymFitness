document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const formDataJSON = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/sessions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON)
            });

            const responseData = await response.json(); 

            if (!response.ok) {
                throw new Error(responseData.error || 'Error al registrar usuario');
            }

            showAlert('Usuario registrado exitosamente');

            setTimeout(() => {
                window.location.href = '/login.html';
            }, 1000); 
        } catch (error) {
            console.error('Error:', error.message);
            showAlert(error.message);
        }
    });

    function showAlert(message) {
        alert(message);
    }
});
