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

export const login = (userID, userPassword, fcmToken) => {
    return new Promise(function(resolve, reject) {
        console.log('디바이스 토큰: ', fcmToken);
        console.log(`${url}/login`);

        fetch(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify({
            userID: userID,
            userPassword: userPassword,
            deviceToken: fcmToken,
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
          },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const join = (userID, userName, userPhone, userPassword, userPasswordCheck) => {
    return new Promise(function(resolve, reject) {
        fetch(`${url}/signUp`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              userName: userName,
              userPhone: userPhone,
              userPassword: userPassword,
              userPasswordCheck: userPasswordCheck,
        }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const daily = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/daily`);
        fetch(`${url}/daily`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const dailySaving = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/daily/savings`);
        fetch(`${url}/daily/savings`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const saveTranHistory = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/saveTranHistory?userID=${userID}`);
        fetch(`${url}/saveTranHistory?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const latestTranList = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/latestTranList`);
        fetch(`${url}/latestTranList`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const totalTranList = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/tranList`);
        fetch(`${url}/tranList`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};