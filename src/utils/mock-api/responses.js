// Standard API envelopes used across the HRMS frontend.

export function ok(data, message = 'Success') {
  const payload = data === undefined ? [] : data;
  return {
    code: '200',
    message,
    data: Array.isArray(payload) ? payload : [payload],
  };
}

export function okRaw(data, message = 'Success') {
  return {
    code: '200',
    message,
    data,
  };
}

/** Some screens compare with numeric 200 (facial attendance, forms). */
export function okNum(data, message = 'Success') {
  const payload = data === undefined ? [] : data;
  return {
    code: 200,
    message,
    data: Array.isArray(payload) ? payload : [payload],
  };
}
