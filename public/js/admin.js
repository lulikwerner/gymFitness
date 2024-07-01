document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

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

        data.users.forEach(user => {
            // const userDiv = document.createElement('div');
            // userDiv.classList.add('card');
            userProfileDiv.innerHTML += `
                <tr class="card">
                    <td>${user.iduser}</td>
                    <td>${user.name}</td>
                    <td>${user.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.age}</td>
                    <td>${user.fk_idplan}</td>
                    <td><button class="btn-delete" data-user-id="${user.iduser}">Borrar</button></td>
                </tr>
            `;
            // userProfileDiv.append(userDiv);

            // Agregar evento de click al botón "Borrar"
            const userDiv = document.querySelector(".card");
            const btnDelete = userDiv.querySelector('.btn-delete');
            btnDelete.addEventListener('click', async () => {
                const userId = btnDelete.getAttribute('data-user-id');
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
                    // Eliminar el div del usuario borrado
                    userDiv.remove(); 
                    alert('Usuario borrado exitosamente');
                    location.reload();
                } catch (error) {
                    console.error('Error al borrar usuario:', error);
                    alert('Error al intentar borrar el usuario');
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
// const token = 'tu_token'; // Asegúrate de tener el token válido aquí

let usersContainer = document.querySelector(".usersContainer");
let oldTable = usersContainer.innerHTML;
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = searchResults.value;
    console.log(searchInput);
    
    if(searchInput !== "" && searchInput !== " ") {
        try {
            const response = await fetch(`/api/users/${searchInput}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            
            const data = await response.json();
            console.log(data);
            
            usersContainer.innerHTML = `<table id="userdisplay">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Email</th>
                                                <th>Edad</th>
                                                <th>Plan</th>
                                                <th> </th>
                                            </tr>
                                            <tr class="card">
                                                <td>${data.iduser}</td>
                                                <td>${data.name}</td>
                                                <td>${data.lastname}</td>
                                                <td>${data.email}</td>
                                                <td>${data.age}</td>
                                                <td>${data.fk_idplan}</td>
                                                <td><button class="btn-delete" data-user-id="${data.iduser}">Borrar</button></td>
                                            </tr>
                                        `;
        }
        catch (error){
            console.error('Error al obtener email de usuario:', error);
        }
    } else{
        usersContainer.innerHTML = oldTable;
        alert('Debes ingresar un email válido');
    }
});