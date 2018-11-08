/*    JavaScript 6th Edition
 *    Chapter 9
 *    Chapter Case Project

 *    Author: Mike Lindberg
 *    Date: 10-30-18

 *    Filename: cp-9.js
 */

"use strict";

// validate entered username
function validateUsername() {
   var unInput = document.getElementById("uname");
   var errorDiv = document.getElementById("usernameError");
   try {
      // if (unInput.value.length < 4) {
      if (/.{4,}/.test(unInput.value) === false) {
         throw 'Username must be at least 4 characters long';
      } else if (/\W/.test(unInput.value) === true) {
         throw 'Username must contain only letters and numbers';
      }

      // remove any username error styling and message
      unInput.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
   }

   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      unInput.style.background = "rgb(255,233,233)";
   }
}


// validate entered email
function validateEmail() {
   var emailInput = document.getElementById("emailbox");
   var errorDiv = document.getElementById("emailError");
   var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;

   try {
      if (emailCheck.test(emailInput.value) === false)
      {
         throw "Please provide a valid email address.";
      }

      // remove any email error styling and message
      emailInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
      // convert email address to lowercase
      emailInput.value = emailInput.value.toLowerCase();
   }
   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      emailInput.style.background = "rgb(255,233,233)";
   }
}

// validate entered phone number
function validatePhoneNumber () {
   var phoneInput = document.getElementById("phone");
   var errorDiv = document.getElementById("phoneError");
   var phoneCheck = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

   try {
      if (phoneCheck.test(phoneInput.value) === false) {
         throw "Please provide a valid phone number. Ex. 555-555-5555";
      }

      // remove any phone error styling and message
      phoneInput.style.background = "";
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
      // convert email address to lowercase
      phoneInput.value = phoneInput.value.toLowerCase();
   }

   catch(msg) {
      // display error message
      errorDiv.innerHTML = msg;
      errorDiv.style.display = "block";
      // change input style
      phoneInput.style.background = "rgb(255,233,233)";
   }
}

// validate entered password
function validatePassword() {
   var pw1Input = document.getElementById("pw1");
   var pw2Input = document.getElementById("pw2");
   var errorDiv = document.getElementById("passwordError");
   try {
//      if (pw1Input.value.length < 8) {
         if (/.{8,}/.test(pw1Input.value) === false) {
         throw 'Password must be at least 8 characters';
      } else if (pw1Input.value.localeCompare(pw2Input.value) !== 0) {
         throw 'Passwords must match';
      } else if (/[a-zA-Z]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one letter.";
      } else if (/\d/.test(pw1Input.value) === false) {
         throw "Password must contain at least one number.";
      } else if (/[!@#_]/.test(pw1Input.value) === false) {
         throw "Password must contain at least one of the following symbols: ! @ # _";
      }

      // remove any password error styling and message
      pw1Input.style.background = "";
      pw2Input.style.background = "";
      errorDiv.style.display = "none";
      errorDiv.innerHTML = "";
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      pw1Input.style.background = "rgb(255,233,233)";
      pw2Input.style.background = "rgb(255,233,233)";
   }
}

function createEventListeners() {
   var unInput = document.getElementById("uname");
   var pw2Input = document.getElementById("pw2");
   var emailInput = document.getElementById("emailbox");
   var phoneInput = document.getElementById("phone")
   if (unInput.addEventListener) {
      unInput.addEventListener("change", validateUsername, false);
      pw2Input.addEventListener("change", validatePassword, false);
      emailInput.addEventListener("change", validateEmail, false);
      phoneInput.addEventListener("change", validatePhoneNumber, false);
   } else if (unInput.attachEvent) {
      unInput.attachEvent("onchange", validateUsername);
      pw2Input.attachEvent("onchange", validatePassword);
      emailInput.attachEvent("onchange", validateEmail);
      phoneInput.attachEvent("onchange", validatePhoneNumber);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
