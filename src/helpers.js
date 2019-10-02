const isFunction = f => f && typeof f === "function";

const getProp = (obj, attrs) => attrs.reduce((o, p) => (o && o[p]) ? o[p] : null, obj);

// quick (temporary) solution. probably will be here forever.
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export {
    isEqual,
    isFunction,
    getProp,
}
