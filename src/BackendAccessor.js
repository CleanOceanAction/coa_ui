
export function getData(endpoint) {
    const url = /* process.env.NODE_ENV === "development" ?
        "http://localhost:5000" :*/ "http://coa-flask-app-prod.us-east-1.elasticbeanstalk.com";

    console.log(`getData url=${url}/${endpoint}`);

    return fetch(`${url}/${endpoint}`,
                {"method": "GET", "mode": "cors"});
}

export function postData(endpoint, data) {
    const url = "http://coa-flask-app-prod.us-east-1.elasticbeanstalk.com";

    const requestOptions = {
        "method": "POST",
        "mode": "cors",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(data),
    }
    console.log(`postData url=${url}/${endpoint}`, requestOptions);
    return fetch(`${url}/${endpoint}`, requestOptions);
}