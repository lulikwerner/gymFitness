const editFormContainer = document.querySelector(".editFormContainer");
const createFormContainer = document.querySelector(".createFormContainer");
const editTrainerForm = document.querySelector(".editTrainer");
const createTrainerForm = document.querySelector(".createTrainer");
const createTrainerButton = createTrainerForm.querySelector(".createTrainerButton");
const cancelCreateButton = createTrainerForm.querySelector(".cancelCreate");
const cancelEditButton = editTrainerForm.querySelector(".cancelEdit");
const addTrainerButton = document.querySelector(".addTrainerButton");
const createPlanFormContainer = document.querySelector(".createPlanFormContainer");
const createPlanForm = createPlanFormContainer.querySelector(".createPlan");
const createPlanButton = createPlanFormContainer.querySelector(".createPlanButton");
const cancelCreatePlanButton = createPlanFormContainer.querySelector(".cancelEdit");
const editPlanFormContainer = document.querySelector(".editPlanFormContainer");
const editPlanForm = editPlanFormContainer.querySelector(".editPlan");
const editPlanButton = editPlanFormContainer.querySelector(".editPlanButton");
const cancelEditPlanButton = editPlanFormContainer.querySelector(".cancelEdit");
const addPlanButton = document.querySelector(".addPlanButton");

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
                                        <th>Acción</th>
                                    </tr`; // Limpiar contenido anterior

        data.users.forEach(user => {
            const userRow = document.createElement('tr');
            userRow.classList.add('card');
            userRow.innerHTML = `
                <td>${user.iduser}</td>
                <td>${user.name}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.nombre_plan}</td>
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

    ////////////////////////////////////////////////////
    try {
        const response = await fetch('/api/trainers/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos del perfil');
        }

        const data = await response.json();
        const trainersDiv = document.querySelector('.trainerDisplay');
        trainersDiv.innerHTML =     `<tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Especialidad</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Acción</th>
                                    </tr`; // Limpiar contenido anterior

        data.trainers.forEach(trainer => {
            const trainerRow = document.createElement('tr');
            trainerRow.classList.add('card');
            trainerRow.innerHTML = `
                <td>${trainer.idpersonal}</td>
                <td>${trainer.nombre}</td>
                <td>${trainer.apellido}</td>
                <td>${trainer.especialidad}</td>
                <td>${trainer.descripcion}</td>
                <td>${trainer.precio}</td>
                <td>
                    <button class="btn-edit" data-trainer-id="${trainer.idpersonal}">Editar</button>
                    <button class="btn-delete" data-trainer-id="${trainer.idpersonal}">Borrar</button>
                </td>
            `;
            trainersDiv.append(trainerRow);

            // Agregar evento de click al botón "Borrar"
            const btnDeleteTrainer = trainerRow.querySelector('.btn-delete');
            btnDeleteTrainer.addEventListener('click', async () => {
                const trainerId = btnDeleteTrainer.getAttribute('data-trainer-id');
                if (window.confirm('¿Estás seguro de que quieres borrar este entrenador?')) {
                    try {
                        const deleteResponse = await fetch(`/api/trainers/${trainerId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Error al intentar borrar el entrenador');
                        }
                        // Eliminar la fila del usuario borrado
                        trainerRow.remove(); 
                        alert('Entrenador borrado exitosamente');
                        location.reload();
                    } catch (error) {
                        console.error('Error al borrar entrenador:', error);
                        alert('Error al intentar borrar el entrenador');
                    }
                }
            });

            const btnEditTrainer = trainerRow.querySelector('.btn-edit');
            btnEditTrainer.addEventListener('click', () => {
                editFormContainer.style.display = "flex";
                editFormContainer.querySelector('input[name="idTrainer"]').value = trainer.idpersonal;
                editFormContainer.querySelector('input[name="nombre"]').value = trainer.nombre;
                editFormContainer.querySelector('input[name="apellido"]').value = trainer.apellido;
                editFormContainer.querySelector('select[name="especialidad"]').value = trainer.especialidad;
                editFormContainer.querySelector('textarea[name="descripcion"]').value = trainer.descripcion;
                editFormContainer.querySelector('input[name="precio"]').value = trainer.precio;
            });
        });

    } catch (error) {
        console.error('Error al obtener el plan:', error);
        // Manejo de errores, por ejemplo mostrar un mensaje en la página
        const planDisplay = document.querySelector(".planDisplay");
        planDisplay.innerHTML = `<p>Error al obtener el plan.</p>`;
    }

    try {
        const response = await fetch('/api/plans/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener datos de los planes');
        }

        const data = await response.json();
        const planDisplay = document.querySelector('.planDisplay');
        planDisplay.innerHTML =     `<tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Duracion</th>
                                        <th>Acción</th>
                                    </tr`; // Limpiar contenido anterior

        data.plans.forEach(plan => {
            const planRow = document.createElement('tr');
            planRow.classList.add('card');
            planRow.innerHTML = `
                <td>${plan.idplan}</td>
                <td>${plan.nombre}</td>
                <td>${plan.precio}</td>
                <td>${plan.duracion}</td>
                <td>
                    <button class="btn-edit" data-plan-id="${plan.idplan}">Editar</button>
                    <button class="btn-delete" data-plan-id="${plan.idplan}">Borrar</button>
                </td>
            `;
            planDisplay.append(planRow);

            // Agregar evento de click al botón "Borrar"
            const btnDeletePlan = planRow.querySelector('.btn-delete');
            btnDeletePlan.addEventListener('click', async () => {
                const planId = btnDeletePlan.getAttribute('data-plan-id');
                if (window.confirm('¿Estás seguro de que quieres borrar este plan?')) {
                    try {
                        const deleteResponse = await fetch(`/api/plans/${planId}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Error al intentar borrar el plan');
                        }
                        // Eliminar la fila del usuario borrado
                        planRow.remove(); 
                        alert('Plan borrado exitosamente');
                        location.reload();
                    } catch (error) {
                        console.error('Error al borrar plan:', error);
                        alert('Error al intentar borrar el plan');
                    }
                }
            });

            const btnEditPlan = planRow.querySelector('.btn-edit');
            btnEditPlan.addEventListener('click', () => {
                editPlanFormContainer.style.display = "flex";
                editPlanForm.querySelector('input[name="idPlan"]').value = plan.idplan;
                editPlanForm.querySelector('input[name="nombre"]').value = plan.nombre;
                editPlanForm.querySelector('input[name="precio"]').value = plan.precio;
                editPlanForm.querySelector('select[name="duracion"]').value = plan.duracion;
            });
        });

    } catch (error) {
        console.error('Error al obtener planes:', error);
        // Manejo de errores, por ejemplo mostrar un mensaje en la página
        const planDisplay = document.querySelector(".planDisplay");
        planDisplay.innerHTML = `<p>Error al obtener el perfil del entrenador.</p>`;
    }
});

const searchForm = document.querySelector('#searchForm');
const searchResults = document.querySelector('.input');
const usersContainer = document.querySelector('#userdisplay');

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
            usersContainer.innerHTML = `
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Edad</th>
                        <th>Plan</th>
                        <th>Acción</th>
                    </tr>
                    <tr class="card">
                        <td>${data.iduser}</td>
                        <td>${data.name}</td>
                        <td>${data.lastname}</td>
                        <td>${data.email}</td>
                        <td>${data.age}</td>
                        <td>${data.nombre_plan}
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

const buttons = document.querySelectorAll('.buttonsSections button');
const mainContainers = document.querySelectorAll('.mainContainer');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover la clase 'selected' de todos los botones
        buttons.forEach(btn => btn.classList.remove('selected'));
        // Agregar la clase 'selected' al botón clickeado
        button.classList.add('selected');
        
        // Ocultar todas las secciones mainContainer
        mainContainers.forEach(container => container.style.display = 'none');
        // Mostrar la sección correspondiente al botón clickeado
        const targetContainer = document.querySelector(`.${button.dataset.target}`);
        targetContainer.style.display = 'flex';
    });
});

createTrainerForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const formData = new FormData(createTrainerForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/trainers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJSON)
        });
        // Convertir la respuesta a JSON
        const responseData = await response.json(); 
        if (!response.ok) {
            throw new Error(responseData.error || 'Error al crear entrenador');
        }

        showAlert('Entrenador creado exitosamente');

        // Esperar 1 seg antes de redirigir
        setTimeout(() => {
            location.reload();
        }, 1000); 
    } catch (error) {
        console.error('Error:', error.message);
        showAlert('Error al agregar entrenador. Por favor completa todos los campos correctamente.');
    }

    function showAlert(message) {
        alert(message);
    }
});

cancelEditButton.addEventListener("click", (e) => {
    e.preventDefault();
    editFormContainer.style.display = "none";
});


addTrainerButton.addEventListener("click", (e) => {
    createFormContainer.style.display = "flex";
});

addPlanButton.addEventListener("click", (e) => {
    createPlanFormContainer.style.display = "flex";
});

cancelCreateButton.addEventListener("click", (e) => {
    e.preventDefault();
    createFormContainer.style.display = "none";
});

cancelCreatePlanButton.addEventListener("click", (e) => {
    e.preventDefault();
    createPlanFormContainer.style.display = "none";
    createPlanFormContainer.querySelector('input[name="nombre"]').value = "";
    createPlanFormContainer.querySelector('input[name="precio"]').value = "";
});

cancelEditPlanButton.addEventListener("click", (e) => {
    e.preventDefault();
    editPlanFormContainer.style.display = "none";
});

editTrainerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');

    const formData = new FormData(editTrainerForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    let trainerId = document.querySelector('input[name="idTrainer"]').value
    try {
        const putResponse = await fetch(`/api/trainers/${trainerId}`, {
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
            location.reload();
        }, 500); // Recarga después de 1 segundo

    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
});

createPlanForm.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const formData = new FormData(createPlanForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/plans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJSON)
        });
        // Convertir la respuesta a JSON
        const responseData = await response.json(); 
        if (!response.ok) {
            throw new Error(responseData.error || 'Error al crear plan');
        }

        showAlert('Plan creado exitosamente');

        // Esperar 1 seg antes de redirigir
        setTimeout(() => {
            location.reload();
        }, 1000); 
    } catch (error) {
        console.error('Error:', error.message);
        showAlert('Error al agregar plan. Por favor completa todos los campos correctamente.');
    }

    function showAlert(message) {
        alert(message);
    }
});

editPlanForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');

    let planId = editPlanForm.querySelector('input[name="idPlan"]').value;
    const formData = new FormData(editPlanForm);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
        const putResponse = await fetch(`/api/plans/${planId}`, {
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
            location.reload();
        }, 500); // Recarga después de 1 segundo

    } catch (error) {
        console.error('Error en la solicitud PUT:', error);
    }
});