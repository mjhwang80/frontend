import { error } from "./logger.js";

// JSON 메서드 추출
const { stringify: _serialize, parse: _deserialize } = window.JSON;

// 타입 검사 유틸리티

export function typeIs(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

export function isNumber(data) {
  return typeIs(data) === "number";
}

export function isString(data) {
  return typeIs(data) === "string";
}

export function isBoolean(data) {
  return typeIs(data) === "boolean";
}

export function isFunction(data) {
  return typeIs(data) === "function";
}

export function isArray(data) {
  return typeIs(data) === "array";
}

export function isObject(data) {
  return typeIs(data) === "object";
}

/* -------------------------------------------------------------------------- */
// 배열 유틸리티

export function makeArray(likeArray) {
  return Array.from
    ? Array.from(likeArray)
    : Array.prototype.slice.call(likeArray);
}

/* -------------------------------------------------------------------------- */
// 시리얼라이즈 유틸리티

export const serialize = (data, prettiy) =>
  !prettiy ? _serialize(data) : _serialize(data, null, 2);

export const deserialize = (json) => _deserialize(json);

/* -------------------------------------------------------------------------- */
// 믹스인 유틸리티

export function mixins() {
  return makeArray(arguments).reduce((o1, o2) => {
    for (let key in o2) {
      if (o2.hasOwnProperty(key)) {
        const o1Value = o1[key];
        const o2Value = o2[key];
        if (isObject(o2Value)) {
          o1Value && _checkValueType(isObject, o1Value, key);
          o1[key] = mixins(o1Value ?? {}, o2Value);
        } else if (isArray(o2Value)) {
          o1Value && _checkValueType(isArray, o1Value, key);
          o1[key] = [...(o1Value ?? []), ...o2Value];
        } else {
          o1[key] = o2Value;
        }
      }
    }
    return o1;
  }, {});
}

const _checkValueType = (method, value, key) => {
  if (!method(value)) {
    const message = `혼합할 각 객체 ${key} 속성 유형이 다릅니다.`;
    error(message);
  }
};
