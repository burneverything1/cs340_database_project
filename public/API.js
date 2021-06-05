import * as AJAX from "./AJAX.js";

//READ all users
export function getAllPlants(callback) {
    AJAX.get("/plants/", callback);
}

//READ all users
export function getAllUsers(callback) {
    AJAX.get("/users/", callback);
}