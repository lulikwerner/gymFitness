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
