import { isString, isFunction } from "./Indi/utils.js";

/* -------------------------------------------------------------------------- */
// 유틸리티 함수

export function getById(idName) {
  return document.getElementById(idName);
}

export function getNode(selector, context = document) {
  return context.querySelector(selector);
}

export function getNodeList(selector, context = document) {
  return context.querySelectorAll(selector);
}

/* -------------------------------------------------------------------------- */

// vNode 생성 유틸리티
export function createElement(type, props, ...children) {
  props = { ...props, children };

  // type이 함수 컴포넌트인 경우
  if (isFunction(type)) {
    // 함수 호출 (props 전달)
    return type.call(null, props);
  }

  return { type, props };
}

// [비공개] 속성 바인딩 유틸리티
const _bindProps = (element, props) => {
  // props 복제
  props = { ...props };

  // children 속성 제거
  delete props.children;

  Object.entries(props).forEach(([prop, value]) => {
    // 클래스 속성 설정
    if (prop === "className") {
      element.classList.add(value);
    }

    // 이벤트 속성
    const isEventProp = /^on/.test(prop);
    const propIsClassName = prop !== "className";

    if (isEventProp && propIsClassName) {
      element.addEventListener(prop.replace(/on/, "").toLowerCase(), value);
    }

    // 나머지 속성
    if (!isEventProp && propIsClassName) {
      element.setAttribute(prop, value);
    }
  });
};

// [비공개] vNode 렌더링 유틸리티
const _renderElement = (vNode) => {
  // vNode가 텍스트인 경우
  if (isString(vNode)) {
    return document.createTextNode(vNode);
  }

  // vNode = {type, props}
  // 요소 생성
  const element = document.createElement(vNode.type);

  // 속성 바인딩
  _bindProps(element, vNode.props);

  // 자식(들) 순환
  vNode.props.children
    // 재귀 호출
    .map(_renderElement)
    // 자식 노드 마운트
    .forEach((childNode) => element.appendChild(childNode));

  // 요소 반환
  return element;
};

/* -------------------------------------------------------------------------- */

// vNode → DOM 노드 마운트(mount)
export const render = (vNode, domNode) =>
  domNode.appendChild(_renderElement(vNode));
