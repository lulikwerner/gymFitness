// Codigo Contact
// function validateForm() {
//     let nombre = document.getElementById('nombre').value;
//     let email = document.getElementById('email').value;
//     let telefono = document.getElementById('telefono').value;
//     let consulta = document.getElementById('mensaje').value;
//     let motivo = document.getElementById('sede').value;
//     let conocimiento = document.querySelector('input[name="conocimiento"]:checked');
  
//     if (!nombre || !email || !telefono || !mensaje || !sede || !conocimiento) {
//       alert('Todos los campos son obligatorios');
//       return false;
//     }
//     return true;
// }
function validateForm() {
const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const sede = document.getElementById('sede').value;
    const conociste = document.querySelector('input[name="conociste"]:checked');

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

    if (sede === "") {
        alert("Por favor, seleccione una sede.");
        return false;
    }

    if (conociste === null) {
        alert("Por favor, seleccione cómo nos conoció.");
        return false;
    }

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
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        const targetSection = document.getElementById(link.getAttribute('href').slice(1));
        targetSection.scrollIntoView({ behavior: 'smooth' });

        navLinks.forEach(otherLink => {
            if (otherLink !== link) { // Compara el elemento a con el elemento a clickeado
                otherLink.classList.remove('active');
            }
        });

        link.classList.add('active');
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
            console.log(currentSection.id);
            if (linkActive) {
                linkActive.classList.add('active');
            }
        }
        link.classList.remove('active');
    });
});



