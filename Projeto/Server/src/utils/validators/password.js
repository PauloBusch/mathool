function validate(password) {
    const errors = [];
    if (!password) return errors;

    if (!/[0-9]/.test(password)) errors.push('Password must contain numeric characters');
    if (!/[!@#\$%\^&]/.test(password)) errors.push('password must contain special characters');
    if (!/[A-Z]/.test(password)) errors.push('password must contain uppercase characters');
    if (!/[a-z]/.test(password)) errors.push('password must contain lowercase characters');
    if (password.length < 8) errors.push('password must contain at least 8 characters');
    return errors; 
}

module.exports = { validate };