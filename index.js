window.onload = function() {
  const mainContainer = document.querySelector(".mainContainer");
  const loginSection = document.createElement("section");
  const loginSectionContent = document.createElement('div');
  const title = document.createElement("h1");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const btnLogin = document.createElement("button");

  const loginContentEvent = () => {
    mainContainer.innerHTML = '';

    loginSection.setAttribute('id', 'loginSection');

    loginSectionContent.setAttribute('id', 'loginSectionContent');
    
    mainContainer.appendChild(loginSection);
    loginSection.appendChild(loginSectionContent);
    
    title.setAttribute('class', 'section2Title');
    title.innerText = 'Login';
    inputEmail.setAttribute('id', 'userEmail');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('placeholder', 'Insira o seu e-mail');
    inputEmail.setAttribute('class', 'inputStyle');
    inputPassword.setAttribute('id', 'userPassword');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Insira a sua senha');
    inputPassword.setAttribute('class', 'inputStyle');
    btnLogin.setAttribute('id', 'btnLogin');
    btnLogin.setAttribute('type', 'button');
    btnLogin.setAttribute('class', 'loginBtnStyle');
    btnLogin.innerText = 'Entrar'
    
    loginSectionContent.appendChild(title);
    loginSectionContent.appendChild(inputEmail);
    loginSectionContent.appendChild(inputPassword);
    loginSectionContent.appendChild(btnLogin);
  }
  
  document.querySelector('#headerLinkLogin').addEventListener('click', loginContentEvent)
  document.querySelector('#section2LinkLogin').addEventListener('click', loginContentEvent)

  btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#userEmail').value;
    const password = document.querySelector('#userPassword').value;
    
    if(email === '' || password === '') {
      alert('Preencha todos os campos');
    }
    else {
      axios.post('https://reqres.in/api/login', {
        "email": email, 
        "password": password
      })
      .then((resp) => {
        console.log(resp)
      })
      .catch((error) => {
        alert(error);
      })
    }
  })


}