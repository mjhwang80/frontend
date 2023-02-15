import { log, success, error } from "./logger.js";
import { serialize } from "./utils.js";

// 테스트 유틸리티
export const test = (title, callback) => {
  console.group(`TEST → ${title}`);
  try {
    log("테스트 결과:");
    callback();
  } catch (error) {
    error("테스트 실패: " + error.message);
  }
  console.groupEnd();
};

// 익스펙트 유틸리티
export const expect = (actual /* 실제 값 */) => ({
  toBe: (expected /* 기대 값 */) => {
    expected !== actual
      ? error(
          `결과 값(${serialize(actual)})과 기대 값(${expected})이 다릅니다.`
        )
      : success(
          `결과 값(${serialize(actual)})과 기대 값(${expected})이 같습니다.`
        );
  },
  notToBe: (expected) => {
    // ...
  },
  toBeGreaterThan: (expected) => {
    // ...
  },
  toBeLessThan: (expected) => {
    // ...
  },
});
