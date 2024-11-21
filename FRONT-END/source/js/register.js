// Función para activar/desactivar el menú hamburguesa
document.querySelector('.header__menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('nav--menu-active');
});




window.addEventListener('scroll', function () {
  const footerTop = document.querySelector('.footer__top');
  const footer = document.querySelector('.footer');
  const footerTopHeight = footerTop.offsetHeight;
  const footerOffsetTop = footer.offsetTop; // Posición superior del footer
  const viewportHeight = window.innerHeight;
  const scrollPosition = window.scrollY;

  // Si el scroll aún no llega al footer
  if (scrollPosition + viewportHeight < footerOffsetTop) {
      footerTop.style.position = 'fixed';
      footerTop.style.bottom = '0';
      footerTop.style.top = 'auto';
  } 
  // Si el scroll llega al footer
  else {
      footerTop.style.position = 'absolute';
      footerTop.style.bottom = 'auto';
      footerTop.style.top = `${footerOffsetTop - footerTopHeight}px`; // Ajusta justo encima del footer
  }
});










  
  document.querySelector('.header__menu-toggle').addEventListener('click', function () {
    document.querySelector('.nav').classList.add('nav--menu-active');
});

document.querySelector('.nav__close-button').addEventListener('click', function () {
    document.querySelector('.nav').classList.remove('nav--menu-active');
});


  






//register
 // Validación de que los emails coincidan
 const emailInput = document.getElementById("email");
 const confirmEmailInput = document.getElementById("confirm-email");
 const emailError = document.getElementById("email-error");

 // Validación de que las contraseñas coincidan
 const passwordInput = document.getElementById("password");
 const confirmPasswordInput = document.getElementById("confirm-password");
 const passwordError = document.getElementById("password-error");

 const form = document.getElementById("register-form");

 // Verifica en tiempo real si los correos coinciden
 function validateEmails() {
     if (emailInput.value !== confirmEmailInput.value) {
         emailError.style.display = "block"; // Muestra el error
         return false;
     } else {
         emailError.style.display = "none"; // Oculta el error
         return true;
     }
 }

 // Verifica en tiempo real si las contraseñas coinciden
 function validatePasswords() {
     if (passwordInput.value !== confirmPasswordInput.value) {
         passwordError.style.display = "block"; // Muestra el error
         return false;
     } else {
         passwordError.style.display = "none"; // Oculta el error
         return true;
     }
 }

 // Validación al escribir en los campos de confirmar
 confirmEmailInput.addEventListener("input", validateEmails);
 confirmPasswordInput.addEventListener("input", validatePasswords);

 // Previene el envío del formulario si los correos o contraseñas no coinciden
 form.addEventListener("submit", (event) => {
     if (!validateEmails() || !validatePasswords()) {
         event.preventDefault(); // Evita el envío del formulario
         alert("Por favor, asegúrate de que los correos y las contraseñas coincidan.");
     }
 });