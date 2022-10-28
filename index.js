window.onload = function() {
  const section2 = document.querySelector(".section2Content");
  const emailContainer = document.createElement('div');
  const passwordContainer = document.createElement('div');
  const labelEmail = document.createElement("label");
  const inputEmail = document.createElement("input");
  const labelPassword = document.createElement("label");
  const inputPassword = document.createElement("input");
  const btnLogin = document.createElement("button");

  const loginContentEvent = () => {
    section2.innerHTML = '';

    btnLogin.setAttribute('id', 'btnLogin');
    btnLogin.setAttribute('type', 'button');
    btnLogin.innerText = 'Entrar'
    emailContainer.setAttribute('id', 'emailContainer');
    passwordContainer.setAttribute('id', 'passwordContainer');

    section2.appendChild(emailContainer);
    section2.appendChild(passwordContainer);
    section2.appendChild(btnLogin);
  
    labelEmail.innerText = 'E-mail';
    labelPassword.innerText = 'Senha';
    
    inputEmail.setAttribute('id', 'userEmail');
    inputEmail.setAttribute('type', 'email');
    inputPassword.setAttribute('id', 'userPassword');
    inputPassword.setAttribute('type', 'password');
    
    emailContainer.appendChild(labelEmail);
    emailContainer.appendChild(inputEmail);
    passwordContainer.appendChild(labelPassword);
    passwordContainer.appendChild(inputPassword);
  }
  
  document.querySelector('#headerLinkLogin').addEventListener('click', loginContentEvent)
  document.querySelector('#section2LinkLogin').addEventListener('click', loginContentEvent)
}