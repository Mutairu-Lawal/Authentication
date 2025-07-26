'use strict';

const continueBtn = document.querySelector('.js-continue-btn');
const sendBtnContainer = document.querySelector('.send-btn');
const backBtn = document.querySelector('.js-back-btn');
const formsContainer = document.querySelector('.js-forms');
const navBtns = document.querySelectorAll('.nav-btns .btn');
const progressNavigationBar = document.querySelector(
  '.js-progress-navigation-bar'
);

const form = document.querySelector('form');

const navLists = [
  {
    pageNum: 1,
    pageInfo: 'Account info',
  },
  {
    pageNum: 2,
    pageInfo: 'Personal info',
  },
];

const forms = [
  {
    id: 1,
    type: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'Enter email address',
  },
  {
    id: 2,
    type: 'password',
    label: 'Password',
    name: 'password',
    helperText: 'Must be at least 8 characters',
  },
  {
    id: 3,
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirm Password',
  },
  {
    id: 4,
    type: 'text',
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Enter first name',
  },
  {
    id: 5,
    type: 'text',
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Enter last name',
  },
  {
    id: 6,
    type: 'text',
    label: 'Phone Number',
    name: 'phoneNumber',
    placeholder: '+231',
  },
  {
    id: 7,
    type: 'text',
    label: 'Username',
    name: 'username',
    placeholder: 'Enter username',
    helperText: 'username should me unique',
  },
];

let userData = {
  email: '',
  password: '',
  firstName: '',
  confirmPassword: '',
  lastName: '',
  phoneNumber: '',
  username: '',
};

let currentPage = 1;

const renderPage = () => {
  progressNavigationBar.innerHTML = '';

  navLists.forEach((page) => {
    const { pageNum, pageInfo } = page;
    progressNavigationBar.innerHTML += `
<div class="navlist align-center nav-list ${
      pageNum === currentPage
        ? 'active'
        : pageNum < currentPage
        ? 'active completed'
        : ''
    }">
    <div class="nav-circle align-center">
        <p class="page-num">${pageNum}</p>
        <div class="checkmark"></div>
    </div>
    <p class="page-info">${pageInfo}</p>
</div>
  `;
  });

  if (currentPage === 1) {
    formsContainer.innerHTML = renderFormTags(forms.slice(0, 3));
    sendBtnContainer.querySelector('.btn')?.remove();
  } else {
    formsContainer.innerHTML = renderFormTags(forms.slice(3));
    sendBtnContainer.innerHTML = `<div class="btn btn-primary">Send</div>`;
  }

  const inputs = document.querySelectorAll('.input input');
  const formTags = document.querySelectorAll('.form-tag');
  const sendBtn = sendBtnContainer.querySelector('.btn');

  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      const { name, value } = e.currentTarget;
      userData = { ...userData, [name]: value };
    });
  });

  form.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      validateData(inputs);
    }
  });

  sendBtn?.addEventListener('click', () => {
    validateData(inputs);
    const hasError = [...formTags].some((form) =>
      form.classList.contains('error')
    );
    if (hasError) return;
    console.log(userData);
  });

  // ADD EVENTLISTENER TO THE PASSWORD EYES ICONS
  document.querySelectorAll('.eyes-icons').forEach((icon) => {
    icon.addEventListener('click', () => {
      const { id } = icon.dataset;
      document.querySelectorAll(`.js-eyes-icon-${id}`).forEach((icon) => {
        icon.classList.toggle('hidden');
      });
      const input = document.querySelector(`.js-form-tag-${id} input`);
      input.type = input.type === 'text' ? 'password' : 'text';
    });
  });

  // navigation button
  navigatePage(inputs, formTags);
};

renderPage();

function renderFormTags(forms) {
  let html = '';
  forms.forEach((form) => {
    const { label, type, helperText, placeholder, id, name } = form;
    html += `
      <div class="form-tag js-form-tag-${id}">
              <label for="${id}">${label}</label>
              <div class="input align-center">
                <input type="${type}" id="${id}" value="${
      userData[name]
    }" name="${name}" required placeholder="${placeholder ? placeholder : ''}"${
      type === 'password' ? ' autocomplete="new-password"' : ''
    }${type === 'email' ? ' autocomplete="username"' : ''} />
                ${
                  type === 'password'
                    ? `<div class="eyes-icons" data-id="${id}">
                  <img
                    src="./static/images/eye-regular.svg"
                    alt="open eye"
                    width="20"
                    class="eyes open js-eyes-icon-${id}"
                  />
                  <img
                    src="./static/images/eye-slash-regular.svg"
                    alt="close eye"
                    width="20"
                    class="eyes close hidden js-eyes-icon-${id}"
                  />
                </div>`
                    : ''
                }
              </div>
            <span class="error-message">${label} is required</span>
              ${
                helperText
                  ? `<span class="password-helper-text"
                >${helperText}</span
              >`
                  : ''
              }
            </div>
      `;
  });
  return html;
}

function navigatePage(inputs, formTags) {
  if (currentPage === 1) {
    backBtn.classList.add('hidden');
    continueBtn.classList.remove('hidden');
  } else if (currentPage === 2) {
    continueBtn.classList.add('hidden');
    backBtn.classList.remove('hidden');
  }

  // Navigation buttons
  navBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const btnName = e.currentTarget.innerHTML.trim();
      if (btnName === 'Continue') {
        validateData(inputs);
        const hasError = [...formTags].some((form) =>
          form.classList.contains('error')
        );
        if (!hasError) {
          if (currentPage !== 2) {
            currentPage++;
            renderPage();
            return;
          }
        }
      } else if (btnName === 'Back') {
        if (currentPage === 1) return;
        currentPage--;
        renderPage();
      }
    });
  });
}

function validateData(inputs) {
  inputs.forEach((input) => {
    const id = input.id;
    const inputName = input.name;
    const value = input.value;
    const formTag = document.querySelector(`.js-form-tag-${id}`);
    if (!formTag) return;
    const errorMessage = formTag.querySelector('.error-message');

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
      } else if (inputName === 'confirmPassword') {
        if (userData.password !== userData.confirmPassword) {
          formTag.classList.add('error');
          errorMessage.innerHTML = `Password doesn't match`;
        }
      }
    }
  });
}
