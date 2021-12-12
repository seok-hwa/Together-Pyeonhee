
test('소비성향 테스트를 진행 후 해당 점수로 소비성향을 부여받습니다.',() => {
    var first_type = 62;
    var second_type = 33;
    var third_type = 41;
    var fourth_type = 74;
    var mbti_type ='';
    var description = '';

    if(first_type > 50){
        mbti_type = mbti_type + 'I';
        description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
    } else {
        mbti_type = mbti_type + 'P';
        description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
    }

    if(second_type < 50){
        mbti_type = mbti_type + 'C';
        description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
    } else {
        mbti_type = mbti_type + 'H';
        description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
    }

    if(third_type < 50){
        mbti_type = mbti_type + 'S';
        description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
    } else {
        mbti_type = mbti_type + 'O';
        description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
    }
    
    if(fourth_type > 50){
        mbti_type = mbti_type + 'E';
        description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
    } else {
        mbti_type = mbti_type + 'M';
        description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
    }
    data = {
        mbti : mbti_type,
        description : description,
    }
    expect(data).toEqual({mbti : 'ICSE', description : '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. 수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. 종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. 소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. '});
});

test('한달리포트가 생성되면 실제 소비내역에 기반하여 새로운 소비성향을 제시합니다.',() => {
    var month_date = 31;
    var daily_count = 27;
    var portion = daily_count / month_date * 100;
    var incomeMoney = 2500000;
    var lifeMoney = 1000000;
    var savingMoney = 800000;
    var userMbti = '';
    var description = '';
    var shoppingMoney = 300000;
    var leisureMoney = 200000;
    var educationMoney = 100000;
    var eventMoney = 150000;

    // 즉흥 vs 계획
    if (portion < 70) {
        userMbti = userMbti + 'I';
        description = description + '당신은 계획적으로 사전에 생각하고 소비하기보다 필요에 맞춰서 그때그때 사용하는 편입니다. ';
    }
    else {
        userMbti = userMbti + 'P';
        description = description + '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. ';
    }
    // 절약 vs 소비
    if (incomeMoney >= 3500000) {
        if ((savingMoney * 0.6) > lifeMoney) {
            userMbti = userMbti + 'C';
            description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
        }
        else {
            userMbti = userMbti + 'H';
            description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
        }
    }
    else {
        if (savingMoney >= lifeMoney) {
            userMbti = userMbti + 'C';
            description = description + '수입이 생기면 저금보다 일단 필요한 부분에 있어서 소비하고 현재를 즐기는 것을 선호하시네요. ';
        }
        else {
            userMbti = userMbti + 'H';
            description = description + '수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. ';
        }
    }
    // 본인 vs 타인
    if ((shoppingMoney + leisureMoney + educationMoney) / 3 >= eventMoney * 1.2) {
        userMbti = userMbti + 'S';
        description = description + '종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. ';
    }
    else {
        userMbti = userMbti + 'O';
        description = description + '종종 친구들에게 해줄 선물들을 고르면서 좋아하는 반응을 보며 즐기시는 편이시네요. ';
    }
    // 경험 vs 물질
    if (leisureMoney >= shoppingMoney) {
        userMbti = userMbti + 'E';
        description = description + '소비를 크게 차지하는 부분은 쇼핑을 위주로 하기보다 취미나 사람들을 만나고 경험적인 일을 쌓는데 주로 사용하십니다. ';
    }
    else {
        userMbti = userMbti + 'M';
        description = description + '소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. ';
    }

    data = {
        mbti : userMbti,
        description : description,
    }

    expect(data).toEqual({mbti : 'PHSM', description : '당신은 소비하기전에 계획했던 범위에서 벗어나지 않도록 사전에 생각하고 사용하는 편입니다. 수입이 생기면 당장 필요한 것들을 소비하기보다 미래를 위해 저금을 해 모으는 것을 선호하십니다. 종종 본인 스스로에게 선물을 해주기도 하고 가끔 좋아하는 음식을 먹으며 스트레스를 푸시네요. 소비를 크게 차지하는 부분은 취미나 사람들을 만나는데 주로 사용하시기보다 기분전환을 위해 쇼핑을 하시는 것을 좋아하십니다. '});
});

