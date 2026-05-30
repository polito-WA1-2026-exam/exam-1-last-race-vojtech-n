'use strict';

function validateUsername(username) {
  // validate string for any special characters
  const regex = new RegExp("^[a-zA-Z0-9.]*$");

  if (!username) {
    return false;
  } else if (regex.test(username)) {
    return false
  } else {
    return true;
  }
};

function validatePassword(password) {
  // let minNumberofChars = 4;
  // let maxNumberofChars = 8;
  // Source - https://stackoverflow.com/a/12090265
  // Posted by João Silva, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-05-30, License - CC BY-SA 3.0
  let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,8}$/

  if (!regex.test(password)) {
    return false;
  } else {
    return true;
  }
};

export { validateUsername, validatePassword }; 