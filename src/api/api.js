export const ip = 'https://asia-east2-taryn-320004.cloudfunctions.net/api/api/v1';
// export const ip = 'http://localhost:4210/api/v1';

function response(json) {
  return json.success
    ? Promise.resolve(json.result)
    : Promise.reject(json.message);
}

export const POST = (path, obj, formData) =>
  fetch(ip + path, {
    method: 'POST',
    headers: formData
      ? {}
      : {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    body: formData ? obj : JSON.stringify(obj),
    credentials: 'include',
  })
    .then((res) => res.json())
    .then(response);

export const GET = (path) =>
  fetch(ip + path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => res.json())
    .then(response);
