// Frontend-only demo users (no API). Passwords are local placeholders only.
// `userType` matches backend routing in jwt-login-view (co, sa, rc, cj, etc.).

export const USE_FRONTEND_ONLY_AUTH = true;

function base64UrlEncodeJson(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

/** Unsigned-style JWT shape; client only checks payload.exp and fields used in auth-provider. */
export function createUnsignedMockJwt({ username, role }) {
  const header = base64UrlEncodeJson({ alg: 'none', typ: 'JWT' });
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
  const payload = base64UrlEncodeJson({ username, role, exp });
  return `${header}.${payload}.frontend-mock`;
}

export const MOCK_PORTAL_USERS = [
  {
    username: 'company',
    password: 'company123',
    userType: 'co',
    email: 'company.demo@localhost',
  },
  {
    username: 'superadmin',
    password: 'super123',
    userType: 'sa',
    email: 'super.demo@localhost',
  },
  {
    username: 'employee',
    password: 'employee123',
    userType: 'cj',
    email: 'employee.demo@localhost',
  },
  {
    username: 'newcandidate',
    password: 'candidate123',
    userType: 'rc',
    email: 'newuser.demo@localhost',
  },
];

export function findMockPortalUser(username, password) {
  const u = String(username || '').trim();
  const p = String(password || '');
  return MOCK_PORTAL_USERS.find((row) => row.username === u && row.password === p) || null;
}
