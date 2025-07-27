'use strict';

const sendBtn = document.querySelector('.form-container button');
const email = document.querySelector('#email');
const formTag = document.querySelector('.form-tag');
const errorMessage = formTag.querySelector('.error-message');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const emailInput = email.value;
  if (!emailInput) {
    formTag.classList.add('error');
  } else {
    formTag.classList.remove('error');
    if (!emailRegex.test(emailInput)) {
      formTag.classList.add('error');
      errorMessage.innerHTML = 'Invalid email input';
    }
  }

  if (!formTag.classList.contains('error')) {
    console.log(emailInput);
  }
});
