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
export const saveSavingPlan = (userID, savingName, savingMoney, startDate, endYear, endMonth) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/saveSavingPlan`);
        fetch(`${url}/saveSavingPlan`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                savingName: savingName,
                savingMoney: savingMoney,
                startDate: startDate,
                endYear: endYear,
                endMonth: endMonth,
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

export const budgetPlanCabinet = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/BudgetPlanCabinet?userID=${userID}`);
        fetch(`${url}/BudgetPlanCabinet?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const saveSelectBudgetPlan = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/saveSelectBudgetPlan?userID=${userID}`);
        fetch(`${url}/saveSelectBudgetPlan?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const viewBudgetPlan = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/viewBudgetPlan?userID=${userID}`);
        fetch(`${url}/viewBudgetPlan?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const myBudgetPlan = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/myBudgetPlan?userID=${userID}`);
        fetch(`${url}/myBudgetPlan?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const  editBudget = (userID, income, savings, fixedExpenditure, plannedExpenditure, monthlyRent, insurance, transportation, 
    communication, subscription, leisure, shopping, education, medical, event, etc) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/editBudget`);
        fetch(`${url}/editBudget`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                income: income,
                savings: savings,
                fixedExpenditure: fixedExpenditure,
                plannedExpenditure: plannedExpenditure,
                monthlyRent: monthlyRent,
                insurance: insurance,
                transportation: transportation,
                communication: communication,
                subscription: subscription,
                leisure: leisure,
                shopping: shopping,
                education: education,
                medical: medical,
                event: event,
                etc: etc,
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

export const MyBudgetPlanCabinet = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/MyBudgetPlanCabinet?userID=${userID}`);
        fetch(`${url}/MyBudgetPlanCabinet?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const editSavingPlan = (userID, savingID, savingName, savingMoney, endYear, endMonth) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/editSavingPlan`);
        fetch(`${url}/editSavingPlan`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              savingID: savingID,
              savingName: savingName,
              savingMoney: savingMoney,
              endYear: endYear,
              endMonth: endMonth,
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

export const removeSavingPlan = (userID, savingID) => {
    return new Promise(function(resolve, reject) {
        console.log('/removeSavingPlan');
        fetch(`${url}/removeSavingPlan`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                savingID: savingID,
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

export const  submitBudgetPlan = (userID, income, savings, fixedExpenditure, plannedExpenditure, monthlyRent, insurance, transportation, 
    communication, subscription, leisure, shopping, education, medical, event, etc) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/submitBudgetPlan`);
        fetch(`${url}/submitBudgetPlan`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                income: income,
                savings: savings,
                fixedExpenditure: fixedExpenditure,
                plannedExpenditure: plannedExpenditure,
                monthlyRent: monthlyRent,
                insurance: insurance,
                transportation: transportation,
                communication: communication,
                subscription: subscription,
                leisure: leisure,
                shopping: shopping,
                education: education,
                medical: medical,
                event: event,
                etc: etc,
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

export const MyBudgetPlanDetail = (callMyBudgetID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/MyBudgetPlanDetail?budgetPlanningID=${callMyBudgetID}`);
        fetch(`${url}/MyBudgetPlanDetail?budgetPlanningID=${callMyBudgetID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const accountListApi = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/accountList?userID=${userID}`);
        fetch(`${url}/accountList?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const close = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/close?userID=${userID}`);
        fetch(`${url}/close?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const counselingFinancialProduct = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/Counseling/FinancialProduct`);
        fetch(`${url}/Counseling/FinancialProduct`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const counselingFinancialProductCategory = (categoryName) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/Counseling/FinancialProduct/Category`);
        fetch(`${url}/Counseling/FinancialProduct/Category`, {
            method: 'POST',
            body: JSON.stringify({
                categoryName: categoryName,
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

export const requestMatching = (userID, counselorName, counselor_id) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/requestMatching`);
        fetch(`${url}/requestMatching`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              counselorName: counselorName,
              counselor_id: counselor_id,
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

export const counselingAssetManagement = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/Counseling/AssetManagement`);
        fetch(`${url}/Counseling/AssetManagement`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};


export const allFundListApi = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/allFundList`);
        fetch(`${url}/allFundList`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const myFundListApi= (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/myFundList?userID=${userID}`)
        fetch(`${url}/myFundList?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const allLoanListApi = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/allLoanList`);
        fetch(`${url}/allLoanList`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const allSavingListApi = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/allSavingList`);
        fetch(`${url}/allSavingList`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const mySavingListApi = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/mySavingList?userID=${userID}`);
        fetch(`${url}/mySavingList?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const allPensionListApi = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/allPensionList`);
        fetch(`${url}/allPensionList`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const myPensionListApi = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/myPensionList?userID=${userID}`);
        fetch(`${url}/myPensionList?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};

export const selectedAccountHistory = (userID, fintech_use_num) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/selectedAccountHistory`);
        fetch(`${url}/selectedAccountHistory`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                fintech_use_num: fintech_use_num,
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
export const update_info = (userID, fintech_use_num, newAlias) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/update_info`);
        fetch(`${url}/update_info`, {
            method: 'POST',
            body: JSON.stringify({
                userID: userID,
                fintech_use_num: fintech_use_num,
                newAlias: newAlias,
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
export const MonthReportCabinetApi = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/MonthReportCabinet`);
        fetch(`${url}/MonthReportCabinet`, {
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
export const monthReportMbti = (userID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/monthReportMbti?userID=${userID}`);
        fetch(`${url}/monthReportMbti?userID=${userID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const updateMbti = (userID, userMbti) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/updateMbti`);
        fetch(`${url}/updateMbti`, {
            method: 'POST',
            body: JSON.stringify({
              userID: userID,
              userMbti: userMbti,
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
export const noticeBoard = (boardID) => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/noticeBoard?boardID=${boardID}`);
        fetch(`${url}/noticeBoard?boardID=${boardID}`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};
export const noticeListApi = () => {
    return new Promise(function(resolve, reject) {
        console.log(`${url}/noticeList`);
        fetch(`${url}/noticeList`)   //get
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
    })
};