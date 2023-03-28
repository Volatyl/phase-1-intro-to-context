worker1 = ["Gray", "Worm", "Security", 1];

let twoRows = [
  ["moe", "sizlak", "barkeep", 2],
  //["bartholomew", "simpson", "scamp", 3],
];

let dataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300],
  ["Byron", "Poodle", "Mascot", 3],
  ["Julius", "Caesar", "General", 27],
  ["Rafiki", "", "Aide", 10],
  ["Simba", "", "King", 100],
];

function createEmployeeRecord(array) {
  const obj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return obj;
}

function createEmployeeRecords(array) {
  let employeeRecords = array.map(createEmployeeRecord);
  return employeeRecords;
}

function createTimeInEvent(obj, dataStamp) {
  const date = dataStamp.split(" ")[0];
  const time = parseInt(dataStamp.split(" ")[1]);
  let timeInEntries = {
    type: "TimeIn",
    hour: time,
    date: date,
  };
  obj.timeInEvents.push(timeInEntries);
  return obj;
}

function createTimeOutEvent(obj, dataStamp) {
  const date = dataStamp.split(" ")[0];
  const time = parseInt(dataStamp.split(" ")[1]);
  let timeOutEntries = {
    type: "TimeOut",
    hour: time,
    date: date,
  };
  obj.timeOutEvents.push(timeOutEntries);
  return obj;
}

function hoursWorkedOnDate(obj, date) {
  const timeIn = obj.timeInEvents.find((data) => data.date === date);
  const timeOut = obj.timeOutEvents.find((data) => data.date === date);

  if (timeIn && timeOut) {
    const timeInHours = Math.floor(timeIn.hour / 100);
    const timeOutHours = Math.floor(timeOut.hour / 100);
    const timeInMinutes = timeIn.hour % 100;
    const timeOutMinutes = timeOut.hour % 100;

    const hoursWorked =
      timeOutHours + timeOutMinutes / 60 - (timeInHours + timeInMinutes / 60);

    return hoursWorked;
  }
  return error;
}

function wagesEarnedOnDate(obj, date) {
  const hours = hoursWorkedOnDate(obj, date);
  const payPerHour = obj.payPerHour;
  const pay = hours * payPerHour;
  return pay;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map((event) => event.date);
  const totalPay = dates.reduce(
    (total, date) => total + wagesEarnedOnDate(employee, date),
    0
  );
  return totalPay;
}
function calculatePayroll(employees) {
  const payRoll = employees.reduce(
    (totalPay, employee) => totalPay + allWagesFor(employee),
    0
  );

  return payRoll;
}
