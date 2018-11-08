/*    JavaScript 6th Edition
 *    Chapter 8 - Case Project

 *    Author: Mike Lindberg
 *    Date: 10/24/18

 *    Filename: cp-8.js
 */

"use strict";

// global variables
var userProfile = {}; // empty object
var contactArray = []; // empty array
var contactArrayString; // variable to convert the contactArray to a string after submission

// add preffered contact types to user profile
function prefferedContact(event) {
   var callerElement = event.target || event.srcElement;
   var contactType = callerElement.value;
  // if a box has just been checked
  // add the checkbox value to contactArray array
   if (callerElement.checked) {
      contactArray.push(contactType);
      // add checkbox value to list in user profile section
      var newContactType = document.createElement("li");
      newContactType.innerHTML = contactType;
      document.getElementById("userContacts").appendChild(newContactType);
   } else {
      // if the user unchecks a box remove the item form the list and array
      var listItems = document.querySelectorAll("#userContacts li");
      for (var i = 0; i < listItems.length; i++) {
         if (listItems[i].innerHTML === contactType) {
            // remove element at index i from array
            contactArray.splice(i, 1);

            // remove the unchecked item from the listItems list
            listItems[i].parentNode.removeChild(listItems[i]);
            break;
         }
      }
   }
}

// convert form input to strings for submission to server
function convertToString () {
   // convert contactArray array to string
   contactArrayString = contactArray.toString();
}

function createEventListeners() {
   var contactTypes = document.getElementsByName("contactTypes");
   if (contactTypes[0].addEventListener) {
      for (var i = 0; i < contactTypes.length; i++) {
         contactTypes[i].addEventListener("change", prefferedContact, false);
      }
   } else if (contactTypes[0].attachEvent) {
      for (var i = 0; i < contactTypes.length; i++) {
         contactTypes[i].attachEvent("onchange", prefferedContact);
      }
   }
   var button = document.getElementById("createBtn");
   if (button.addEventListener) {
      button.addEventListener("click", convertToString, false);
   } else if (button.attachEvent) {
      button.attachEvent("onclick", convertToString);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
