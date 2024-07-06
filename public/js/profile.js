document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    let userId;  // Declarar la variable userId

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
        userId = user.iduser;  // Asignar el valor de userId

        const userProfileContainer = document.querySelector('.userProfileContainer');
        const userClassContainer = document.querySelector(".userClassContainer");
        const imageUrl = user.imagen.replace('public', '..').replace(/\ /g,"/");
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
                <button class="showUpdateUserFormContainer" data-type="user" data-user="${user.iduser}">Modificar datos</button>
            </div>`;

        const editUserFormContainer = document.querySelector('.editUserFormContainer');
        const editUserForm = document.getElementById('editUserForm');
        const cancelEditButton = document.querySelector('.cancelEdit');

        const showUpdateUserFormContainer = document.querySelector(".showUpdateUserFormContainer");
        showUpdateUserFormContainer.addEventListener("click", () => {
            editUserFormContainer.style.display = "flex"
            editUserForm.querySelector('input[name="idUser"]').value = user.iduser;
            editUserForm.querySelector('input[name="name"]').value = user.name;
            editUserForm.querySelector('input[name="lastname"]').value = user.lastname;
            editUserForm.querySelector('input[name="age"]').value = user.age;
            editUserForm.querySelector('select[name="plan"]').value = user.fk_idplan;
        });

        editUserForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(editUserForm);
            const userType = showUpdateUserFormContainer.dataset.type;
            const endpoint = userType === 'user' ? `/api/users/${user.iduser}` : `/api/classes/${user.iduser}`;

            try {
                const putResponse = await fetch(endpoint, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (putResponse.ok) {
                    const result = await putResponse.json();
                    console.log('Resultado de la solicitud PUT:', result);

                    alert('Los cambios fueron realizados');
                    editUserFormContainer.style.display = 'none';
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

        cancelEditButton.addEventListener('click', (e) => {
            e.preventDefault();
            editUserFormContainer.style.display = 'none';
        });

        const addUserClassButton = document.querySelector(".addUserClass");
        const addUserClassFormContainer = document.querySelector(".addUserClassFormContainer");

        addUserClassButton.addEventListener("click", async () => {
            const classSelect = document.getElementById('class');
            const selectedOption = classSelect.options[classSelect.selectedIndex];
            const classId = selectedOption.value;

            try {
                const responseClass = await fetch(`/api/classes/${userId}/class/${classId}`, {  // Usar userId en la URL
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (responseClass.ok) {
                    const resultClass = await responseClass.json();
                    alert(`La clase fue agregada`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
        
                } else {
                    const resultClass = await responseClass.json();
                    if (resultClass && resultClass.error) {
                        alert(`Error al agregar clase: ${resultClass.error}`);
                    } else {
                        alert('Error desconocido al procesar la solicitud.');
                    }
                }
            } catch (error) {
                console.error('Error al agregar clase:', error);
                alert('Ya estas inscripto en esa clase');
            }
        });

        try {
            const response = await fetch(`/api/classes/${user.iduser}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener datos del perfil');
            }

            const userClassTable = document.querySelector(".userClass");
            const data = await response.json();
            console.log(data);
            data.result.forEach(results => {
                const classRow = document.createElement('tr');
                classRow.classList.add('card');
                classRow.innerHTML = `
                    <td>${results.name}</td>
                    <td>${results.nombre} ${results.apellido}</td>
                    <td>${results.dia_semana}</td>
                    <td>${results.horaclase}</td>
                    <td>
                        <button class="btn-delete" data-plan-id=" ">Desuscribirse</button>
                    </td>
                `;
                userClassTable.append(classRow);
            });
        }
        catch (error) {
            console.error('Error al obtener datos del perfil:', error);
            alert('Error al obtener datos del perfil. Consulta la consola para más detalles.');
        }

    } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
        alert('Error al obtener datos del perfil. Consulta la consola para más detalles.');
    }
});
