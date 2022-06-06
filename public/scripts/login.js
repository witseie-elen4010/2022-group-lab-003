function isRequired(value) {
    return value === '' ? false : true
}
function isPasswordSecure(passWord) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
    return re.test(passWord)
}
function isCorrectLength(length, min, max) {
    if((length>=min && length<=max)===true){
        return true
    } else {
        return false
    }
}

function isUsernameValid(userName) {

    let isValid = false

    const min = 3, max = 30 // the username must be between 3 to 30 characters long

    if (!isRequired(userName)) {
        isValid = false
    } else if (!isCorrectLength(userName.length, min, max)) {
        isValid = false
    } else {
        isValid = true
    }
    return isValid
}

function isPasswordValid(pass) {
    let isValid = false

    if (!isRequired(pass)) {
        isValid = false
    } else if (!isPasswordSecure(pass)) {
        isValid = false
    } else {
        isValid = true
    }

    return isValid
}

//for validation checks before sent to the database
module.exports = {requiredFunc: isRequired,
                passwordFunc: isPasswordValid,
                usernameFunc: isUsernameValid, 
                passwordSecFunc: isPasswordSecure,
                correctLengthFunc: isCorrectLength}   


