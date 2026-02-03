const checkBoxEl = document.getElementById("cBox");
const passwordEl = document.getElementById("password");

const handleCheckBox = () => {
  if (checkBoxEl.checked) passwordEl.type = "text";
  else passwordEl.type = "password";
};
