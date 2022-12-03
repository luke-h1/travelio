export default function fetcher<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  data?: unknown,
) {
  return fetch(`${window.location.origin}/api${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then(res => {
    if (res.status > 399 && res.status < 200) {
      return res.json().then(e => {
        throw new Error(e.message);
      });
    }
    return res.json() as Promise<T>;
  });
}
