window.onload = function() {
  const mainContainer = document.querySelector(".mainContainer");
  const loginSection = document.createElement("section");
  const loginSectionContent = document.createElement('div');
  const title = document.createElement("h1");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const btnLogin = document.createElement("button");
  const headerLinkLogin = document.querySelector("#headerLinkLogin");// Botão Entrar do Header
  const headerLinkHelp = document.querySelector('#headerLinkHelp');
  const headerBtnDownload = document.querySelector('#headerBtnDownload');
  const inputSearch = document.createElement("input");
  const btnSearch = document.createElement("button");
  const ul = document.createElement('ul')
  

  const storage = localStorage;
  const handleLogin = () => {
    if(storage.getItem('Token')){//Verifica se o Token existe
      mainContainer.innerHTML = '';
      headerLinkLogin.innerHTML = 'Sair'
      headerLinkHelp.remove();
      headerBtnDownload.remove();
      mainContainer.appendChild(inputSearch);
      btnSearch.innerText = 'Buscar';
      mainContainer.appendChild(btnSearch);
      mainContainer.appendChild(ul);
      axios.get('https://psychonauts-api.herokuapp.com/api/characters?limit=5')
      .then((resp) => {
        resp.data.forEach(element => {
          const li = document.createElement('li')
          li.innerText = element.name;
          ul.appendChild(li);
        });
      })
    }
  }

  const loginContentEvent = () => {
    if(headerLinkLogin.innerHTML === 'Entrar') {
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
    else {//Remove o item do LocalStorage e faz o reload da página
      storage.removeItem('Token');
      document.location.reload();
    }
  }
  
  headerLinkLogin.addEventListener('click', loginContentEvent)
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
        storage.setItem('Token', resp.data.token);
        handleLogin();
      })
      .catch((error) => {
        alert(error);
      })
    }
  })

  handleLogin();
}