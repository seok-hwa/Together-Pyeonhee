
test('12시가 되면 일일권장금액 이행여부를 확인합니다.',() => {
    var count = 0;
    var available_money = 10000;
    var used_money = 8000;

    if (available_money >= used_money){
        count = count + 1;
    }
    expect(1).toEqual(count);
});

test('1일이 되면 모든 계획서의 state를 0으로 초기화합니다.',() => {
    var states = [
        {num : 1, state : 0},
        {num : 2, state : 0},
        {num : 3, state : 1},
        {num : 4, state : 0},
        {num : 5, state : 1},
    ];
    states.map(item => {
        if (item.state == 1) {
            item.state = 0;
        }
    })
    const result = states.map(state => state.state);

    expect(result).not.toContain(1);
});

test('1일이 되면 모든 사용자의 권장금액 이행률을 0으로 초기화합니다.',() => {
    var counts = [
        {user : "짱구", count : 27},
        {user : "철수", count : 12},
        {user : "훈이", count : 18},
        {user : "유리", count : 22},
        {user : "맹구", count : 30},
    ];
    var status = true;
    counts.map(item => item.count = 0)
    const result = counts.map(count => count.count);
    result.map(test => {
        if(test != 0) status = false;
    })
    expect(status).toBeTruthy();
});

test('1일이 되면 티어와 포인트 정산이 이뤄집니다.',() => {
    var user = {
        name: "pyeonhee",
        tier: "SILVER",
        total_point: 2000,
        total_stamp: 37,
        count: 27,
    }
    var portion = (user.count/30)*100;
    if(portion > 75) {
        user.total_stamp = user.total_stamp + 4;
        if(user.total_stamp >= 40) user.tier = "GOLD";
    }
    if (user.tier === "GOLD") user.total_point = user.total_point + 1500;
    expect(user).toEqual({ name : "pyeonhee", tier: "GOLD", total_point: 3500, total_stamp: 41, count: 27 });
});