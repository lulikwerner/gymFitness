

document.addEventListener('DOMContentLoaded', async () => {

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log('antes del try')
        console.log(token)
        try {
            const response = await fetch('/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        

        if (!response.ok) {
            throw new Error('Error al obtener datos del perfil');
        }

        const data = await response.json();
        console.log('ladata', data)
        const user = data.user; // Aquí asumo que 'data' tiene la estructura que mencionaste
console.log('eluser')
console.log(user)
        // Mostrar la información del usuario en el HTML
        const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Apellido:</strong> ${user.lastname}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Edad:</strong> ${user.age}</p>
            <!-- Agrega más campos según sea necesario -->
        `;
    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        // Manejo de errores, por ejemplo mostrar un mensaje en la página
        const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `<p>Error al obtener el perfil del usuario.</p>`;
    }
});

