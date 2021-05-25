import * as AJAX from "./AJAX.js";

//CREATE new User
// user is a object with {username, favoritePlants}
function createNewUser(user) {
    //Submit user data, then refresh page
    AJAX.post("/users/", user, () => location.reload())
}

//READ all users
function getAllUsers(callback) {
    AJAX.get("/users/", callback);
}

//READ savedUserPlants
function getUserPlants(callback) {
    //No backend yet, here is some sample data
    const data = [
        { id: 213, username: "Tim", plantname: "Cactus", dayHarvested: "10/10/21", locationHarvested: "Singapore" },
        { id: 435, username: "Isabella", plantname: "Cactus", dayHarvested: "10/10/21", locationHarvested: "Singapore" },
        { id: 233, username: "Mike", plantname: "Cactus", dayHarvested: "10/10/21", locationHarvested: "Singapore" },
        { id: 232, username: "Charlie", plantname: "Cactus", dayHarvested: "10/10/21", locationHarvested: "Singapore" }
    ];
    callback(data);
}

//populate savedUserPlants table
function populatePlantsTable(plants) {
    const body = document.getElementById("savedUserPlantsTable");
    //Clear previous table data
    body.innerHTML = "";
    //Fill new table data
    const cols = ["username", "plantname", "dayHarvested", "locationHarvested"];
    plants.forEach((plant) => {
        const row = document.createElement("tr");
        body.appendChild(row);
        cols.forEach(key => {
            const cell = document.createElement("td");
            const text = document.createTextNode(plant[key]);
            row.appendChild(cell);
            cell.appendChild(text);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    //bind createNewUser to form
    document.getElementById("newUserForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewUser(data);
        }));

    //bind userSearchForm
    document.getElementById("userSearchForm")
        .addEventListener("submit", AJAX.formSubmitAction(({ username }) => {
            getAllUsers((users) => {
                const result = users.filter((u) => u.username === username)[0];
                if (result !== undefined) {
                    const text = document.createTextNode(JSON.stringify(result));
                    const resultDiv = document.getElementById("searchResult");
                    //Clear any previous search results
                    resultDiv.innerHTML = "";
                    //Add this search result
                    resultDiv.appendChild(text);
                }
            })
        }));

    //Download userSavedPlantData and fill table
    getUserPlants(populatePlantsTable);
});