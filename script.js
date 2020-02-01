const formElem = document.querySelector("form");
const nomeInput = document.querySelector("input[name='nome']");
const nomeAlert = document.getElementById("nomeAlert");
const emailInput = document.querySelector("input[name='email']");
const emailAlert = document.getElementById("emailAlert");
const valorInput = document.querySelector("input[name='valor']");
const valorAlert = document.getElementById("valorAlert");
const dataInput = document.querySelector("input[name='data']");
const dataAlert = document.getElementById("dataAlert");
const cartaoInput = document.querySelector("input[name='cartao']");
const cartaoAlert = document.getElementById("cartaoAlert");
const titularInput = document.querySelector("input[name='titular']");
const titularAlert = document.getElementById("titularAlert");
const codigoInput = document.querySelector("input[name='codigo']");
const codigoAlert = document.getElementById("codigoAlert");
const textAreaElem = document.querySelector("textarea");
const urlInput = document.querySelector("input[name='url']");
const urlAlert = document.getElementById("urlAlert");
const celularInput = document.querySelector("input[name='celular']");
const celularAlert = document.getElementById("celularAlert");

// Se essas constantes de expressões regulares não estiverem aqui E
// dentro da função de validação no keyup, ocorre um bug nas mensagens em
// vermelho de validação que ainda não sei por que ocorre.
const regexValor = /^(\d+)(\,[\d]{0,2})?$/g;
const regexData = /^([0-2]?\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/g;
const regexEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;
const regexCCNumber = /^3(?:[47]\d([ -]?)\d{4}(?:\1\d{4}){2}|0[0-5]\d{11}|[68]\d{12})$|^4(?:\d\d\d)?([ -]?)\d{4}(?:\2\d{4}){2}$|^6011([ -]?)\d{4}(?:\3\d{4}){2}$|^5[1-5]\d\d([ -]?)\d{4}(?:\4\d{4}){2}$|^2014\d{11}$|^2149\d{11}$|^2131\d{11}$|^1800\d{11}$|^3\d{15}$/g;
const regexTitular = /^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]+)+$/g;
const regexCodigo = /^\d{3,4}$/g;
const regexURL = /^(http:\/\/|https:\/\/)?(w{3}\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const regexCelular = /^(\d{2}\s)?([7-9]{1}[\d]{4}([-])?[\d]{4})$/g;

// Essa função anônima abriga todas a condições de validação do formulário
// para seu envio. Se qualquer uma dessas condições for verdadeira, o envio é
// evitado quando o usuário clica no botão enviar.
// Ou seja, os dados preenchidos no formulário só serão enviados para o servidor
// se todas essas condições (que representam erros no preenchimento) retornarem false.
// Caso algum campo esteja vazio ao apertar o botão "Enviar", ele também
// coloca em tela as mensagens de "Campo obrigatório".
formElem.onsubmit = () => {
  if (
    nomeInput.value == "" ||
    nomeInput.value == null ||
    (nomeInput != "" && nomeInput.value.length < 4) ||
    emailInput.value == "" ||
    emailInput.value == null ||
    !regexEmail.test(emailInput.value) ||
    valorInput.value == "" ||
    valorInput.value == null ||
    !regexValor.test(valorInput.value) ||
    dataInput.value == "" ||
    dataInput.value == null ||
    !regexData.test(dataInput.value) ||
    cartaoInput.value == "" ||
    cartaoInput.value == null ||
    !regexCCNumber.test(cartaoInput.value) ||
    titularInput.value == "" ||
    titularInput.value == null ||
    !regexTitular.test(titularInput.value) ||
    codigoInput.value == "" ||
    codigoInput.value == null ||
    !regexCodigo.test(codigoInput.value) ||
    urlInput.value == "" ||
    urlInput.value == null ||
    !regexURL.test(urlInput.value) ||
    celularInput.value == "" ||
    celularInput.value == null ||
    !regexCelular.test(celularInput.value)
  ) {
    emptyInputValidation(nomeInput, nomeAlert);
    emptyInputValidation(emailInput, emailAlert);
    emptyInputValidation(valorInput, valorAlert);
    emptyInputValidation(dataInput, dataAlert);
    emptyInputValidation(cartaoInput, cartaoAlert);
    emptyInputValidation(titularInput, titularAlert);
    emptyInputValidation(codigoInput, codigoAlert);
    emptyInputValidation(urlInput, urlAlert);
    emptyInputValidation(celularInput, celularAlert);

    return false;
  }
};

function errorMsg(message, input, alert) {
  input.style.borderColor = "#ff3333";
  alert.style.color = "#ff3333";
  alert.innerHTML = message;
}

function cleanMsg(input, alert) {
  input.style.borderColor = "";
  alert.innerHTML = "";
}

function emptyInputValidation(inputValue, inputAlert) {
  if (inputValue.value == "" || inputValue == null) {
    errorMsg("Campo obrigatório", inputValue, inputAlert);
  }
}

// A partir daqui pra baixo, são as funções de validação em "tempo real",
// ou seja, a medida que o usuário preenche os campos, o formulário vai
// avisando antes dele clicar no botão enviar, se os dados são válidos ou não

function validationOnNome() {
  if (nomeInput.value == "" || nomeInput.value == null) {
    errorMsg("Campo obrigatório", nomeInput, nomeAlert);
  } else if (nomeInput.value != "" && nomeInput.value.length < 4) {
    errorMsg("Mínimo de 4 caracteres", nomeInput, nomeAlert);
  } else {
    cleanMsg(nomeInput, nomeAlert);
  }
}

function validationOnEmail() {
  const regexEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/g;

  if (emailInput.value == "" || emailInput.value == null) {
    errorMsg("Campo obrigatório", emailInput, emailAlert);
  } else if (!regexEmail.test(emailInput.value)) {
    return errorMsg("Email inválido", emailInput, emailAlert);
  } else {
    return cleanMsg(emailInput, emailAlert);
  }
}

function validationOnValor() {
  const regexValor = /^(\d+)(\,[\d]{0,2})?$/g;

  if (valorInput.value == "" || valorInput.value == null) {
    return errorMsg("Campo obrigatório", valorInput, valorAlert);
  } else if (!regexValor.test(valorInput.value)) {
    return errorMsg("Valor inválido", valorInput, valorAlert);
  } else {
    return cleanMsg(valorInput, valorAlert);
  }
}

function validationOnData() {
  const regexData = /^([0-2]?\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/g;

  if (dataInput.value == "" || dataInput.value == null) {
    return errorMsg("Campo obrigatório", dataInput, dataAlert);
  } else if (!regexData.test(dataInput.value)) {
    return errorMsg("Data inválida (dd/mm/aaaa)", dataInput, dataAlert);
  } else {
    return cleanMsg(dataInput, dataAlert);
  }
}

function validationOnCartao() {
  const regexCCNumber = /^3(?:[47]\d([ -]?)\d{4}(?:\1\d{4}){2}|0[0-5]\d{11}|[68]\d{12})$|^4(?:\d\d\d)?([ -]?)\d{4}(?:\2\d{4}){2}$|^6011([ -]?)\d{4}(?:\3\d{4}){2}$|^5[1-5]\d\d([ -]?)\d{4}(?:\4\d{4}){2}$|^2014\d{11}$|^2149\d{11}$|^2131\d{11}$|^1800\d{11}$|^3\d{15}$/g;

  if (cartaoInput.value == "" || cartaoInput.value == null) {
    return errorMsg("Campo obrigatório", cartaoInput, cartaoAlert);
  } else if (!regexCCNumber.test(cartaoInput.value)) {
    return errorMsg("Número de cartão inválido", cartaoInput, cartaoAlert);
  } else {
    return cleanMsg(cartaoInput, cartaoAlert);
  }
}

function validationOnTitular() {
  const regexTitular = /^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]+)+$/g;

  // Colocando tudo digitado pelo usuário em caixa alta
  titularInput.value = titularInput.value.replace(
    titularInput.value,
    titularInput.value.toUpperCase()
  );

  if (titularInput.value == "" || titularInput.value == null) {
    return errorMsg("Campo obrigatório", titularInput, titularAlert);
  } else if (!regexTitular.test(titularInput.value)) {
    return errorMsg("Nome muito curto", titularInput, titularAlert);
  } else {
    return cleanMsg(titularInput, titularAlert);
  }
}

function validationOnCodigo() {
  const regexCodigo = /^\d{3,4}$/g;

  if (codigoInput.value == "" || codigoInput.value == null) {
    return errorMsg("Campo obrigatório", codigoInput, codigoAlert);
  } else if (!regexCodigo.test(codigoInput.value)) {
    return errorMsg("3 ou 4 dígitos numéricos", codigoInput, codigoAlert);
  } else {
    return cleanMsg(codigoInput, codigoAlert);
  }
}

function validationOnURL() {
  const regexURL = /^(http:\/\/|https:\/\/)?(w{3}\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  if (urlInput.value == "" || urlInput.value == null) {
    return errorMsg("Campo obrigatório", urlInput, urlAlert);
  } else if (!regexURL.test(urlInput.value)) {
    return errorMsg(
      "Formato incorreto de email (www.site.com)",
      urlInput,
      urlAlert
    );
  } else {
    return cleanMsg(urlInput, urlAlert);
  }
}

// Essa função organiza os dados de telefone digitados pelo
// usuário adicionando espaço para separa ddd (caso ele tenha digitado)
// e também adiciona o traço separador (-) depois do quinto número
function phoneNumberOrganizer() {
  if (celularInput.value.length == 9) {
    celularInput.value = celularInput.value.replace(/ /g, "");
    celularInput.value = celularInput.value.replace(
      celularInput.value,
      celularInput.value.slice(0, 5) + "-" + celularInput.value.slice(5)
    );
  }

  if (celularInput.value.length == 12) {
    celularInput.value = celularInput.value.replace(/-/g, "");
    celularInput.value = celularInput.value.replace(/ /g, "");
    celularInput.value = celularInput.value.replace(
      celularInput.value,
      celularInput.value.slice(0, 2) +
        " " +
        celularInput.value.slice(2, 7) +
        "-" +
        celularInput.value.slice(7)
    );
  }

  // Conserta um bug que acontecia toda vez que o usuário deletava um número
  // e a validação gerava mais traço (-). Esse if só permite a entrada de um traço
  if ((celularInput.value.match(/-/g) || []).length > 1) {
    celularInput.value = celularInput.value.replace("-", "");
  }
}

function validationOnCelular() {
  const regexCelular = /^(\d{2}\s)?([7-9]{1}[\d]{4}([-])?[\d]{4})$/g;

  phoneNumberOrganizer();

  if (celularInput.value == "" || celularInput.value == null) {
    return errorMsg("Campo obrigatório", celularInput, celularAlert);
  } else if (!regexCelular.test(celularInput.value)) {
    return errorMsg(
      "Formato de número telefônico inválido",
      celularInput,
      celularAlert
    );
  } else {
    return cleanMsg(celularInput, celularAlert);
  }
}

function charCounter() {
  var numberOfChar = textAreaElem.value.length;
  showCounter = document.getElementById("obsAlert");
  if (numberOfChar == 0) {
    showCounter.innerHTML = "";
  } else if (numberOfChar <= 30) {
    showCounter.style.color = "rgb(65, 243, 30)";
    showCounter.innerHTML = `Caracteres: ${numberOfChar}`;
  } else if (numberOfChar > 30 && numberOfChar < 50) {
    showCounter.style.color = "#ead706";
    showCounter.innerHTML = `Caracteres: ${numberOfChar}`;
  } else if (numberOfChar == 50) {
    showCounter.style.color = "red";
    showCounter.innerHTML = `Caracteres: ${numberOfChar} (MÁX)`;
  }
}

nomeInput.onkeyup = () => validationOnNome();
emailInput.onkeyup = () => validationOnEmail();
valorInput.onkeyup = () => validationOnValor();
dataInput.onkeyup = () => validationOnData();
cartaoInput.onkeyup = () => validationOnCartao();
titularInput.onkeyup = () => validationOnTitular();
codigoInput.onkeyup = () => validationOnCodigo();
textAreaElem.onkeyup = () => charCounter();
urlInput.onkeyup = () => validationOnURL();
celularInput.onkeyup = () => validationOnCelular();

// TENTATIVA FRUSTRADA DE FAZER UMA FUNÇÃO ÚNICA E SÓ COLOCAR COMO PARÂMETRO
// A MENSAGEM DE ERRO ESPECÍFICA DO CAMPO E O ENDEREÇO DO ELEMENTO. USANDO
// ESSA FUNÇÃO OCORRE UM BUG DE FALSO POSITIVO NA VALIDAÇÃO TODA VEZ QUE
// SE CORRE PELOS CARACTERES COM AS TECLAS DIRECIONAIS
// function regexValidation(regex, message, inputValue, inputAlert) {
//   if (inputValue.value == "" || inputValue == null) {
//     return errorMsg("Campo obrigatório", inputValue, inputAlert);
//   } else if (!regex.test(inputValue.value)) {
//     return errorMsg(message, inputValue, inputAlert);
//   } else {
//     return cleanMsg(inputValue, inputAlert);
//   }
// }

// cartaoInput.onkeyup = () =>
// regexValidation(
//   regexCCNumber,
//   "Número de cartão inválido",
//   cartaoInput,
//   cartaoAlert
// );
