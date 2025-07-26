'use strict';

const formInputs = document.querySelectorAll('.form-tag input');
const formTags = document.querySelectorAll('.form-tag');
const form = document.querySelector('form');
let user = { email: '', password: '' };

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateData();
  const hasError = [...formTags].some((form) =>
    form.classList.contains('error')
  );

  if (!hasError) {
    console.log(user);
  }
});

// ADD EVENTLISTENER TO THE PASSWORD EYES ICONS
document.querySelector('.js-eye-icons').addEventListener('click', () => {
  document.querySelectorAll('.js-eye-icons img').forEach((icon) => {
    icon.classList.toggle('hidden');
  });
  const input = document.querySelector('.js-form-tag-password input');
  input.type = input.type === 'text' ? 'password' : 'text';
});

function validateData() {
  formInputs.forEach((input) => {
    const id = input.id;
    const inputName = input.name;
    const value = input.value;
    const formTag = document.querySelector(`.js-form-tag-${id}`);
    const errorMessage = formTag.querySelector('.error-message');

    user = { ...user, [inputName]: value };

    if (!value) {
      formTag.classList.add('error');
    } else {
      formTag.classList.remove('error');
      if (inputName === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          formTag.classList.add('error');
          errorMessage.innerHTML = 'Invalid email input';
        }
      } else if (inputName === 'password') {
        const helperTextEl = formTag.querySelector('.password-helper-text');
        if (helperTextEl) {
          if (value.length < 1) {
            helperTextEl.classList.add('danger');
          } else {
            helperTextEl.classList.remove('danger');
          }
        }
      }
    }
  });
}
