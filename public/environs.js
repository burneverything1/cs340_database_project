import * as AJAX from "./AJAX.js";
import {getAllEnvironments} from "./API.js";

//CREATE new environ
// user is a object with {plantEffect, environName}
function createNewEnviron(user) {
    AJAX.post("/environs/", user, () => location.reload())
}

//UPDATE Environ
function editEnvironment({ environID, environName, plantEffect }) {
    AJAX.put(`/environs/${environID}`, { environName, plantEffect }, () => location.reload())
}


//Ajax request to get the single environment 
function getSingleEnviroment(id, callback) {
    AJAX.get(`/environs/${id}`, callback);
}

//populate environmental factors table
function populateEnvironFactorsTable(envs) {
    const body = document.getElementById("allEnvironTable");
    const editOptions = document.getElementById("editEnvironID");
    //Clear previous table data
    body.innerHTML = "";
    editOptions.innerHTML = "";
    //Fill new table data
    for (const env of envs) {
        {   
            //Populate environ table
            const row = document.createElement("tr");
            body.appendChild(row);
            const idCell = document.createElement("td");
            const idText = document.createTextNode(env.environID);

            const nameCell = document.createElement("td");
            const nameText = document.createTextNode(env.environName);

            const effectCell = document.createElement("td");
            const effectText = document.createTextNode(env.plantEffect);

            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            const deleteButtonText = document.createTextNode("Delete");

            deleteButton.addEventListener("click", () => {
                AJAX.del(`/environs/${env.environID}`, () => location.reload());
            });

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(effectCell);
            row.appendChild(deleteCell);

            idCell.appendChild(idText);

            nameCell.appendChild(nameText);

            effectCell.appendChild(effectText);

            deleteCell.appendChild(deleteButton);
            deleteButton.appendChild(deleteButtonText);
        }
        //Populate edit form
        {
            const option = document.createElement("option");
            editOptions.appendChild(option);
            const optionText = document.createTextNode(env.environName);
            option.appendChild(optionText);
            option.setAttribute("value", env.environID);
        }
    }
}

//Inititalization 
//Run after dom loaded
document.addEventListener('DOMContentLoaded', () => {
    //bind createNewUser to form
    document.getElementById("newEnvironForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewEnviron(data);
        }));

    //bind editEnvironFactor to form
    document.getElementById("editEnvironForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            editEnvironment(data);
        }));

    //Populate the environmental factors table
    getAllEnvironments(populateEnvironFactorsTable);
});