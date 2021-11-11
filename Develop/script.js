// Initialize global variables
var hasLowers = false;
var hasUppers = false;
var hasNumbers = false;
var hasSymbols = false;
var passwordLength = null;
var passwordArray = [];

// Get password LENGTH from user
var getPasswordLength = function (){
  passwordLength = +prompt("PASSWORD LENGTH: How long do you want the password to be (min: 8, max: 128).");
  console.log(passwordLength, typeof passwordLength);
  // Ensure it's a VALID entry
  if(isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128){
    alert('Not a valid entry. Please enter a number between 8 and 128 inclusive.');
    getPasswordLength();
  }
};

// Get VALID TYPES of characters for password from user
var getPasswordTypes = function() {
  var validTypes = 0;
  hasLowers = window.confirm("Include LOWER CASE letters in your password? Select OK to include or Cancel exclude.");
  hasUppers = window.confirm("Include UPPER CASE letters in your password? Select OK to include or Cancel exclude.");
  hasNumbers = window.confirm("Include NUMBERS in your password? Select OK to include or Cancel exclude.");
  hasSymbols = window.confirm("Include SYMBOLS in your password? Select OK to include or Cancel exclude.");
  // Ensure at least ONE TYPE included
  if(validTypes === hasLowers + hasUppers + hasNumbers + hasSymbols){
      alert('You must include at lease ONE TYPE of character(s). Please try again.');
      getPasswordTypes();
  }else{
    getPasswordLength();
  }
}

// Construct an ARRAY of VALID characters based on the TYPES of characters the user selected
var getValidCharacters = function() {
  // Ensure passwordArray is empty to start
  passwordArray = [];

  // Using ASCII table to load VALID TYPES into array (https://asecuritysite.com/coding/asc2)

  // Load LOWER CASE letters, if applicable
  if(hasLowers){
    for(i = 97; i <= 122; i++){
      var nextLower = String.fromCharCode(i);
      passwordArray.push(nextLower);
    }
  }
  // Load UPPER CASE letters, if applicable
  if(hasUppers){
    for(i = 65; i <= 90; i++){ 
      var nextUpper = String.fromCharCode(i);
      passwordArray.push(nextUpper);
    }
  }
  // Load NUMBERS, if applicable
  if(hasNumbers){
    for(i = 48; i <= 57; i++){
      var nextNumber = String.fromCharCode(i);
      passwordArray.push(nextNumber);
    }
  }
  // Load SYMBOLS, if applicable
  if(hasSymbols){
    // Symbol range 1
    for(i = 32; i <= 47; i++){
      var nextSymbol = String.fromCharCode(i);
      passwordArray.push(nextSymbol);
    }
    // Symbol range 2
    for(i = 58; i <= 64; i++){
      var nextSymbol = String.fromCharCode(i);
      passwordArray.push(nextSymbol);
    }
    // Symbol range 3
    for(i = 91; i <= 96; i++){
      var nextSymbol = String.fromCharCode(i);
      passwordArray.push(nextSymbol);
    }
    // Symbol range 4
    for(i = 123; i <= 126; i++){
      var nextSymbol = String.fromCharCode(i);
      passwordArray.push(nextSymbol);
    }
  }
};

var constructPassword = function() {
  var passwordValues = []; // Ensure array is empty to start
  for(i = 0; i < passwordLength; i++) {
    console.log('pw length: ', passwordLength);
    var randomValidChar = passwordArray[Math.floor(Math.random() * passwordArray.length)]; // Selecting a random character from VALID character set
    passwordValues.push(randomValidChar); // Adding random value to password array
  } 
  return passwordValues.toString();
}

// Generate the Password!
var generatePassword = function() {
  getPasswordTypes(); // Asks the user what TYPES of characters to include in their desired password
  getValidCharacters(); // Constructs an ARRAY of only VALID characters
  var generatedPassword = constructPassword(); // Construct a PASSWORD from the set of VALID characters
  return generatedPassword;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);