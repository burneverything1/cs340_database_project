import * as AJAX from "./AJAX.js";

//CREATE new User
// user is a object with {username, favoritePlants}
function createNewUser(user) {
    //Submit user data, then refresh page
    AJAX.post("/users/", user, () => location.reload())
}

//UPDATE User
// user is a object with {userID, username, favoritePlants}
function editUser({ userID, username, favoritePlants }) {
    //Submit user data, then refresh page
    AJAX.put(`/users/${userID}`, { username, favoritePlants }, () => location.reload())
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

//populate allUsersPlants table
function populateUserTable(users) {
    const body = document.getElementById("allUsersTable");
    const editOptions = document.getElementById("editUserID");
    //Clear previous table data
    body.innerHTML = "";
    editOptions.innerHTML = "";
    //Fill new table data
    for (const user of users) {
        //Populate user table
        {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            const idText = document.createTextNode(user.userID);

            const nameCell = document.createElement("td");
            const nameText = document.createTextNode(user.username);

            const favoritePlantsCell = document.createElement("td");
            const favoritePlantsText = document.createTextNode(user.favoritePlants)

            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            const deleteButtonText = document.createTextNode("Delete");

            deleteButton.addEventListener("click", () => {
                AJAX.del(`/users/${user.userID}`, () => location.reload());
            });

            body.appendChild(row);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(favoritePlantsCell);
            row.appendChild(deleteCell);

            idCell.appendChild(idText);

            nameCell.appendChild(nameText);

            favoritePlantsCell.appendChild(favoritePlantsText);

            deleteCell.appendChild(deleteButton);
            deleteButton.appendChild(deleteButtonText);
        }
        //Populate edit form
        {
            const option = document.createElement("option");
            const optionText = document.createTextNode(user.username);

            editOptions.appendChild(option);
            option.appendChild(optionText);
            option.setAttribute("value", user.userID);
        }
    }
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

    //bind editNewUser to form
    document.getElementById("editUserForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            editUser(data);
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

    getAllUsers(populateUserTable);

    //Download userSavedPlantData and fill table
    getUserPlants(populatePlantsTable);
});