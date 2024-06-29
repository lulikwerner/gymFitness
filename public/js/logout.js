document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/sessions/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
      });
      if (response.ok) {
        console.log('oka')
        // Manejar el éxito del logout, como redirigir al usuario
        window.location.href = '/login.html';
      } else {
        // Manejar errores, si es necesario
        console.error('Error al cerrar sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  });