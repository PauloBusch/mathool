function merge(source, errors) {
    if (!errors.length) return source;
    for (const error of errors)
        source.push(error);
    return source;
}

module.exports = { merge };