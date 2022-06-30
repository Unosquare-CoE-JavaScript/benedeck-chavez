function getNextMonthStart(dateStr) {
  var nextMonth, year;
  {
    let curMonth;
    console.log(dateStr.match(/(\d{4})-(\d{2})-(\d{2})/));
    [, year, curMonth] = dateStr.match(/(\d{4})-(\d{2})-\d{2}/) || [];
    nextMonth = (Number(curMonth) % 12) + 1;
  }
  if (nextMonth == 1) {
    year++;
  }
  return `${year}-${String(nextMonth).padStart(2, "0")}-01`;
}

console.log(getNextMonthStart("2019-12-21")); // 2020-01-01

/*
1. The outer/global scope has one identifier, the function getNextMonthStart(..).
2. The function scope for getNextMonthStart(..) has three: dateStr (parameter), nextMonth, and year.
3. The { .. } curly-brace pair defines an inner block scope that includes one variable: curMonth.
*/
