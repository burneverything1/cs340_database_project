var serverURL = "http://web.engr.oregonstate.edu/~leeyeh/index.html";
const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('addUserButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "username": "testtim",
            "favoritePlants": "testmushroom"
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);
const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('savedNewUserPlantButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "plantName": "testme",
            "harvestSeasonStart": "0000-01-01",
            "harvestSeasonEnd": "0101-01-02",
            "flavorProfile": "testyum",
            "eatenRaw": 0,
            "howToCook": "however you want"
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('savedNewUserPlantButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "search": "searchthis",
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);
const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('addRegionButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "regionName": "testregion",
            "state": "MA"
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('searchButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "search": "searchThis",
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('addNewPlantButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "plantName": "testme",
            "harvestSeasonStart": "0000-01-01",
            "harvestSeasonEnd": "0101-01-02",
            "flavorProfile": "testyum",
            "eatenRaw": 0,
            "howToCook": "however you want"
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('addRegionButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "regionName": "testregion",
            "state": "MA"
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const bindPutSubmit = () => {
    console.log("I AM IN THE USER PAGE");

    const button = document.getElementById('addButton')
    button.addEventListener('click', (event) => {
        //  gets data
        // sendData(data)
        sendData({
            "add": "addThis",
        })
    });
}
document.addEventListener('DOMContentLoaded', bindPutSubmit);

const sendData = (payload) => {
    var req = new XMLHttpRequest();
    req.open('Put', serverURL, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(payload));
}

const getRequest = function(newTable) {
    var req = new XMLHttpRequest();
    req.open('Get', serverURL, true);
    req.addEventListener('load', function() {
        }
    });
}