const isFunction = f => f && typeof f === "function";

const getProp = (obj, attrs) => attrs.reduce((o, p) => (o && o[p]) ? o[p] : null, obj);

export {
    isFunction,
    getProp,
}
