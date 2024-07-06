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
        const userProfileContainer = document.querySelector('.userProfileContainer');
        const userClassContainer = document.querySelector(".userClassContainer");
        const imageUrl = user.imagen.replace('public', '..').replace(`\ `,"/");
        console.log('laimagendelusuario',imageUrl)
        userProfileContainer.innerHTML = `
            <div class="profileImg">
                <img src="${imageUrl}" alt="Imagen de perfil">
            </div>
            <div class="profileText">
                <p><span>Nombre:</span> ${user.name}</p>
                <p><span>Apellido:</span> ${user.lastname}</p>
                <p><span>Email:</span> ${user.email}</p>
                <p><span>Edad:</span> ${user.age}</p>
                <p><span>Plan:</span> ${user.nombre_plan}</p>
                <button class="showUpdateUserFormContainer" data-user="${user.iduser}">Modificar datos</button>
            </div>`;
        userClassContainer.innerHTML = `
            <h2>Clases</h2>
            <div class="form-group">
                <label for="class">Seleccionar una clase:</label>
                <select id="class" name="class" required>
                    <option value="Boxeo">Boxeo</option>
                    <option value="Boxeo_sauna">Boxeo Sauna</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Bodybuild">BodyBuilding</option>
                </select>
                <button class="addUserClass">Agregar clase</button>
            </div>`;

        const showUpdateUserFormContainer = document.querySelector(".showUpdateUserFormContainer");
        const editUserFormContainer = document.querySelector('.editUserFormContainer');
        const editUserForm = document.querySelector('.editUserForm');
        const cancelEditButton = document.querySelector('.cancelEdit');

        showUpdateUserFormContainer.addEventListener("click", () => {
            editUserFormContainer.style.display = "flex"
            editUserForm.querySelector('input[name="idUser"]').value = user.iduser;
            editUserForm.querySelector('input[name="name"]').value = user.name;
            editUserForm.querySelector('input[name="lastname"]').value = user.lastname;
            editUserForm.querySelector('input[name="age"]').value = user.age;
            editUserForm.querySelector('select[name="plan"]').value = user.fk_idplan;
        });

        const addUserClass = document.querySelector(".addUserClass");
        const addUserClassFormContainer = document.querySelector(".addUserClassFormContainer");

        addUserClass.addEventListener("click", () => {
            addUserClassFormContainer.style.display = "flex"
        });

        // Escuchar el evento submit del formulario editUserForm
        editUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(editUserForm);
            const formDataJSON = Object.fromEntries(formData.entries());
            console.log('formData', formData)
            const avatarInput = document.getElementById('avatar');
            console.log(avatarInput)
            try {
                // Realizar la solicitud PUT utilizando fetch
                const putResponse = await fetch(`/api/users/${formDataJSON.idUser}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });
        
                // Manejar la respuesta del servidor
                if (putResponse.ok) {
                    const result = await putResponse.json();
                    console.log('Resultado de la solicitud PUT:', result);
        
                    alert('Los cambios fueron realizados');
                    editUserFormContainer.style.display = 'none';
                    // Recargar la página después de 1 segundo para reflejar los cambios
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    const result = await putResponse.json();
                    if (result && result.error) {
                        alert(`Error: ${result.error}`);
                    } else {
                        alert('Error desconocido al procesar la solicitud.');
                    }
                }
            } catch (error) {
                console.error('Error en la solicitud PUT:', error);
                alert('Hubo un error en la solicitud PUT. Consulta la consola para más detalles.');
            }
        });
        
        // Event listener para el botón de cancelar en el formulario de edición
        cancelEditButton.addEventListener('click', (e) => {
            e.preventDefault();
            editUserFormContainer.style.display = 'none';
        });
    } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
        alert('Error al obtener datos del perfil. Consulta la consola para más detalles.');
    }

});
