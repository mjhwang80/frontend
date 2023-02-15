/* -------------------------------------------------------------------------- */
// 메시지 스타일

const MESSAGE_STYLES = {
  log: `
      color: #1c1c1d;
      font-weight: bold;
      `,
  success: `
      color: #00c712;
      font-weight: bold;
      `,
  info: `
      color: #006afc;
      font-weight: bold;
      `,
  warn: `
      color: #ff9500;
      font-weight: bold;
      `,
  error: `
      color: #ee3327;
      font-weight: bold;
      `,
};

/* -------------------------------------------------------------------------- */
// 메시지 유틸리티

export function log(message, messageStyle = MESSAGE_STYLES.log) {
  console.log(`%c${message}`, messageStyle);
}

export function info(message) {
  return log(`🔵 ${message}`, MESSAGE_STYLES.info);
}

export function success(message) {
  return log(`🟢 ${message}`, MESSAGE_STYLES.success);
}

export function warn(message) {
  return log(`🟠 ${message}`, MESSAGE_STYLES.warn);
}

export function error(message) {
  return log(`🔴 ${message}`, MESSAGE_STYLES.error);
}
