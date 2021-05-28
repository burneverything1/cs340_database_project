import * as AJAX from "./AJAX.js";

function getAllEnvirnoments(callback) {
    AJAX.get("/environs/", callback);
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
        //Populate environ table
        //Get more information
        getSingleEnviroment(env.environID, ([env]) => {
            {
                const row = document.createElement("tr");

                const idCell = document.createElement("td");
                const idText = document.createTextNode(env.environID);

                const nameCell = document.createElement("td");
                const nameText = document.createTextNode(env.environName);

                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                const deleteButtonText = document.createTextNode("Delete");

                deleteButton.addEventListener("click", () => {
                    AJAX.del(`/environ/${env.environID}`, () => location.reload());
                });

                body.appendChild(row);

                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(deleteCell);

                idCell.appendChild(idText);

                nameCell.appendChild(nameText);

                deleteCell.appendChild(deleteButton);
                deleteButton.appendChild(deleteButtonText);
            }
            //Populate edit form
            {
                const option = document.createElement("option");
                const optionText = document.createTextNode(env.environName);

                editOptions.appendChild(option);
                option.appendChild(optionText);
                option.setAttribute("value", env.environID);
            }
        });
    }
}

//Inititalization 
//Run after dom loaded
document.addEventListener('DOMContentLoaded', () => {
    //bind editEnvironFactor to form
    document.getElementById("editEnvironForm")
    .addEventListener("submit", AJAX.formSubmitAction((data) => {
        editEnvironment(data);
    }));

    //Populate the environmental factors table
    getAllEnvirnoments(populateEnvironFactorsTable);
});