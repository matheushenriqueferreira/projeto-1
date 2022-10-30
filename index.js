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
  const inputRangeContainer = document.createElement("div");
  const inputRange = document.createElement("input");
  const inputRangeValue = document.createElement("p");
  const menuIcon = document.querySelector("#menuIcon");
  const headerContainerLogin = document.querySelector("#headerContainerLogin");
  const logo = document.querySelector("#logo");

  const storage = localStorage;

  const listCharacters = [];

  //Adiciona os itens da listCharacters a ul;
  const handleAddListToPage = (limit) => {
    ul.innerHTML = '';
    for(let i = 0; i < limit; i++) {
      const li = document.createElement('li');
      li.setAttribute('class', 'listContent');
      
      const img = document.createElement('img');
      img.setAttribute('src', listCharacters[i].img);
      img.setAttribute('class', 'psychonautsImg');
      
      const p = document.createElement('p');
      p.setAttribute('class', 'psychonautsName');
      p.innerText = listCharacters[i].name;
      
      li.appendChild(img);
      li.appendChild(p);
      ul.appendChild(li);
    }
  }

  //Faz a requisição da lista de personagens e adiciona os itens a listCharacters
  const handleGetCharacters = () => {
    axios.get(`https://psychonauts-api.herokuapp.com/api/characters?limit=20`)
    .then((resp) => {
      resp.data.forEach(element => {
        listCharacters.push(element);
      });
      inputRange.setAttribute('max', `${listCharacters.length}`);
      handleAddListToPage(4);//chama a função handleAddListToPage passando 4 como parametro
    })
    .catch((error) => {
      alert(error);
    })
  }
  
  const handleLogin = () => {
    if(storage.getItem('Token')){//Verifica se o Token existe
      mainContainer.innerHTML = '';
      headerLinkLogin.innerHTML = 'Sair'
      headerContainerLogin.innerHTML = 'Sair'
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

      inputRangeContainer.setAttribute('id', 'inputRangeContainer');
      
      inputRange.setAttribute('id', 'inputRange');
      inputRange.setAttribute('type', 'range');
      inputRange.setAttribute('value', '4');
      inputRange.setAttribute('step', '1');
      inputRange.setAttribute('min', '4');

      inputRangeValue.setAttribute('id', 'inputRangeValue');
      inputRangeValue.innerHTML = '4';

      inputRangeContainer.appendChild(inputRange)
      inputRangeContainer.appendChild(inputRangeValue)

      ul.setAttribute('id', 'listContainer')
	
      searchContainer.appendChild(inputSearch);
      searchContainer.appendChild(btnSearch);
      searchContainer.appendChild(inputRangeContainer);
      psychonautsContainer.appendChild(ul);
      
      handleGetCharacters();//chama a função que faz a requisição a API 
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
    else if(String(password).length < 3) {
      alert("Senha inválida, menos de 3 caracteres");
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
        alert(`${error}\nProvavelmente o email informado não consta na base de dados.`);
      })
    }
  })

  headerLinkLogin.addEventListener('click', loginContentEvent);
  section2LinkLogin.addEventListener('click', loginContentEvent);

  btnSearch.addEventListener('click', () => {
    if(inputSearch.value !== '') {
      axios.get(`https://psychonauts-api.herokuapp.com/api/characters?name=${inputSearch.value}`)
      .then((resp) => {
        if(resp.data) {
          psychonautsContainer.innerHTML = '';
          ul.innerHTML = '';
          const li = document.createElement('li');
          li.setAttribute('class', 'listContent');
          const img = document.createElement('img');
          img.setAttribute('src', resp.data.img);
          img.setAttribute('class', 'psychonautsImg');
          const p = document.createElement('p');
          p.setAttribute('class', 'psychonautsName');
          p.innerText = resp.data.name;
          li.appendChild(img)
          li.appendChild(p)
          ul.appendChild(li);
          psychonautsContainer.appendChild(ul);
        }
        else {
          ul.innerHTML = '';
          const searchError = document.createElement('p');
          searchError.setAttribute('id', 'searchError');
          searchError.innerText = `Não foram encontrados resultados para a busca: ${inputSearch.value}`
          ul.appendChild(searchError);
        }
      })
      .catch((error) => alert(error))
    }
    else {
      alert('Preencha o campo de busca');
    }
  })

  //Altera a quantidade de itens exibidos na página
  inputRange.addEventListener('change', () => {
    inputRangeValue.innerHTML = inputRange.value;
    inputSearch.value = '';
    handleAddListToPage(inputRange.value);
  })

  
  inputSearch.addEventListener('change', () => {
    if(inputSearch.value === '') {//Ao fazer uma busca e limpar o campo de busca a lista é recarregada
      handleAddListToPage(inputRange.value);
    }
  })

  menuIcon.addEventListener('click', () => {
    const logo = document.querySelector('#logo');
    switch(menuIcon.title) {
      case 'nav-open':
        logo.style.display = 'none';
        headerContainerLogin.style.display = 'inline';
        menuIcon.src = './assets/nav-close.svg';
        menuIcon.title = 'nav-close';
      break;
      case 'nav-close':
        logo.style.display = 'inline';
        headerContainerLogin.style.display = 'none';
        menuIcon.src = './assets/nav-open.svg';
        menuIcon.title = 'nav-open';
      break;
    }
  })

  headerContainerLogin.addEventListener('click', loginContentEvent);
  logo.addEventListener('click', () => {
    document.location.reload();//Ao clicar no logo Evernote é feito reload na página
  })


  handleLogin();
}