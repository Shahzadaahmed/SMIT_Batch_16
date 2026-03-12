// const checkBoxEl = document.getElementById("cBox");
// const passwordEl = document.getElementById("password");

// const handleCheckBox = () => {
//   if (checkBoxEl.checked) passwordEl.type = "text";
//   else passwordEl.type = "password";
// };


// const user = {
//   userName: 'ahmed',
//   title: '',
//   city: "Karachi",
//   cuntry: "PK"
// }
// const condition = Object.values(user).some((item) => {
//   return item == ""
// })
// console.log(condition);


// const arr = ['ahmed', 'ali', 'inzamam', 'muhammad', 'zulqernain'];
// const modifyNames = arr.map((item) => {
//   return item.at(0).toUpperCase() + item.slice(1).toLowerCase();
// });
// console.log(modifyNames);

const arr = ['ahmed', 'ali', 'inzamam', 'muhammad', 'zulqernain'];
let nestedArrFound = false;

for (let item of arr) {
  // console.log(item);
  if (Array.isArray(item)) {
    nestedArrFound = true;
    break
  }
};

if (nestedArrFound) console.log('Nested array found');
else console.log('Nested array not found');