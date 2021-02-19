const loginForm = document.getElementById("login-form");
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let password = document.getElementById("password").value;
    
    fetch('/login', {
      method: 'POST',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.res) {
        alert("Incorrect password");
      }else{
        window.location.replace("/dashboard");
      }
    });
  });