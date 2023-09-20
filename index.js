const form = document.querySelector('form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const ZIP = document.getElementById('zip');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');

// eslint-disable-next-line consistent-return
function isEmailValid(input) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    return input;
  }
}

function displayFailure(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerHTML = message;
  formControl.className = 'form-control fail';
}

function displaySuccess(input) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  small.innerHTML = '';
  formControl.className = 'form-control success';
}

function checkInputs() {
  const emailValue = email.value;
  const countryValue = country.value;
  const zipValue = ZIP.value;
  const pass1Value = pass1.value;
  const pass2Value = pass2.value;

  const constraints = {
    pt: [
      '^[0-9]{4}-[0-9]{3}$',
      'Portuguese ZIPs must have exactly four digits, a hyphen, and three more digits: eg. 1111-232',
    ],

    es: [
      '^[0-9]{5}$',
      'Spain ZIPs must have exactly 5 digits: e.g. 11853 or 11234',
    ],
    uk: ['^[A-Z]{2}[0-9]{1,2} ?[0-9][A-Z]{2}$', ' e.g., SW1A 1AA'],
    in: [
      '^[1-9][0-9]{5}$',
      'Indian PIN codes must have exactly 6 digits, starting with a non-zero digit, e.g., 110001',
    ],
    fr: [
      '^(F-)?\\d{5}$',
      'France ZIPs must have exactly 5 digits: e.g., F-75012 or 75012',
    ],
  };
  const constraint = new RegExp(constraints[countryValue][0], '');

  if (emailValue === '' || null) {
    displayFailure(email, 'This field is required.');
  } else if (isEmailValid(emailValue)) {
    displaySuccess(email);
  } else if (!isEmailValid(emailValue)) {
    displayFailure(email, 'Please enter a valid email.');
  }

  if (zipValue === '' || null) {
    displayFailure(ZIP, 'This field is required.');
  } else if (!constraint.test(zipValue)) {
    displayFailure(ZIP, constraints[countryValue][1]);
  } else {
    displaySuccess(ZIP);
  }
  if (pass1Value === '' || null) {
    displayFailure(pass1, 'This field is required.');
  } else if (pass1Value.length < 8) {
    displayFailure(pass1, 'Your password must have at least 8 characters.');
  } else if (pass1Value !== pass2Value) {
    displayFailure(pass1, 'Passwords do not match.');
  } else {
    displaySuccess(pass1);
  }

  if (pass2Value === '' || null) {
    displayFailure(pass2, 'This field is required.');
  } else if (pass2Value.length < 8) {
    displayFailure(pass2, 'Your password must have at least 8 characters.');
  } else if (pass2Value !== pass1Value) {
    displayFailure(pass2, 'Passwords do not match.');
  } else {
    displaySuccess(pass2);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

// eslint-disable-next-line no-undef
window.onload = () => {
  country.onchange = checkInputs;
  pass1.oninput = checkInputs;
  pass2.oninput = checkInputs;
  ZIP.oninput = checkInputs;
  email.oninput = checkInputs;
};
