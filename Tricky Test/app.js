const checkBoxEl = document.getElementById("cBox");
const passwordEl = document.getElementById("password");

const handleCheckBox = () => {
  if (checkBoxEl.checked) passwordEl.type = "text";
  else passwordEl.type = "password";
};


const user = {
  userName: 'ahmed',
  title: '',
  city: "Karachi",
  cuntry: "PK"
}
const condition = Object.values(user).some((item) => {
  return item == ""
})
console.log(condition);