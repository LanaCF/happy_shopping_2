import { loginData } from "../data/loginData.js";

export const renderLoginBtn = () => {
    const loginBtnEl = document.querySelector('.login');
    loginBtnEl.onclick = loginBtnElHandler;
}

function loginBtnElHandler(e) {
    e.preventDefault();

    const url = this.href;
    const userLogin = window.prompt('Будь ласка, введіть ваш логін.');
    const loginIsCorrect = userLogin === loginData.login;

    if (loginIsCorrect) {
        window.location.href = url;
    }
    
  console.log(loginIsCorrect);
}