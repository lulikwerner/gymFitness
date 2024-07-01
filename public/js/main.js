// Codigo Contact
function validateForm() {
    const nombre = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telephone').value.trim();
    const mensaje = document.getElementById('message').value.trim();
    const plan = document.getElementById('plan').value;
    //const conociste = document.querySelector('input[name="conociste"]:checked');
    const inputFile = document.querySelector('input[type="file"]');

    if (nombre === "") {
        alert("Por favor, ingrese su nombre y apellido.");
        return false;
    }

    if (email === "") {
        alert("Por favor, ingrese su email.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Por favor, ingrese un email válido.");
        return false;
    }

    if (telefono === "") {
        alert("Por favor, ingrese su teléfono.");
        return false;
    }

    if (mensaje === "") {
        alert("Por favor, ingrese un mensaje.");
        return false;
    }

    if (plan === "") {
        alert("Por favor, seleccione un plan.");
        return false;
    }

    /*if (conociste === null) {
        alert("Por favor, seleccione cómo nos conoció.");
        return false;
    }*/

    inputFile.addEventListener('change', function(event) {
        if (event.target.files.length === 0) {
          alert("Por favor, seleccione una imagen suya.");
          return false; // Salir de la función si no se seleccionó ningún archivo
        }
      
        const file = event.target.files[0];
      
        if (!file.type.startsWith('image/')) {
          alert('Solo se permiten imágenes.');
          inputFile.value = '';
          return false;
        }
    });

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// Codigo Nav y footer
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('check');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menu = document.querySelector('.menu');

    // Event listener para abrir el menú
    openMenu.addEventListener('click', function() {
        openMenu.style.display = 'none';
        closeMenu.style.display = 'block'; 
        menu.style.display = 'flex'; 
    });

    // Event listener para cerrar el menú
    closeMenu.addEventListener('click', function() {
        openMenu.style.display = 'block'; 
        closeMenu.style.display = 'none'; 
        menu.style.display = 'none'; 
    });
});



//comportamiento general

const sections = document.querySelectorAll('.seccion');
const navLinks = document.querySelectorAll('.navItem');
let currentSection = null; // Variable para la sección actual

function activateLink(section) {
    currentSection = section; // Actualiza la variable con la sección actual
    navLinks.forEach(link => {
        if (link !== section.querySelector('a')) { // Compara el elemento sección con el elemento a
            link.classList.remove('active');
        }
    });
  
    const matchingLink = document.querySelector(`[href="#${section.id}"]`);
    if (matchingLink) {
        matchingLink.classList.add('active');
    }
  
    // Verifica si la sección actual es la sección de inicio
    if (section.id === 'home') {
        const homeLink = document.querySelector('.navItem[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

sections.forEach(section => {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateLink(section);
        }
        });
    }, {
        root: null,
        threshold: 0.5
    }).observe(section);
});



navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Evita el comportamiento predeterminado del enlace
        event.preventDefault();

        // Obtiene el href del enlace
        const href = link.getAttribute('href');

        // Verifica si el enlace apunta a otra página
        if (href.startsWith('./') || href.startsWith('../') || href.startsWith('/')) {
            // Redirige a la nueva ubicación
            window.location.href = href;
        } else {
            // Obtiene el elemento destino por su ID (solo si es un enlace interno)
            const targetSection = document.getElementById(href.slice(1));

            if (targetSection) {
                // Realiza el desplazamiento suave al elemento encontrado
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Remueve la clase 'active' de todos los enlaces y la agrega al enlace clickeado
                navLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.classList.remove('active');
                    }
                });
                link.classList.add('active');
            } else {
                console.error('Elemento no encontrado para el ID:', href.slice(1));
            }
        }
    });



    link.addEventListener('mouseover', () => {
        navLinks.forEach(otherLink => {
            otherLink.classList.remove('active');
        });

        link.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        if (currentSection) {
            const linkActive = document.querySelector(`[href="#${currentSection.id}"]`);
            if (linkActive) {
                linkActive.classList.add('active');
            }
        }
        link.classList.remove('active');
    });
});



