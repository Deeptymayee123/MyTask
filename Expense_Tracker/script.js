const result = document.querySelector("#result");
const add = document.querySelector(".add");
const productdetails = document.querySelector(".productdetails");
const totalSpent = document.querySelector("#totalSpent");
const categoryList = document.querySelector(".category");
const month = document.querySelector("#month");
const dateContainer = document.querySelector(".dateContainer");
const totalSpentPerCategory = document.querySelector("#totalSpentPerCategory");

// form page DOM element
const formPage = document.querySelector("#form");
const userDetails = document.querySelector(".userDetails");
const details = document.querySelectorAll(".details");
const itemList = document.querySelector(".itemList");
const inputName = document.querySelector("#name");
const category = document.querySelector("#category");
const itemPrice = document.querySelector("#itemPrice");
const submit = document.querySelector("#submit");
const nameError = document.querySelector("#nameError");
const priceError = document.querySelector("#price");
const catError = document.querySelector("#catError");
const errorMsg = document.querySelector(".errorMsg");
const dateError = document.querySelector("#dateError");
const inputDate = document.querySelector("#inputDate");

window.addEventListener("DOMContentLoaded", loadTask);

//function for loadTask after refresh
function loadTask() {
  obj = JSON.parse(localStorage.getItem("obj")) || [];
  expensesPerCat = JSON.parse(localStorage.getItem("expensesPerCat")) || [];

  renderExpenseList(obj);
  renderChart();
  getTotalSpent(obj);
}

//fun for save data
function saveExpenses() {
  localStorage.setItem("obj", JSON.stringify(obj));
  localStorage.setItem("expensesPerCat", JSON.stringify(expensesPerCat));
}

// add eventlitener in Add button
add.addEventListener("click", (e) => {
  e.preventDefault();
  formPage.classList.remove("hidden");
  result.classList.add("hidden");
});

let obj = [];
let expensesPerCat = [];
// add eventlistener in form to submit
submit.addEventListener("click", (e) => {
  // addExpense();
  e.preventDefault();
  const name = inputName.value.trim();
  const price = itemPrice.value.trim();
  const cat = category.value.trim();
  const date = inputDate.value;

  let id = Date.now();
  checkValidation(name, price, cat, date, id);

  obj.push({
    id: id,
    name: name,
    price: price,
    category: cat,
    date: date,
  });
  expensesPerCat.push({
    id: id,
    category: cat,
    price: price,
  });
  saveExpenses();
  renderChart();

  getTotalSpent(obj);
  renderExpenseList(obj);
  // console.log(obj);
});

// [...categoryList.options].forEach((option) => {
categoryList.addEventListener("change", (e) => {
  // console.log(e.target.value);
  if (e.target.value === "Select All") {
    // console.log(obj);
    groupByCategory(e.target.value);
    renderExpenseList(obj);
    return;
  }
  const filteredData = groupByCategory(e.target.value);

  // console.log(filteredData);

  renderExpenseList(filteredData);
});

//  addExpense(data) / deleteExpense(id)   modify the expenses array
function addExpense(name, price, cat, date, id) {
  const li = document.createElement("li");
  li.classList.add("item");

  const div = document.createElement("div");
  div.classList.add("input");

  const input = document.createElement("input");
  input.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = name;

  div.appendChild(input);
  div.appendChild(span);

  const div1 = document.createElement("div");
  div1.classList.add("productdetails");

  let InputPrice = Number(price);
  const p = document.createElement("p");
  p.classList.add("amount");
  p.textContent = "$" + InputPrice;

  const button = document.createElement("button");
  button.classList.add("delete");
  button.innerHTML = '<i class="fa-solid fa-x"></i>';
  button.addEventListener("click", () => {
    deleteExpense(id);
  });

  div1.appendChild(p);
  div1.appendChild(button);

  li.appendChild(div);
  li.appendChild(div1);
  itemList.appendChild(li);
  // console.log(li);
  // console.log(date);

  formPage.classList.add("hidden");
  result.classList.remove("hidden");

  inputName.value = "";
  itemPrice.value = "";
  category.value = "";
  inputDate.value = "";
}

function deleteExpense(id) {
  obj = obj.filter((item) => item.id !== id);

  expensesPerCat = expensesPerCat.filter((item) => item.id !== id);
  getTotalSpent(obj);
  renderExpenseList(obj);
  saveExpenses();
  renderChart();
}

// field validation fun
function checkValidation(name, price, cat, date, id) {
  let isValid = true;

  nameError.textContent = "";
  priceError.textContent = "";
  catError.textContent = "";

  if (name === "") {
    nameError.textContent = "Name is required!";
    isValid = false;
  }
  if (itemPrice.value.trim() === "") {
    priceError.textContent = "Price is required!";
    isValid = false;
  } else if (isNaN(price)) {
    priceError.textContent = "Enter valid price!";
    isValid = false;
  } else if (Number(price) < 0) {
    priceError.textContent = "Price can not be negative!";
    isValid = false;
  }
  if (cat === "") {
    catError.textContent = "Category is required!";
    isValid = false;
  }
  if (date === "") {
    dateError.textContent = "Date is required!";
    isValid = false;
  }
  if (!isValid) return;

  addExpense(name, price, cat, date, id);
  addCategory(cat);
}

//  getTotalSpent(expenses)   returns the sum of all amounts
function getTotalSpent(obj) {
  let val = 0;
  obj.forEach((item) => {
    val += Number(item.price);
  });

  totalSpent.textContent = `$${val}`;
  // console.log("value is", val);
}
//fun for adding category
function addCategory(categoryName) {
  let exists = false;
  for (const option of categoryList.options) {
    const exist = [...categoryList.options].some(
      (option) => option.value.toLowerCase() === categoryName.toLowerCase(),
    );
  }
  //add options which does not exist
  if (!exists) {
    const option = document.createElement("option");
    option.value = categoryName;
    option.classList.add("catOption");
    option.textContent = categoryName;
    categoryList.appendChild(option);
  }
}
//filter based on category
function groupByCategory(categoryName) {
  let totalVal = 0;
  if (categoryName === "Select All") {
    // totalVal = obj.reduce((total, item) => {
    // return total + Number(item.price);
    totalSpentPerCategory.textContent = "$0.00";
    // }, 0);
    // console.log("Select All");

    // totalSpentPerCategory.textContent = totalVal;
  } else {
    totalVal = obj.reduce((total, item) => {
      if (item.category === categoryName) return total + Number(item.price);
      return total;
    }, 0);
  }

  // console.log(val);
  // console.log(totalexpenseOfCategory);

  totalSpentPerCategory.textContent = `$${totalVal}`;
  return obj.filter((item) => item.category === categoryName);
}

//  filterByMonth(expenses, month)   returns a filtered array
function filterByMonth(month) {
  // obj = obj.filter((item) => {
  //   const [dd, mm, yy] = item.date.split("-");
  //   return mm === month;
  // });
  if (month === "") {
    // renderExpenseList(obj);
    // return;
  }
  let filterObj = obj.filter((item) => {
    return Number(item.date.split("-")[1]) === Number(month);
  });
  renderExpenseList(filterObj);
}

//  renderExpenseList(expenses)   builds the table DOM from data
function renderExpenseList(expenses) {
  itemList.innerHTML = "";

  expenses.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");

    const div = document.createElement("div");
    div.classList.add("input");

    const input = document.createElement("input");
    input.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = item.name;

    div.appendChild(input);
    div.appendChild(span);

    const div1 = document.createElement("div");
    div1.classList.add("productdetails");

    let InputPrice = Number(item.price);
    const p = document.createElement("p");
    p.classList.add("amount");
    p.textContent = "$" + InputPrice;

    const button = document.createElement("button");
    button.classList.add("delete");
    button.innerHTML = '<i class="fa-solid fa-x"></i>';
    button.addEventListener("click", () => {
      deleteExpense(item.id);
    });

    div1.appendChild(p);
    div1.appendChild(button);

    li.appendChild(div);
    li.appendChild(div1);
    itemList.appendChild(li);
  });

  // console.log("executed");
}

//filter data month wise
dateContainer.addEventListener("change", (e) => {
  // console.log(e.target.value);
  if (e.target.value === "") {
    // console.log(obj);
    renderExpenseList(obj);
    return;
  }
  const [y, m] = e.target.value.split("-");
  filterByMonth(m);
});
