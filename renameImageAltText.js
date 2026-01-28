let inputURL = process.argv[2];
let inputPartition = process.argv[3];
let inputUserApiKey = process.argv[4];
let inputApiKey = process.argv[5];
let inputHTML = process.argv[6];

async function getImages(id) {
    const url = inputURL + id
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'partition': inputPartition,
                'userApiKey': inputUserApiKey,
                'apiKey': inputApiKey,
            }
        });
        if(!response) {
            throw new Error("Response status: ${response.status}")
        } else {
            const data = await response.json(); 
            let itemData = {
                "Id": id,
                "Name": data.Name,
                "AltText": data.Name, //We want to rename the images alt text to be the same at the image name
                "IsVisible": false,
            }
            console.log(itemData);
            return (itemData);
        }
    } catch(error) {
        console.log(error);
    }
}


async function editImages(id, itemData) {
    const url = inputURL + "/" + id
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'partition': inputPartition,
                'userApiKey': inputUserApiKey,
                'apiKey': inputApiKey,
            },
            body: JSON.stringify(itemData)
        });
        if(!response) {
            throw new Error("Response status: ${response.status}")
        } else {
            const data = await response.json(); 
            console.log(data);
        }
    } catch(error) {
        console.log(error);
    }
}



async function getAllDocuments() {
    const url = inputHTML
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'partition': inputPartition,
                'userApiKey': inputUserApiKey,
                'apiKey': inputApiKey,
            }
        });
        if(!response) {
            throw new Error("Response status: ${response.status}")
        } else {
            const data = await response.json();
            for(let document of data.Source) {
                let itemDataGet;
                let documentNumber = document.Id;
                itemDataGet =  await getImages(JSON.stringify(documentNumber));
                editImages(documentNumber, itemDataGet);
            }
            
            
        }
    } catch(error) {
        console.log(error);
    }
}


getAllDocuments();

