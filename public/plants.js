import * as AJAX from "./AJAX.js";
import { getAllPlants } from "./API.js";

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
    const body = document.getElementById("allPlantsTable");
    const editOptions = document.getElementById("editPlantID");
    //Clear previous table data
    body.innerHTML = "";
    editOptions.innerHTML = "";
    //Fill new table data
    const columns = ["plantID", "plantName", "harvestSeasonStart", "harvestSeasonEnd", "flavorProfile", "eatenRaw", "howToCook"];
    for (const plant of plants) {
        //Populate plant table
        {
            //Format data for display
            const displayPlant = { ...plant };
            displayPlant.eatenRaw = plant.eatenRaw ? "Yes" : "No";
            displayPlant.harvestSeasonStart = plant.harvestSeasonStart.split("T")[0];
            displayPlant.harvestSeasonEnd = plant.harvestSeasonEnd.split("T")[0];

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
                AJAX.del(`/plants/${plant.plantID}`, () => location.reload());
            });
        }
        //Populate edit form
        {
            const option = document.createElement("option");
            const optionText = document.createTextNode(plant.plantName);

            editOptions.appendChild(option);
            option.appendChild(optionText);
            option.setAttribute("value", plant.plantID);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // bind createNewPlant to form
    document.getElementById("newPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewPlant(data);
        }));

    // bind editNewPlant to form
    document.getElementById("editPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            editPlant(data);
        }));

    //bind userSearchForm
    //if nothing is entered into search, return all plants 
    document.getElementById("searchPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction(({ pattern }) => {
            if (pattern !== "") searchPlants(pattern, populatePlantTable);
            else getAllPlants(populatePlantTable);
        }));

    //bind userSearchForm
    // document.getElementById("plantSearchForm")
    //     .addEventListener("submit", AJAX.formSubmitAction(({ username }) => {
    //         getAllPlants((users) => {
    //             const result = users.filter((u) => u.username === username)[0];
    //             if (result !== undefined) {
    //                 const text = document.createTextNode(JSON.stringify(result));
    //                 const resultDiv = document.getElementById("searchResult");
    //                 //Clear any previous search results
    //                 resultDiv.innerHTML = "";
    //                 //Add this search result
    //                 resultDiv.appendChild(text);
    //             }
    //         })
    //     }));

    getAllPlants(populatePlantTable);
});