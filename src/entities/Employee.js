function Employee(id, firstName, lastName, dateOfBirth, email, startDate, endDate) {

    return {
        id: id,
        name: firstName,
        lastname: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        startDate: startDate,
        endDate: endDate,
        bdayToday: false
    }
}

module.exports = Employee