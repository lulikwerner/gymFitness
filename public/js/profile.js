document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

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
        const user = data.user;

        // Mostrar la información del usuario en el HTML
        const userProfileDiv = document.getElementById('userProfile');
        //Le saco el public de la ruta imagen
        const imageUrl = user.imagen.replace('public', '..').replace(`\ `,"/");
        // const imageUrl = `../assets/img/users/persona.webp`;
        userProfileDiv.innerHTML = `
            <div class="userProfileContainer">
                <div class="profileData">
                    <div class="profileImg">
                        <img src="${imageUrl}" alt="Imagen de perfil">
                    </div>
                    <div class="profileText">
                        <p><strong>Nombre:</strong> ${user.name}</p>
                        <p><strong>Apellido:</strong> ${user.lastname}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Edad:</strong> ${user.age}</p>
                        <p><strong>Plan:</strong> ${user.nombre_plan}</p>

                    </div>
                </div>
                <form id="updateForm" action="/api/users/${user.iduser}" method="POST">
                    <fieldset>
                        <legend>¿Quieres cambiar tu plan?</legend>
                        <div id="radio" class="radio-group">
                            <input type="radio" id="basic" name="plan" value="1" checked>
                            <label for="basic">Básico</label>
                            <input type="radio" id="gold" name="plan" value="2">
                            <label for="gold">Gold</label>
                            <input type="radio" id="platinum" name="plan" value="3">
                            <label for="platinum">Platinum</label>
                        </div>
                    </fieldset>
                    <div class="form-img">
                        <label for="imagen">Adjuntar fotografía:</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*">
                    </div>
                    <button id="updateButton" type="button">Actualizar datos</button> <!-- Cambiado a type="button" -->
                </form>
            </div>
        `;

        // Escuchar el evento click del botón de actualización
        const updateButton = document.getElementById('updateButton');
        updateButton.addEventListener('click', async () => {
            
                const updateForm = document.getElementById('updateForm');
                const formData = new FormData(updateForm);
            
                try {
                    const putResponse = await fetch(`/api/users/${user.iduser}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        body: formData  
                    });
            

                const result = await putResponse.json();
                if(result)
                alert('Los cambios fueron realizados')
                // Recargar la página actual después de 1 segundo (ajusta el tiempo según sea necesario)
        setTimeout(() => {
            window.location.reload();
        }, 500); // Recarga después de 1 segundo

            } catch (error) {
                console.error('Error en la solicitud PUT:', error);
            }
        });

    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        const userProfileDiv = document.getElementById('userProfile');
        userProfileDiv.innerHTML = `<p>Error al obtener el perfil del usuario.</p>`;
    }
});
