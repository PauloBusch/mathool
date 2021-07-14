function bindAll(context, scope) {
    const methods = Object.getOwnPropertyNames(context.prototype);
    for (const method of methods)
        scope[method] = scope[method]['bind'](scope);

    return scope;
}

module.exports = { bindAll };