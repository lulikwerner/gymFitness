document.addEventListener('DOMContentLoaded', async () => {
    let token = null; // Declarar token fuera de los listeners

    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');

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
        const userProfileDiv = document.getElementById('userdisplay');
        userProfileDiv.innerHTML = `<tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Edad</th>
                                        <th>Plan</th>
                                        <th> </th>
                                    </tr`; // Limpiar contenido anterior

        data.users.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.classList.add('card');
            let td = "";
            /*switch(user.fk_idplan){
                case 1:
                    td = "<td>Básico</td>";
                    break;
                case 2:
                    td = "<td>Gold</td>";
                    break;
                case 3:
                    td = "<td>Platinum</td>";
                    break;
                default:
                    break;
            }*/
            userRow.innerHTML = `
                <td>${user.iduser}</td>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                ${td}
                <td><button class="btn-delete" data-user-id="${user.iduser}">Borrar</button></td>
            `;
            userProfileDiv.appendChild(userRow);

            // Agregar evento de click al botón "Borrar"
            const btnDelete = userRow.querySelector('.btn-delete');
            btnDelete.addEventListener('click', async () => {
                const userId = btnDelete.getAttribute('data-user-id');
                if (window.confirm('¿Estás seguro de que quieres borrar este usuario?')) {
                    try {
                        const deleteResponse = await fetch(`/api/users/${userId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Error al intentar borrar el usuario');
                        }
                        // Eliminar la fila del usuario borrado
                        userRow.remove(); 
                        alert('Usuario borrado exitosamente');
                        location.reload();
                    } catch (error) {
                        console.error('Error al borrar usuario:', error);
                        alert('Error al intentar borrar el usuario');
                    }
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        // Manejo de errores, por ejemplo mostrar un mensaje en la página
        const userProfileDiv = document.getElementById('userdisplay');
        userProfileDiv.innerHTML = `<p>Error al obtener el perfil del usuario.</p>`;
    }
});

const searchForm = document.querySelector('#searchForm');
const searchResults = document.querySelector('.input');
const usersContainer = document.querySelector('#userdisplay');
// let oldTable = usersContainer.innerHTML;

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = searchResults.value.trim();
    
    if (searchInput !== "") {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token'); // Obtener token nuevamente

            const response = await fetch(`/api/users/${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Asegurar que el token esté incluido aquí
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener email de usuario');
            }

            const data = await response.json();
            let td = "";
            switch(data.fk_idplan){
                case 1:
                    td = "<td>Básico</td>";
                    break;
                case 2:
                    td = "<td>Gold</td>";
                    break;
                case 3:
                    td = "<td>Platinum</td>";
                    break;
                default:
                    break;
            }
            usersContainer.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Plan</th>
                        <th></th>
                    </tr>
                    <tr class="card">
                        <td>${data.iduser}</td>
                        <td>${data.name}</td>
                        <td>${data.lastname}</td>
                        <td>${data.email}</td>
                        <td>${data.age}</td>
                        ${td}
                        <td><button class="btn-delete" data-user-id="${data.iduser}">Borrar</button></td>
                    </tr>
            `;

            // Agregar evento de click al botón "Borrar" para el usuario filtrado
            const btnDelete = document.querySelector('.btn-delete');
            btnDelete.addEventListener('click', async () => {
                const userId = btnDelete.getAttribute('data-user-id');
                if (window.confirm('¿Estás seguro de que quieres borrar este usuario?')) {
                    try {
                        const deleteResponse = await fetch(`/api/users/${userId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Error al intentar borrar el usuario');
                        }
                        // Eliminar la fila del usuario borrado
                        document.querySelector('.card').remove();
                        alert('Usuario borrado exitosamente');
                        location.reload();
                    } catch (error) {
                        console.error('Error al borrar usuario:', error);
                        alert('Error al intentar borrar el usuario');
                    }
                }
            });

        } catch (error) {
            console.error('Error al obtener email de usuario:', error);
            alert('Error al obtener el usuario por email');
        }
    } else {
        usersContainer.innerHTML = oldTable;
        alert('Debes ingresar un email válido');
    }
});

const botonTabla = document.querySelector('.tabla');
botonTabla.addEventListener('click', async () => {
    searchResults.value = ""
    location.reload();
});