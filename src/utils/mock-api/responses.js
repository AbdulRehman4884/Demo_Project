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

/** When API returns `data` as a plain array (e.g. username list). */
export function okList(items, message = 'Success') {
  return {
    code: '200',
    message,
    data: Array.isArray(items) ? items : [items],
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
