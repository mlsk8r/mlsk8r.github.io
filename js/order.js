/*
*  Mike Lindberg
*  4/21/18
*/
"use strict";

var formValidity = true;

/* remove default value and formatting from selection list */
function removeSelectDefault() {
   var selectBox = document.getElementById("size");
   selectBox.selectedIndex = -1;
   selectBox.style.boxShadow = "none";
}

/* run initial form configuration functions */
function setUpPage() {
   removeSelectDefault();
   createEventListeners();
}

/* remove fallback placeholder text */
function zeroPlaceholder() {
   var instrBox = document.getElementById("instructions");
   instrBox.style.color = "black";
   if (instrBox.value === instrBox.placeholder) {
      instrBox.value = "";
   }
}

/* restore placeholder text if box contains no user entry */
function checkPlaceholder() {
   var instrBox = document.getElementById("instructions");
   if (instrBox.value === "") {
      instrBox.style.color = "rgb(178,184,183)";
      instrBox.value = instrBox.placeholder;
   }
}

/* validate required fields */
function validateRequired() {
   var inputElements = document.querySelectorAll("input[required]");
   var errorDiv = document.getElementById("errorMessage");
   var billetBoxes = document.getElementsByName("billet");
   var fieldsetValidity = true;
   var elementCount = inputElements.length;
   var currentElement;
   try {
      for (var i = 0; i < elementCount; i++) {
         // validate all required input elements in fieldset
         currentElement = inputElements[i];
         if (currentElement.value === "") {
            currentElement.style.border = "3px solid #8C7856";
            fieldsetValidity = false;
         } else {
            currentElement.style.background = "white";
         }
      }

      currentElement = document.querySelectorAll("select")[0];
      // validate state select element
      if (currentElement.selectedIndex === -1) {
      currentElement.style.border = "3px solid #8C7856";
      fieldsetValidity = false;
      } else {
      currentElement.style.border = "";
      }
      if (!billetBoxes[0].checked && !billetBoxes[1].checked) {
         // verify that a billet is selected
         billetBoxes[0].style.outline = "3px solid #8C7856";
         billetBoxes[1].style.outline = "3px solid #8C7856";
         fieldsetValidity = false;
      } else {
         billetBoxes[0].style.outline = "";
         billetBoxes[1].style.outline = "";
      }
      if (fieldsetValidity === false) {
         throw "Please fill out ALL highlighted fields.";
      } else {
         errorDiv.style.display = "none";
         errorDiv.innerHTML = "";
      }
   }
   catch(msg) {
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      formValidity = false;
   }
}

/* validate form */
function validateForm(evt) {
   if (evt.preventDefault) {
      evt.preventDefault(); // prevent form from submitting
   } else {
      evt.returnValue = false; // prevent form from submitting in IE8 8 
   }
      formValidity = true; // reset value for revalidation
      validateRequired();
   if (formValidity === true) {
      document.getElementById("errorMessage").innerHTML = "";
      document.getElementById("errorMessage").style.display = "none";
      document.getElementsByTagName("form")[0].submit();
   } else {
      document.getElementById("errorMessage").innerHTML = "Please fill out ALL highlighted fields.";
      document.getElementById("errorMessage").style.display = "block";
      scroll(0,0);
      }
}

/* create event listeners */
function createEventListeners() {
   var orderForm = document.getElementsByTagName("form")[0];
   if (orderForm.addEventListener) {
      orderForm.addEventListener("submit", validateForm, false);
   } else if (orderForm.attachEvent) {
      orderForm.attachEvent("onsubmit", validateForm);
   }
}

/* run setup functions when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}