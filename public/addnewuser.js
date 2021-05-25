import * as AJAX from "./AJAX.js";

//CREATE new User
// user is a object with {username, favoritePlants}
function createNewUser(user) {
    //Submit user data, then refresh page
    AJAX.post("/users/", user, ()=>location.reload())
}

//READ all users
function getAllUsers(callback) {
    AJAX.get("/users/", callback);
}
  
document.addEventListener('DOMContentLoaded', ()=>{
    //bind createNewUser to form
    document.getElementById("newUserForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewUser(data);
        }));
    
    //bind userSearchForm
    document.getElementById("userSearchForm")
        .addEventListener("submit", AJAX.formSubmitAction(({username}) => {
            getAllUsers((users)=>{
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
        }))
});