import * as AJAX from "./AJAX.js";
import { getAllPlants } from "./API.js";
import { populateTableData } from "./DataTable.js";

//plant.eatenRaw is actually undefined, or "on"
//convert plant.eatenRaw to be 1 or 0
function plantForm2Data(plant) {
    const plantData = { ...plant };
    plantData.eatenRaw = plant.eatenRaw === "on" ? 1 : 0;
    return plantData;
}

//CREATE new Plant 
function createNewPlant(plant) {
    //Submit plant data, then refresh page
    AJAX.post("/plants/", plantForm2Data(plant), () => location.reload())
}

//UPDATE Plant
function editPlant({ plantID, ...plant }) {
    //Submit user data, then refresh page
    AJAX.put(`/plants/${plantID}`, plantForm2Data(plant), () => location.reload())
}

//SEARCH plants by name
function searchPlants(pattern, callback) {
    AJAX.get(`/plants/search/${pattern}`, callback);
}

//populate allPlantsTable
function populatePlantTable(plants) {
    //Format data for display
    const displayData = plants.map(plant => {
        const displayPlant = { ...plant };
        displayPlant.eatenRaw = plant.eatenRaw ? "Yes" : "No";
        displayPlant.harvestSeasonStart = plant.harvestSeasonStart.split("T")[0];
        displayPlant.harvestSeasonEnd = plant.harvestSeasonEnd.split("T")[0];
        return displayPlant;
    });

    const tableName = "allPlantsTable";
    const editFormName = "editPlantForm";
    const headers = [
        "ID",
        "Plant Name",
        "Harvest Season Start",
        "Harvest Season End",
        "Flavor Profile",
        "Eaten Raw",
        "How to Cook"
    ]
    const displayCols = [
        "plantID",
        "plantName",
        "harvestSeasonStart",
        "harvestSeasonEnd",
        "flavorProfile",
        "eatenRaw",
        "howToCook"
    ];
    const editCols = {
        plantName: "text",
        harvestSeasonStart: "date",
        harvestSeasonEnd: "date",
        flavorProfile: "text",
        eatenRaw: "checkbox",
        howToCook: "text"
    }
    const deleteFn = (plant) => AJAX.del(`/plants/${plant.plantID}`, () => location.reload());
    const editFn = ({ plantID }, data) => editPlant({ plantID, ...data });

    populateTableData(tableName, editFormName, displayData,
        headers, displayCols, deleteFn,
        editCols, editFn);
}

document.addEventListener('DOMContentLoaded', () => {
    // bind createNewPlant to form
    document.getElementById("newPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewPlant(data);
        }));

    //bind plantSearchForm
    //if nothing is entered into search, return all plants 
    document.getElementById("searchPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction(({ pattern }) => {
            if (pattern !== "") searchPlants(pattern, populatePlantTable);
            else getAllPlants(populatePlantTable);
        }));

    getAllPlants(populatePlantTable);
});