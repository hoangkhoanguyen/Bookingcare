export const ValidateNormalLetter = (input) => {
    let regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return !regex.test(input.trim())
}

export const ValidateEmail = (input) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(input.trim())
}

export const ValidateMustNotEmpty = (input) => {
    if (input.trim() != '') {
        return true
    }
    return false
}