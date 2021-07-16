export const ip = 'https://asia-east2-taryn-320004.cloudfunctions.net/api/api/v1';
// export const ip = 'http://localhost:4210/api/v1';

function response(json) {
  return json.success
    ? Promise.resolve(json.result)
    : Promise.reject(json.message);
}

export const POST = (path, obj, formData) => {
  let token = localStorage.getItem("token");
  return fetch(ip + path, {
       method: "POST",
       headers: formData
            ? { token }
            : {
                   Accept: "application/json",
                   "Content-Type": "application/json",
                   token,
              },
       body: formData ? obj : JSON.stringify(obj),
       credentials: "include",
  })
       .then((res) => res.json())
       .then(response);
};

export const GET = (path) => {
  let token = localStorage.getItem("token");
  return fetch(ip + path, {
       method: "GET",
       headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token,
       },
       credentials: "include",
  })
       .then((res) => res.json())
       .then(response);
};