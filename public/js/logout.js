document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
      logoutButton.addEventListener('click', async (e) => {
          e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
          try {
              const response = await fetch('/api/sessions/logout', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
              if (response.ok) {
                  console.log('Cierre de sesión exitoso, redireccionando...');
                  window.location.href = '/index.html';
              } else {
                  console.error('Error al cerrar sesión:', response.statusText);
              }
          } catch (error) {
              console.error('Error al cerrar sesión:', error);
          }
      });
  } else {
      console.error('Botón de cierre de sesión no encontrado');
  }
});
