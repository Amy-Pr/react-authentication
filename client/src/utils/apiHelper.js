export const api = ( //Can set default values to the parameters this way
    path,
    method = "GET",
    body = null,
    credentials = null
) => {
    const url = "http://localhost:5000/api" + path;
    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = 'application/json; charset=UTF-8'; //using bracket notation because the header is a string 
    }

    if (credentials) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`); //btoa creates a base64 string
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);

}

