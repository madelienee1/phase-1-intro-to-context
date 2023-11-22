const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
};

const createEmployeeRecords = (employeeDetails) =>
    employeeDetails.map(createEmployeeRecord);

const createTimeInEvent = (employeeRecord = {}, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: Number(hour),
        date,
    });

    return employeeRecord;
};

const createTimeOutEvent = (employeeRecord = {}, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(hour),
        date,
    });

    return employeeRecord;
};

const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvent = employeeRecord.timeInEvents.find(
        (event) => event.date === date
    );

    const timeOutEvent = employeeRecord.timeOutEvents.find(
        (event) => event.date === date
    );

    if (!timeInEvent) {
        console.error(`No time-in event found for date: ${date}`);
        return;
    }

    if (!timeOutEvent) {
        console.error(`No time-out event found for date: ${date}`);
        return;
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;
};

const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wage = employeeRecord.payPerHour;

    return hoursWorked * wage;
};

const allWagesFor = (employeeRecord) => {
    return employeeRecord.timeInEvents.reduce((totalWage, timeInEvent) => {
        return totalWage + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    }, 0);
};

const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((totalWages, employee) => {
        return totalWages + allWagesFor(employee);
    }, 0);
};