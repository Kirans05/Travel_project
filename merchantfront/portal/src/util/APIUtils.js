import { API_BASE_URL, ACCESS_TOKEN } from './../constants/Constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}
export function changePass(changePassRequest) {
    return request({
        url: API_BASE_URL + "/auth/changePass",
        method: 'POST',
        body: JSON.stringify(changePassRequest)
    });
}
export function changePassToken(changePassRequest) {
    return request({
        url: API_BASE_URL + "/auth/changePassToken",
        method: 'POST',
        body: JSON.stringify(changePassRequest)
    });
}
export function resetPass(resetPassRequest) {
    return request({
        url: API_BASE_URL + "/auth/resetPass",
        method: 'POST',
        body: JSON.stringify(resetPassRequest)
    });
}
export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}
export function addTour(tour){
    return request({
        url: API_BASE_URL + "/tour/addTour",
        method: 'POST',
        body: JSON.stringify(tour)
    });
}

export function processOrder(ordReq) {
	return request({
		url: API_BASE_URL + "/order/create",
		method: 'POST',	
		body: JSON.stringify(ordReq),
	});
} 

export function allProducts() {
	return request({
        url: API_BASE_URL + "/tour/allProducts",
        method: 'GET'
    });
}
