function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  let employeeRecord = []
  employees.map(employee => {
    employeeRecord.push(createEmployeeRecord(employee))
  })
  return employeeRecord
}

function createTimeInEvent(employee, dateStamp) {
  let timeIn = {
    type: "TimeIn",
    hour: parseInt(dateStamp.substring(11,15)),
    date: dateStamp.substring(0,10)
  }
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let timeOut = {
    type: "TimeOut",
    hour: parseInt(dateStamp.substring(11,15)),
    date: dateStamp.substring(0,10)
  }
  employee.timeOutEvents.push(timeOut)
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeInHour;
  let timeOutHour;
  employee.timeInEvents.map(timeIn => {
    if(timeIn.date === date) {
      timeInHour = timeIn.hour
    }
  })
  employee.timeOutEvents.map(timeOut => {
    if(timeOut.date === date) {
      timeOutHour = timeOut.hour
    }
  })
  return (timeOutHour - timeInHour) / 100
}

function wagesEarnedOnDate(employee, date) {
  return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee) {
  let wages = []
  employee.timeInEvents.map(timeIn => {
    wages.push(wagesEarnedOnDate(employee, timeIn.date))
  })
  return wages.reduce((total, wage) => total + wage, 0)
}

function calculatePayroll(employees) {
  let wages = employees.map(employee => allWagesFor(employee))
  return wages.reduce((total, wage) => total + wage, 0)
}
