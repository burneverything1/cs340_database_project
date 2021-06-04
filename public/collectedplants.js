import * as AJAX from "./AJAX.js";

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
    //Download userSavedPlantData and fill table
    getUserPlants(populatePlantsTable);
});