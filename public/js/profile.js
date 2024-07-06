const editUserFormContainer = document.querySelector(".editUserFormContainer");
const editUserForm = document.querySelector(".editUserForm");
const cancelEditButton = editUserForm.querySelector(".cancelEdit");
const addUserClassFormContainer = document.querySelector(".addUserClassFormContainer");
const addUserClassForm = document.querySelector(".addUserClassForm");
const cancelAddUserClassButton = addUserClassForm.querySelector(".cancelEdit");

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
        //Le saco el public de la ruta imagen
        const imageUrl = user.imagen.replace('public', '..').replace(`\ `,"/");
        // const imageUrl = `../assets/img/users/persona.webp`;
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
                                    <button class="addUserClass">Agregar clase</button>
                                    <table class="userClasses">
                                    </table>`;

        const showUpdateUserFormContainer = document.querySelector(".showUpdateUserFormContainer");
        showUpdateUserFormContainer.addEventListener("click", () => {
            editUserFormContainer.style.display = "flex"
            editUserForm.querySelector('input[name="idUser"]').value = user.iduser;
            editUserForm.querySelector('input[name="name"]').value = user.name;
            editUserForm.querySelector('input[name="lastname"]').value = user.lastname;
            editUserForm.querySelector('input[name="age"]').value = user.age;
            editUserForm.querySelector('input[name="especialidad"]').value = user.nombre_plan;
        });

        const addUserClass = document.querySelector(".addUserClass");
        addUserClass.addEventListener("click", () => {
            addUserClassFormContainer.style.display = "flex"
        });
        // Escuchar el evento click del botón de actualización
        editUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(editUserForm);
            const formDataJSON = Object.fromEntries(formData.entries());
        
            try {
                const putResponse = await fetch(`/api/users/${user.iduser}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataJSON)
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

cancelEditButton.addEventListener("click", (e) => {
    e.preventDefault();
    editUserFormContainer.style.display = "none"
});

cancelAddUserClassButton.addEventListener("click", (e) => {
    e.preventDefault();
    addUserClassFormContainer.style.display = "none"
});



// addUserClassForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const formData = new FormData(addUserClassForm);
//     const formDataJSON = Object.fromEntries(formData.entries());


// })
