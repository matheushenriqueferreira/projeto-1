window.onload = function() {
  const mainContainer = document.querySelector(".mainContainer");
  const loginSection = document.createElement("section");
  const emailContainer = document.createElement('div');
  const passwordContainer = document.createElement('div');
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const btnLogin = document.createElement("button");

  const loginContentEvent = () => {
    mainContainer.innerHTML = '';

    loginSection.setAttribute('id', 'loginSection');

    btnLogin.setAttribute('id', 'btnLogin');
    btnLogin.setAttribute('type', 'button');
    btnLogin.innerText = 'Entrar'
    emailContainer.setAttribute('id', 'emailContainer');
    passwordContainer.setAttribute('id', 'passwordContainer');

    mainContainer.appendChild(loginSection);
    loginSection.appendChild(emailContainer);
    loginSection.appendChild(passwordContainer);
    loginSection.appendChild(btnLogin);
    
    inputEmail.setAttribute('id', 'userEmail');
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('placeholder', 'Insira o seu e-mail');
    inputPassword.setAttribute('id', 'userPassword');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Insira a sua senha');
    
    emailContainer.appendChild(inputEmail);
    passwordContainer.appendChild(inputPassword);
  }
  
  document.querySelector('#headerLinkLogin').addEventListener('click', loginContentEvent)
  document.querySelector('#section2LinkLogin').addEventListener('click', loginContentEvent)
}