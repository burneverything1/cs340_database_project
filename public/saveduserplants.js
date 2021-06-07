import * as AJAX from "./AJAX.js";
import { getAllUsers, getAllPlants } from "./API.js";
import { populateTableData } from "./DataTable.js";

//READ savedUserPlants
function getAllSavedUserPlants(callback) {
    AJAX.get("/savedplants/", callback);
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

function populateSavedUserPlantsTable(users, plants, userplants) {
    //Format data for display
    const displayData = userplants.map(plant => {
        const displayPlant = { ...plant };
        displayPlant.dayHarvested = plant.dayHarvested.split("T")[0];
        return displayPlant;
    });

    const tableName = "savedUserPlantsTable";
    const editFormName = "editSaveUserPlantForm";
    const headers = [
        "User Name",
        "Plant Name",
        "Day Harvested",
        "Plant Growth Level",
        "Flavor Rate",
        "Location Harvested"
    ]
    const displayCols = [
        "username",
        "plantName",
        "dayHarvested",
        "plantGrowthLevels",
        "flavorRate",
        "locationHarvested",
    ];
    const userEntries = { checkDefault: ({ userID }, b) => userID.toString() === b.toString() };
    users.forEach(({ userID, username }) => {
        userEntries[userID] = username;
    });
    const plantEntries = { checkDefault: ({ plantID }, b) => plantID.toString() === b.toString() };
    plants.forEach(({ plantID, plantName }) => {
        plantEntries[plantID] = plantName;
    });
    const editCols = {
        "username": userEntries,
        "plantName": plantEntries,
        "dayHarvested": "date",
        "plantGrowthLevels": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
        },
        "flavorRate": {
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5": "5",
        },
        "locationHarvested": "text",
    }
    const deleteFn = (plant) => AJAX.del(`/savedplants/${plant.userID}/${plant.plantID}`, () => location.reload());
    const editFn = ({ userID, plantID }, { username, plantName, ...data }) =>
        AJAX.put(`/savedplants/${userID}/${plantID}`, { plantID: plantName, userID: username, ...data }, () => location.reload());

    populateTableData(tableName, editFormName, displayData,
        headers, displayCols, deleteFn,
        editCols, editFn);
}


document.addEventListener('DOMContentLoaded', () => {
    getAllUsers((users) => {
        populateUserField(users);
        getAllPlants((plants) => {
            populatePlantField(plants);
            getAllSavedUserPlants((userplants) => {
                populateSavedUserPlantsTable(users, plants, userplants);
            });
        });
    });

    //Bind new userplants
    document.getElementById("newUserPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            AJAX.post("/savedplants/", data, () => location.reload());
        }))

});