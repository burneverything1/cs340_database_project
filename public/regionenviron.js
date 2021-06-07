import * as AJAX from "./AJAX.js";
import { getAllRegions, getAllEnvironments } from "./API.js";
import { populateTableData } from "./DataTable.js";

//READ savedUserPlants
function getAllRegionEnvironments(callback) {
    AJAX.get("/regionenv/", callback);
}

function populateEnvField(envs) {
    const editOptions = document.getElementById("newRegEnvEnvironField");
    editOptions.innerHTML = "";
    envs.forEach(env => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(env.environName);
        option.appendChild(optionText);
        option.setAttribute("value", env.environID);
    });
}
function populateRegionField(regions) {
    const editOptions = document.getElementById("newRegEnvRegionField");
    editOptions.innerHTML = "";
    regions.forEach(region => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(region.regionName);
        option.appendChild(optionText);
        option.setAttribute("value", region.regionID);
    });
}

function populateRegionEnvironTable(regions, environs, regenvs) {
    const tableName ="regionEnvironTable";
    const editFormName = "editRegionEnvironForm";
    const headers = ["Region", "Environ" ]
    const displayCols = ["regionName", "environName"];
    const regEntries = { checkDefault: ({ regionID }, b) => regionID.toString() === b.toString() };
    regions.forEach(({ regionID, regionName}) => {
        regEntries[regionID] = regionName;
    });
    const envEntries = { checkDefault: ({ environID }, b) => environID.toString() === b.toString() };
    environs.forEach(({ environID, environName }) => {
        envEntries[environID] = environName;
    });
    const editCols = {
        "regionName": regEntries,
        "environName": envEntries,
    }
    const deleteFn = ({environID, regionID}) => AJAX.del(`/regionenv/${environID}/${regionID}`, () => location.reload());
    const editFn = ({environID, regionID}, { environName, regionName }) =>
        AJAX.put(`/regionenv/${environID}/${regionID}`, { environID: environName, regionID: regionName }, () => location.reload());

    populateTableData(tableName, editFormName, regenvs,
        headers, displayCols, deleteFn,
        editCols, editFn);
}


document.addEventListener('DOMContentLoaded', () => {
    getAllEnvironments((envs) => {
        populateEnvField(envs);
        getAllRegions((regions) => {
            populateRegionField(regions);
            getAllRegionEnvironments((regionEnvironments) => {
                populateRegionEnvironTable(regions, envs, regionEnvironments);
            });
        });
    });

    //Bind new userplants
    document.getElementById("newRegionEnvironmentForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            AJAX.post("/regionenv/", data, () => location.reload());
        }))

});