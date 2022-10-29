window.onload = function() {
  const mainContainer = document.querySelector(".mainContainer");
  
  const loginSection = document.createElement("section");
  const loginSectionContent = document.createElement("div");
  const title = document.createElement("h1");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const btnLogin = document.createElement("button");
  
  const headerLinkLogin = document.querySelector("#headerLinkLogin");
  const section2LinkLogin = document.querySelector("#section2LinkLogin");
  const headerLinkHelp = document.querySelector("#headerLinkHelp");
  const headerBtnDownload = document.querySelector("#headerBtnDownload");
  
  const btnSearch = document.createElement("button");
  const inputSearch = document.createElement("input");
  const content = document.createElement("section");
  const searchContainer = document.createElement("div");
  const psychonautsContainer = document.createElement("div");
  const ul = document.createElement("ul");
  
  const storage = localStorage;
  
  const handleLogin = () => {
    if(storage.getItem('Token')){//Verifica se o Token existe
      mainContainer.innerHTML = '';
      headerLinkLogin.innerHTML = 'Sair'
      headerLinkHelp.remove();
      headerBtnDownload.remove();

      content.setAttribute('id', 'content');
      searchContainer.setAttribute('id', 'searchContainer');
      psychonautsContainer.setAttribute('id', 'psychonautsContainer');
      
      mainContainer.appendChild(content);
      content.appendChild(searchContainer);
      content.appendChild(psychonautsContainer);

      inputSearch.setAttribute('id', 'inputSearch');
      inputSearch.setAttribute('type', 'text');
      inputSearch.setAttribute('placeholder', 'Insira o nome');
      
      btnSearch.setAttribute('id', 'btnSearch');
      btnSearch.setAttribute('type', 'button');
      btnSearch.innerText = 'Buscar';
      
      ul.setAttribute('id', 'listContainer')
      
      searchContainer.appendChild(inputSearch);
      searchContainer.appendChild(btnSearch);
      psychonautsContainer.appendChild(ul);
      
      axios.get('https://psychonauts-api.herokuapp.com/api/characters?limit=5')
      .then((resp) => {
        resp.data.forEach(element => {
          const li = document.createElement('li');
          li.setAttribute('class', 'listContent');
          const img = document.createElement('img');
          img.setAttribute('src', element.img);
          img.setAttribute('class', 'psychonautsImg');
          const p = document.createElement('p');
          p.setAttribute('class', 'psychonautsName');
          p.innerText = element.name;
          li.appendChild(img)
          li.appendChild(p)
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

  headerLinkLogin.addEventListener('click', loginContentEvent);
  section2LinkLogin.addEventListener('click', loginContentEvent);

  handleLogin();
}