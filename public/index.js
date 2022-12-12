window.onload = function() {
  const mainContainer = document.querySelector(".mainContainer");
  
  const registrationAndLoginSection = document.createElement("section");
  const registrationAndLoginSectionContent = document.createElement("div");
  const logo2= document.createElement("img");
  const registrationAndLoginDiv = document.createElement("div");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const btnRegistrationAndLogin = document.createElement("input");
  const hr = document.createElement("hr");
  const registrationAndLoginLinkContainer = document.createElement("div");
  const registrationAndLoginLinkText = document.createElement("p");
  const registrationAndLoginLink = document.createElement("a");
  
  const headerLinkLogin = document.querySelector("#headerLinkLogin");
  const section2LinkLogin = document.querySelector("#section2LinkLogin");
  const headerLinkSearch = document.querySelector("#headerLinkSearch");
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
  const errorMsg = document.createElement("p");
  errorMsg.setAttribute("id", 'errorMsg');
  const successfulMsg = document.createElement('p');
  successfulMsg.setAttribute("id", 'successfulMsg');

  const psychonautsInsertSection = document.createElement("section");
  const psychonautsInsertContent = document.createElement("div");
  const psychonautsInsertContent2 = document.createElement("div");
  const psychonautsImagePreviewContainer = document.createElement("div");
  const psychonautsImagePreview = document.createElement("img");
  const psychonautsInputName = document.createElement("input");
  const psychonautsInputImage = document.createElement("input");
  const psychonautsInputButton = document.createElement("input");
  const psychonautsInputContentMsg = document.createElement("p");

  const section2BtnRegister = document.querySelector('#section2BtnRegister');

  const storage = localStorage;

  let listCharacters = [];

  //Adiciona os itens da listCharacters a ul;
  const handleAddListToPage = (limit) => {
    ul.innerHTML = '';
    if(listCharacters.length === 0) {
      errorMsg.innerHTML = 'Nenhum personagem cadastrado.';
      ul.appendChild(errorMsg);
    }
    for(let i = 0; i < limit; i++) {
      const li = document.createElement('li');
      li.setAttribute('class', 'listContent');
      
      const img = document.createElement('img');
      img.setAttribute('src', listCharacters[i].image);
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
    listCharacters = [];
    axios.get(`http://localhost:3000/characters`)
    .then((resp) => {
      resp.data.charactersExists.forEach(element => {
        listCharacters.push(element);
      });
      inputRange.setAttribute('max', `${listCharacters.length}`);
      inputRange.setAttribute('value', `${listCharacters.length}`);
      inputRangeValue.innerHTML = `${listCharacters.length}`;
      
      handleAddListToPage(listCharacters.length);//chama a função handleAddListToPage passando 4 como parametro
    })
    .catch((error) => {
      ul.innerHTML = ''
      errorMsg.innerHTML = error;
      ul.appendChild(errorMsg);
    })
  }

  //
  // Responsável pela realização do Cadastro de usuário
  const handleRegistration = async (content) => {
    axios.post('http://localhost:3000/registration', content)
    .then((resp) => {
      errorMsg.innerHTML = '';
      successfulMsg.innerHTML = resp.data.message;
    })
    .catch((error) => {
      successfulMsg.innerHTML = '';
      const {message} = error.response.data;
      errorMsg.innerHTML = `Status: ${error.response.status}.<br>${message}`;
    })
  }

  //
  // Página que o usuário acessa depois de logado
  const createHomePage = () => {
    if(storage.getItem('Token')){//Verifica se o toke existe
      mainContainer.innerHTML = '';
      headerLinkLogin.innerHTML = 'Sair'
      headerContainerLogin.innerHTML = 'Sair'
      headerLinkSearch.remove();
      headerBtnDownload.remove();

      content.setAttribute('id', 'content');
      searchContainer.setAttribute('id', 'searchContainer');
      psychonautsContainer.setAttribute('id', 'psychonautsContainer');
      
      psychonautsInsertSection.setAttribute('id', 'psychonautsInsertSection');
      psychonautsInsertContent.setAttribute('id', 'psychonautsInsertContent');
      psychonautsInsertContent2.setAttribute('id', 'psychonautsInsertContent2');
      psychonautsImagePreviewContainer.setAttribute('id', 'psychonautsImagePreviewContainer');
      psychonautsInsertSection.appendChild(psychonautsInsertContent);
      
      mainContainer.appendChild(content);
      content.appendChild(searchContainer);
      content.appendChild(psychonautsInsertSection);
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
      inputRange.setAttribute('value', '1');
      inputRange.setAttribute('step', '1');
      inputRange.setAttribute('min', '1');

      inputRangeValue.setAttribute('id', 'inputRangeValue');
      inputRangeValue.innerHTML = '1';

      inputRangeContainer.appendChild(inputRange);
      inputRangeContainer.appendChild(inputRangeValue);

      psychonautsInsertContent.appendChild(psychonautsImagePreviewContainer);
      psychonautsInsertContent.appendChild(psychonautsInsertContent2);

      psychonautsImagePreview.setAttribute('id', 'psychonautsImagePreview');
      psychonautsInputName.setAttribute('id', 'psychonautsInputName');
      psychonautsInputName.setAttribute('type', 'text');
      psychonautsInputName.setAttribute('placeholder', 'Insira o nome do personagem');
      psychonautsInputImage.setAttribute('id', 'psychonautsInputImage')
      psychonautsInputImage.setAttribute('type', 'file')
      psychonautsInputImage.setAttribute('accept', '.jpg,.png')
      psychonautsInputButton.setAttribute('id', 'psychonautsInputButton')
      psychonautsInputButton.setAttribute('type', 'button')
      psychonautsInputButton.setAttribute('value', 'Cadastrar')
      psychonautsInputContentMsg.setAttribute('id', 'psychonautsInputContentMsg');

      psychonautsInsertContent2.appendChild(psychonautsInputName)
      psychonautsInsertContent2.appendChild(psychonautsInputImage)
      psychonautsInsertContent2.appendChild(psychonautsInputButton)
      psychonautsInsertContent2.appendChild(psychonautsInputContentMsg);

      ul.setAttribute('id', 'listContainer')

      searchContainer.appendChild(inputSearch);
      searchContainer.appendChild(btnSearch);
      searchContainer.appendChild(inputRangeContainer);
      psychonautsContainer.appendChild(ul);
      handleGetCharacters();// Função para recuperar dados dos personagens
    }
  }

  //
  // Responsável pela realização do Login do usuário
  const handleLogin = (content) => {
    axios.post('http://localhost:3000/login', content)
    .then((resp) => {
      storage.setItem('Token', resp.data.token);
      errorMsg.innerHTML = '';
      successfulMsg.innerHTML = resp.data.message;
      createHomePage();
    })
    .catch((error) => {
      successfulMsg.innerHTML = '';
      const {message} = error.response.data;
      errorMsg.innerHTML = `Status: ${error.response.status}.<br>${message}`;
    });
  }

  //Usado para criar a pagina de cadastro e de login
  const createRegistrationAndLoginPage = (page) => {
    if(headerLinkLogin.innerHTML === 'Entrar') {
      mainContainer.innerHTML = '';
      errorMsg.innerHTML = '';
      inputEmail.value = '';
      inputPassword.value = '';
      successfulMsg.innerHTML = '';
      
      registrationAndLoginSection.setAttribute('id', 'registrationAndLoginSection');
      
      registrationAndLoginSectionContent.setAttribute('id', 'registrationAndLoginSectionContent');
      
      mainContainer.appendChild(registrationAndLoginSection);
      registrationAndLoginSection.appendChild(registrationAndLoginSectionContent);
      
      logo2.setAttribute('id', 'logo2');
      logo2.setAttribute('src', './assets/logo2.svg');
      inputEmail.setAttribute('id', 'userEmail');
      inputEmail.setAttribute('class', 'inputStyle');
      inputEmail.setAttribute('type', 'email');
      inputEmail.setAttribute('placeholder', 'Insira o seu e-mail');
      inputEmail.setAttribute('autofocus', true);
      inputEmail.setAttribute('required', '');
      inputPassword.setAttribute('id', 'userPassword');
      inputPassword.setAttribute('class', 'inputStyle');
      inputPassword.setAttribute('type', 'password');
      inputPassword.setAttribute('placeholder', 'Insira a sua senha');
      inputPassword.setAttribute('required', '');
      btnRegistrationAndLogin.setAttribute('id', 'btnRegistrationAndLogin');
      btnRegistrationAndLogin.setAttribute('type', 'button');
      btnRegistrationAndLogin.setAttribute('class', 'btnRegistrationAndLoginStyle');

      registrationAndLoginDiv.setAttribute('id', 'registrationAndLoginDiv');
      registrationAndLoginDiv.appendChild(inputEmail);
      registrationAndLoginDiv.appendChild(inputPassword);
      registrationAndLoginDiv.appendChild(btnRegistrationAndLogin);

      registrationAndLoginLinkContainer.setAttribute('class', 'registrationAndLoginLinkContainer');
      registrationAndLoginLinkText.setAttribute('id', 'registrationAndLoginLinkText');
      registrationAndLoginLink.setAttribute('id', 'registrationAndLoginLink');
      registrationAndLoginLinkContainer.appendChild(registrationAndLoginLinkText);
      registrationAndLoginLinkContainer.appendChild(registrationAndLoginLink);

      //Altera o conteúdo de acordo com a página
      switch(page) {
        case 'Registration':
          btnRegistrationAndLogin.value = 'Cadastrar';
          registrationAndLoginLinkText.innerHTML = 'Já possui uma conta?';
          registrationAndLoginLink.innerHTML = 'Entrar';
        break;
        case 'Login':
          btnRegistrationAndLogin.value = 'Entrar';
          registrationAndLoginLinkText.innerHTML = 'Não possui uma conta?';
          registrationAndLoginLink.innerHTML = 'Criar conta';
        break;
      }
      
      registrationAndLoginSectionContent.appendChild(logo2);
      registrationAndLoginSectionContent.appendChild(registrationAndLoginDiv);
      registrationAndLoginSectionContent.appendChild(successfulMsg);
      registrationAndLoginSectionContent.appendChild(errorMsg);
      registrationAndLoginSectionContent.appendChild(hr);
      registrationAndLoginSectionContent.appendChild(registrationAndLoginLinkContainer);
    }
    else {//Remove o item do LocalStorage e faz o reload da página
      storage.removeItem('Token');
      document.location.reload();
    }
  }

  //Evento ao clicar no btn cadastrar ou Entrar
  btnRegistrationAndLogin.addEventListener('click', () => {
    errorMsg.innerHTML = '';
    successfulMsg.innerHTML = '';
    const email = document.querySelector('#userEmail').value;
    const password = document.querySelector('#userPassword').value;
  
    if(email === '' || password === '') {
      errorMsg.innerHTML = "Preencha todos os campos!";
    }
    else if(String(password).length < 3) {
      errorMsg.innerHTML = "Senha inválida, menos de 3 caracteres";
    }
    else {
      const btnValue = btnRegistrationAndLogin.value;
      const content = {
        userEmail: email,
        userPassword: password
      }

      btnValue === 'Cadastrar' ? handleRegistration(content) : handleLogin(content);
    }
  })

  headerLinkLogin.addEventListener('click', () => createRegistrationAndLoginPage('Login'));
  section2LinkLogin.addEventListener('click', () => createRegistrationAndLoginPage('Login'));

  btnSearch.addEventListener('click', () => {
    const searchError = document.createElement('p');
    searchError.setAttribute('id', 'searchError');
    
    if(inputSearch.value !== '') {
      axios.get(`http://localhost:3000/characters/${inputSearch.value}`, {search: inputSearch.value})
      .then((resp) => {
        console.log(resp.data.character)
        if(resp.data.character) {
          psychonautsContainer.innerHTML = '';
          ul.innerHTML = '';
          const li = document.createElement('li');
          li.setAttribute('class', 'listContent');
          const img = document.createElement('img');
          img.setAttribute('src', resp.data.character.img);
          img.setAttribute('class', 'psychonautsImg');
          const p = document.createElement('p');
          p.setAttribute('class', 'psychonautsName');
          p.innerText = resp.data.character.name;
          li.appendChild(img)
          li.appendChild(p)
          ul.appendChild(li);
          psychonautsContainer.appendChild(ul);
        }
        else {
          ul.innerHTML = '';
          searchError.innerText = `Não foram encontrados resultados para a busca: ${inputSearch.value}`;
          ul.appendChild(searchError);
        }
      })
      .catch((error) => {
        const {message} = error.response.data;
        ul.innerHTML = '';
        searchError.innerHTML = `Status: ${error.response.status}<br>${message}`;
        ul.appendChild(searchError);
      })
    }
    else {
      ul.innerHTML = '';
      searchError.innerHTML = 'Preencha o campo de busca';
      ul.appendChild(searchError);
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

  headerContainerLogin.addEventListener('click', () => createRegistrationAndLoginPage('Login'));
  
  logo.addEventListener('click', () => {
    document.location.reload();//Ao clicar no logo Evernote é feito reload na página
  })

  section2BtnRegister.addEventListener('click', () => createRegistrationAndLoginPage('Registration'));

  //
  // Lidar com o click do btnRegistrationAndLogin na página de Registro e de login
  registrationAndLoginLink.addEventListener('click', () => {
    const value = btnRegistrationAndLogin.value;
    switch(value) {
      case 'Entrar':
        createRegistrationAndLoginPage('Registration');
      break;
      case 'Cadastrar':
        createRegistrationAndLoginPage('Login');
      break;
    }
  })

  //
  // Lidar com o input de imagem para cadastro de personagens
  psychonautsInputImage.addEventListener('change', async (img) => {
    if(img.target.files[0]) {
      
      console.log(img.target.files[0])
      //psychonautsImagePreviewContainer.appendChild(psychonautsImagePreview)
    }
  })

  //
  // Lidar com a cadastro de personagens ao cliclar no botão cadastrar
  psychonautsInputButton.addEventListener('click', () => {
    psychonautsInputContentMsg.innerHTML = '';
    const psychoName = document.querySelector('#psychonautsInputName').value
    
    const content = {
      psychoName,
      psychoImage: 'teste'
    }
    
    axios.post('http://localhost:3000/auth/insert/characters', content)
    .then((resp) => {
      psychonautsInputContentMsg.innerHTML = '';
      document.location.reload();
    })
    .catch((error) => {
      const {message} = error.response.data;
      psychonautsInputContentMsg.innerHTML = `Status: ${error.response.status}<br>${message}`;
    })
  })

  //
  // Ao clicar no botão pesquisar, ir para página de busca sem cadastro
  headerLinkSearch.addEventListener('click', () => {
    mainContainer.innerHTML = '';

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
    inputRange.setAttribute('value', '1');
    inputRange.setAttribute('step', '1');
    inputRange.setAttribute('min', '1');

    inputRangeValue.setAttribute('id', 'inputRangeValue');
    inputRangeValue.innerHTML = '1';

    inputRangeContainer.appendChild(inputRange)
    inputRangeContainer.appendChild(inputRangeValue)

    ul.setAttribute('id', 'listContainer')

    searchContainer.appendChild(inputSearch);
    searchContainer.appendChild(btnSearch);
    searchContainer.appendChild(inputRangeContainer);
    psychonautsContainer.appendChild(ul);
      
    handleGetCharacters();
  })

  createHomePage();
}