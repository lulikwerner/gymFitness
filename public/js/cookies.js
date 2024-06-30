document.addEventListener('DOMContentLoaded', async () => {
    // Obtener token desde URL o cookie
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token'); // Obtener token desde parámetro URL
    const tokenFromCookie = getCookie('token'); // Obtener token desde cookie

    const token = tokenFromUrl || tokenFromCookie; // Priorizar token de URL, luego de cookie

    console.log('Token encontrado:', token);

    // Función para obtener el valor de una cookie por su nombre
    console.log(tokenFromUrl)
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const cookiePair = cookie.split('=');
            const cookieName = cookiePair[0].trim();
            if (cookieName === name) {
                return cookiePair[1];
            }
        }
        return null;
    }

    // Función para verificar el token y ocultar enlaces de registro e inicio de sesión si está presente
    function checkTokenAndHideLinks() {
        // Realiza lógica para ocultar enlaces de registro e inicio de sesión si el token está presente
        if (token) {
            const registerLink = document.querySelector('.navItem[href="./register.html"]');
            const loginLink = document.querySelector('.navItem[href="./login.html"]');
            
            if (registerLink) {
                registerLink.style.display = 'none';
            }
            
            if (loginLink) {
                loginLink.style.display = 'none';
            }
        }
    }

    // Llamar a la función para verificar el token y ocultar enlaces si es necesario
    checkTokenAndHideLinks();
});
