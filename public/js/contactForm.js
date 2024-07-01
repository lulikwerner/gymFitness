document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el envío convencional del formulario

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/form/contact', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            alert( 'Formulario enviado con éxito');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al procesar el formulario');
        }
    });
});
