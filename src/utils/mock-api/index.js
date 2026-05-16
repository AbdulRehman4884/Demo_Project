import { USE_FRONTEND_ONLY_AUTH } from 'src/utils/mock-portal-credentials';

import { resolveMockApiResponse } from './resolver';

// ----------------------------------------------------------------------

export function getMockApiResponse(url, method = 'GET', body) {
  if (!USE_FRONTEND_ONLY_AUTH) {
    return null;
  }
  return resolveMockApiResponse(url, method, body);
}

export function installMockFetch() {
  if (!USE_FRONTEND_ONLY_AUTH || typeof window === 'undefined') {
    return;
  }

  if (window.__EE_MOCK_FETCH_INSTALLED__) {
    return;
  }
  window.__EE_MOCK_FETCH_INSTALLED__ = true;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    const method = init.method || 'GET';

    const mock = getMockApiResponse(url, method, init.body);
    if (mock !== null) {
      return new Response(JSON.stringify(mock), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return nativeFetch(input, init);
  };
}
