'use strict'

const username = document.querySelector('#username')
const password = document.querySelector('#password')

const form = document.querySelector('#login')


const isUsernameValid = () => {

    let isValid = false

    const min = 3,
          max = 30

    const userName = username.value.trim()

    if (!isRequired(userName)) {
        dispError(username, 'Please fill in username')
    } else if (!isCorrectLength(userName.length, min, max)) {
        dispError(username, `Username has to be between ${min} and ${max} characters long.`)
    } else {
        dispSuccess(username)
        isValid = true
    }
    return isValid
}

// function getValidUsername() {
//     if(isUsernameValid()) {
//        return username
//     }
// }

function isPasswordValid() {
    let isValid = false

    const pass = password.value.trim()

    if (!isRequired(pass)) {
        dispError(password, 'Please enter password.')
    } else if (!isPasswordSecure(pass)) {
        dispError(password, 'Password must be at least 8 characters long with at least 1 lowercase character, 1 uppercase characters, and 1 number')
    } else {
        dispSuccess(password)
        isValid = true
    }

    return isValid
}

// function getValidPassword() {
//     if(isPasswordValid()) {
//         return password
//     }
// }

function isPasswordSecure(passWord) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
    return re.test(passWord)
}

function isRequired(value) {
    return value === '' ? false : true
}

function isCorrectLength(length, min, max) {
    return length < min || length > max ? false : true
}

function dispError(input, message) {
    // get form-field element
    const formField = input.parentElement
    // add the error classes
    formField.classList.remove('success')
    formField.classList.add('error')

    // show the error message
    const error = formField.querySelector('small')
    error.textContent = message
}

function dispSuccess(input) {
    const formField = input.parentElement

    formField.classList.remove('error')
    formField.classList.add('success')

    const error = formField.querySelector('small')
    error.textContent = ''
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let validUsername = isUsernameValid(),
        validPassword = isPasswordValid()
        
    let isLoginValid = validPassword && validUsername

    
    // if the form is valid then redirect to options page
    if (isLoginValid) {
        document.getElementById("linkButton2").onclick= function() {
            location.href="./options"
        }   
    }
})


function debounce(fn, delay = 500) {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

form.addEventListener('input', debounce(function (e) {
    // for immediate feedback
    switch (e.target.id) {
        case 'username':
            isUsernameValid()
            break
        case 'password':
            checkPassword()
            break
    }
}))

//module.export={getValidPassword:getValidPassword, getValidUsername:getValidUsername}