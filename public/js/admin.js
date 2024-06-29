

document.addEventListener('DOMContentLoaded', async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('antes del try')
    console.log(token)
    try {
        const response = await fetch('/api/users/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    

    if (!response.ok) {
        throw new Error('Error al obtener datos del perfil');
    }

    const data = await response.json();
  
console.log(data)
    // Mostrar la información del usuario en el HTML
const userProfileDiv = document.getElementById('usersdisplay');

    data.users.forEach(user => {
        userProfileDiv.innerHTML += `
        <div>
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Apellido:</strong> ${user.lastname}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Edad:</strong> ${user.age}</p>
            <p><strong>Plan:</strong> ${user.fk_idplan}</p>
            <button>Borrar</button>
        </div>
        `;
    });
  
} catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    // Manejo de errores, por ejemplo mostrar un mensaje en la página
    const userProfileDiv = document.getElementById('userProfile');
    userProfileDiv.innerHTML = `<p>Error al obtener el perfil del usuario.</p>`;
}
});

