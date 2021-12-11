import config from "../config";
const url = config.url;

export const getMyInfo = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/myInfo?userID=${userID}`);
        fetch(`${url}/myInfo?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const getMbti = (userID) => {
    return new Promise(function(resolve, reject) {
        fetch(`${url}/getMbti?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};