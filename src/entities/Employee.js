function Employee(firstName, lastName, dateOfBirth, email, startDate, endDate) {
    return {
        name: firstName,
        lastname: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        startDate: startDate,
        endDate: endDate
    }
}

module.exports = Employee