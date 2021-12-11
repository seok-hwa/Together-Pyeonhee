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

export const calendarClick = (userID, tempDay) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/calendar/click?userID=${userID}&today=${tempDay}`);
        fetch(`${url}/calendar/click?userID=${userID}&today=${tempDay}`)   //get 오늘 날짜도 보내주기
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const calendarInfo = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/calendar?userID=${userID}`);
        fetch(`${url}/calendar?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const submitMbti = (userID, userAge, userMonthlyIncome, userJob, mbti1Score, mbti2Score, mbti3Score, mbti4Score) => {
    return new Promise(function(resolve, reject) {
        fetch(`${url}/submitMbti`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              userAge: userAge,
              userMonthlyIncome: userMonthlyIncome,
              userJob: userJob,
              mbti1Score: mbti1Score,
              mbti2Score: mbti2Score,
              mbti3Score: mbti3Score,
              mbti4Score: mbti4Score,
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
export const removeDeviceToken = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/removeDeviceToken?userID=${userID}`);
        fetch(`${url}/removeDeviceToken?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const reportWithLast = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/monthReportWithLast?userID=${userID}`);
        fetch(`${url}/monthReportWithLast?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const reportWithPlan = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/monthReportWithPlan?userID=${userID}`);
        fetch(`${url}/monthReportWithPlan?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const sendLike = (budgetPlanID, userLike, userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/likeBudgetPlan/`);
        fetch(`${url}/likeBudgetPlan/`, {
            method: 'POST',
            body: JSON.stringify({
                budgetPlanID: budgetPlanID,
                userLike: userLike,
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
export const recommendedBudgetPlan = (budgetPlanningID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/recommendedBudgetPlan?budgetPlanningID=${budgetPlanningID}`);
        fetch(`${url}/recommendedBudgetPlan?budgetPlanningID=${budgetPlanningID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const didLike = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/didLike`);
        fetch(`${url}/didLike`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                budgetPlanID: budgetPlanID,
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
export const didStore = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/didStore`);
        fetch(`${url}/didStore`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                budgetPlanID: budgetPlanID,
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
export const saveBudgetPlan = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        fetch(`${url}/saveBudgetPlan`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              budgetPlanID: budgetPlanID,
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
export const cancelBudgetPlan = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        fetch(`${url}/cancelBudgetPlan`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              budgetPlanID: budgetPlanID,
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
export const updateCategory = (userID, fintech, tranCate, tranDate, tranTime) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/update_category`);
        fetch(`${url}/update_category`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              fintech: fintech,
              tranCate: tranCate,
              tranDate: tranDate,
              tranTime: tranTime,
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

export const openCheck = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/openCheck`);
        fetch(`${url}/openCheck`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              budgetPlanningID: budgetPlanID,
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

export const usePoint = (userID, budgetPlanID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/usePoint`);
        fetch(`${url}/usePoint`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                usePoint: 100,
                budgetPlanningID: budgetPlanID,
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

