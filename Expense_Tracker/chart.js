const ctx = document.getElementById("myChart");
let myChart;

// group category totals
function getCategoryExpenses(expensesPerCat) {
  let categoryTotals = {};

  console.log(expensesPerCat);

  expensesPerCat.forEach((item) => {
    if (categoryTotals[item.category]) {
      categoryTotals[item.category] += Number(item.price);
    } else {
      categoryTotals[item.category] = Number(item.price);
    }
  });

  return categoryTotals;
}

// render chart
function renderChart() {
  const categoryData = getCategoryExpenses(expensesPerCat);

  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);

  // destroy old chart
  if (myChart) {
    myChart.destroy();
  }

  if (obj.length === 0) {
    myChart = null;
    return;
  }

  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Expenses",
          data: values,
          borderWidth: 1,
        },
      ],
    },
  });
}
