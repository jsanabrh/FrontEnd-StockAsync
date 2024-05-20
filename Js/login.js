const buttonLogin = document.querySelector('#buttonLogin');
const userIdentification = document.querySelector('#userIdentification');
const password = document.querySelector('#password');

const Login = async (e) => {
    e.preventDefault();

    const formData = {
        userIdentification: userIdentification.value,
        password:  password.value,
    }

    try {
      const response = await fetch('http://localhost:4000/v1/api/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const token = await response.json()
      if (response.ok) {
        window.location.href = '../Html/home.html'
        console.log(token);
        localStorage.setItem('response', JSON.stringify(token));
        
      } else {
        alert('User')
        console.error('Error al iniciar sesion');
      }
    } catch (error) {
      console.error('Error al iniciar sesion', error);
    }
  };

buttonLogin.addEventListener('click',Login)