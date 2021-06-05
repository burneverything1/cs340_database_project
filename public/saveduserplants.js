import * as AJAX from "./AJAX.js";
import { getAllUsers, getAllPlants } from "./API.js";

//READ savedUserPlants
function getAllSavedUserPlants(callback) {
    AJAX.get("/savedplants/", callback);
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

function populateUserField(users) {
    const editOptions = document.getElementById("newUserPlantFromUserField");
    editOptions.innerHTML = "";
    users.forEach(user => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(user.username);
        option.appendChild(optionText);
        option.setAttribute("value", user.userID);
    });
}
function populatePlantField(plants) {
    const editOptions = document.getElementById("newUserPlantFromPlantField");
    editOptions.innerHTML = "";
    plants.forEach(plant => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(plant.plantName);
        option.appendChild(optionText);
        option.setAttribute("value", plant.plantID);
    });
}

function populateSavedUserPlantsTable(userplants) {
    const body = document.getElementById("savedUserPlantsTable");
    const columns = ['username', 'plantName', 'dayHarvested', 'plantGrowthLevels', 'flavorRate', 'locationHarvested']
    userplants.forEach(plant => {
        //Format data for display
        const displayPlant = { ...plant };
        displayPlant.dayHarvested = plant.dayHarvested.split("T")[0];

        //Build row
        const row = document.createElement("tr");
        body.appendChild(row);
        columns.forEach(col => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(displayPlant[col]);
            row.appendChild(cell);
            cell.appendChild(cellText);
        });

        //Delete Button
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        const deleteButtonText = document.createTextNode("Delete");
        row.appendChild(deleteCell);
        deleteCell.appendChild(deleteButton);
        deleteButton.appendChild(deleteButtonText);
        deleteButton.addEventListener("click", () => {
            AJAX.del(`/savedplants/${plant.userID}/${plant.plantID}`, () => location.reload());
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    getAllUsers(populateUserField);
    getAllPlants(populatePlantField);
    getAllSavedUserPlants(populateSavedUserPlantsTable);

    //Bind new userplants
    document.getElementById("newUserPlantForm")
    .addEventListener("submit", AJAX.formSubmitAction((data) => {
        AJAX.post("/savedplants/", data, ()=>location.reload());
    }))

});