create table user
(
    user_id   varchar(10) not null primary key,
    password varchar(15) not null,
    name varchar(12) not null,
    mbti varchar(4),
    age  int,
    tier varchar(10) default 'Bronze',
    income int,
    job varchar(10)
);

create table stamp (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references user (user_id)
);

create table point (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references user (user_id)
);

create table BudgetPlanning (
    user_id varchar(10) not null,  
    planning_number int not null auto_increment,
    planning_date timestamp default current_timestamp,
    user_mbti varchar(4) not null,
    user_age  int not null,
    user_income int not null,
    user_savings int not null,
    like_number int default 0,

    monthly_rent int not null,
    insurance_expense int not null,
    transportation_expense int not null,
    communication_expense int not null, 
    leisure_expense int not null,
    shopping_expense int not null,
    education_expense int not null,
    medical_expense int not null,
    event_expense int not null,
    etc_expense int not null,
    subscribe_expense int default 0,
    state int default 0,

    primary key (planning_number),
    foreign key (user_id) references user (user_id)
);
/*
create table Savings ( 
    user_id varchar(10) not null,
    planned_date datetime default current_timestamp,
    
    saving_number int not null,
    saving_name varchar(30) not null, 

    savings_money int not null,
    start_date datetime default current_timestamp,
    finish_date datetime,
    all_savings_money int not null,
    primary key (user_id),
    foreign key (user_id) references user (user_id)
);
*/
/*Savings Table 수정_211113*/
create table Savings ( 
    user_id varchar(10) not null,
    planned_date datetime default current_timestamp,
    
    saving_number int not null auto_increment,
    saving_name varchar(30) not null, 

    savings_money int not null,
    start_date date default current_timestamp,
    finish_date date default current_timestamp,
    all_savings_money int default 0,
    primary key (saving_number),
    foreign key (user_id) references user (user_id)
);

create table Storage (
    user_id varchar(10) not null,
    planning_number int not null,

    primary key (user_id, planning_number),
    foreign key (user_id) references user (user_id)

);

/*
create table RealExpense (
    user_id varchar(10) not null,  
    excute_date date default current_date,
    real_savings int not null,
    real_fixed_expense int not null,
    real_planned_expense int not null,
    rest_money int not null,
​
    real_monthly_rent int not null,
    real_insurance_expense int not null,
    real_transportation_expense int not null,
    real_communication_cost int not null,    -- 통일 안할건가
    real_leisure_expense int not null,
    real_shopping_expense int not null,
    real_education_expense int not null,
    real_medical_expense int not null,
    real_event_expense int not null,
    real_etc_expense int not null,
​
    primary key (user_id),
    foreign key (user_id) references pyeonhee.user (id)
);
*/
/*
create table BankAddress (
    user_id varchar(10) not null,
    bank_address int not null, 
    bank_name varchar(12) not null,
    primary key (user_id),
    foreign key (user_id) references user (user_id)
);
*/
create table FinancialProduct (
    product_name varchar(12) not null,
    product_type varchar(10) not null,
    recommend_mbti varchar(4) not null,
    recommend_age int not null,
    product_description varchar(150) not null,

    primary key (product_name)
);

create table Consultation (
    consult_number int not null,
    counselor_name varchar(10) not null,
    consult_title varchar(10) not null,
    consult_part varchar(10) not null,
    consult_price int not null,

    primary key (consult_number)
);

create table Reservation (
    consult_number int not null,
    user_id varchar(10) not null,
    consult_date date,
    checked boolean default false,

    primary key (consult_number),
    foreign key (user_id) references user (user_id)
);
/*
insert into pyeonhee.user(id, name, mbti, age)
values ('abcd', 'john', 'ENTJ', '10');
*/

/*
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '1');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '2');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '3');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 2, '4');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', -1, '5');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', -2, '6');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 3, '7');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '8');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', -5, '9');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 2, '10');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '11');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', -1, '12');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 1, '13');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', 2, '14');
insert into pyeonhee.stamp(user_id, diff, description)
values ('abcd', -3, '15');

select *
from stamp;

select sum(diff) as current_stamp_count
from stamp
where user_id = 'abcd';
*/
/*
create table bank
(
    seq  int  not null primary key auto_increment comment '은행 고유번호',
    name text not null comment '은행 이름'
);

insert into bank(name)
values ('농협 중앙회'),
       ('신한은행'),
       ('국민은행'),
       ('카카오뱅크'),
       ('토스뱅크'),
       ('케이뱅크');

# (구) bankAddress
create table bank_account
(
    user_id    varchar(10) not null,
    bank       int         not null comment '은행 고유 번호',
    address_no varchar(50) not null comment '계좌번호',
    alias      text        not null comment '사용자 별명',
    primary key (user_id, bank, address_no)
);
*/
/*
insert into bank_account
values ('abcd', 1, '1000000', '월급통장'),
       ('abcd', 2, '200000', '생활비 통장');
*/

create table expense_type
(
    seq         int  not null auto_increment primary key,
    description text not null
);

insert into expense_type(description)
values ('저금'),
       ('월세'),
       ('보험비'),
       ('교통비'),
       ('통신비'),
       ('문화'),
       ('쇼핑'),
       ('교육'),
       ('경조사'),
       ('기타');
/*
insert into income_type(description)
values ('월급'),
       ('용돈');
*/

/*
create table real_expense
(
    user_id      varchar(10) not null,
    expense_date timestamp   default current_timestamp,
    bank         int         not null,
    address_no varchar(50) not null,
    amount       int         not null,
    expense_type int         not null,
    description text not null,
    primary key (user_id, expense_date, bank),
    foreign key (user_id,bank,address_no) references bank_account(user_id,bank,address_no)
);
*/

create table daily_data 
(
    user_id varchar(10) not null,
    available_money int not null,
    daily_spent_money int not null,

    rest_money int not null,

    primary key (user_id),
    foreign key (user_id) references user(user_id)
);


/*
insert into real_expense(user_id, bank,address_no, amount, expense_type, description)
values ('abcd', 1, 1000000,100000, 10, '1');
insert into real_expense(user_id, bank, address_no,amount, expense_type, description)
values ('abcd', 2, 200000, 5000, 1, '1');
insert into real_expense(user_id, bank, address_no, amount, expense_type, description)
values ('abcd', 1, 1000000,-100, 2, '1');
insert into real_expense(user_id, bank, address_no, amount, expense_type, description)
values ('abcd', 1, 1000000,-5000, 3, '1');
insert into real_expense(user_id, bank, address_no,amount, expense_type, description)
values ('abcd', 1, 1000000,-3000, 4, '1');
insert into real_expense(user_id, bank, address_no, amount, expense_type, description)
values ('abcd', 1, 1000000,1000, 5, '1');
insert into real_expense(user_id, bank, address_no, amount, expense_type, description)
values ('abcd', 1, 1000000, -1000, 6, '1');
*/

/*
select sum(amount) as balance
from real_expense
where user_id = abcd
  and bank = ${bank}
  and address_no = ${address_no};
*/
/*
select sum(amount) as balance
from real_expense
where user_id = 'abcd'
  and bank = 1
  and address_no = 1000000;
  */

  create table LikeCount (
    user_id varchar(10) not null,
    planning_number int not null,
    like_check int default 1,

    primary key (user_id, planning_number),
    foreign key (user_id) references user (user_id),
    foreign key (planning_number) references BudgetPlanning (planning_number)
);

create table openBankingUser (
    user_id varchar(10) not null,
    access_token varchar(300) not null,
    user_seq_no varchar(10) not null,
    primary key (user_id, user_seq_no),
    foreign key (user_id) references user (user_id)
);

/*21 11 19 수정*/
/*기존 bank, bank_account, real_expense, bankAddress 테이블 삭제*/
/*real_expense 테이블 다시 생성하기*/
create table bank_account
(
    user_id    varchar(10) not null,
    fintech_use_num varchar(25) not null,
    account_alias varchar(20) not null, 
    bank_code_std varchar(4) not null,
    bank_name varchar(10) not null,
    account_num_masked varchar(20) not null,
    account_holder_name varchar(5) not null,
    primary key (user_id, fintech_use_num),
    foreign key (user_id) references user (user_id)
);

/*21 11 20 수정*/
/*real_expense 테이블 생성*/
create table real_expense
(
    user_id      varchar(10) not null,
    fintech_use_num varchar(25) not null,
    bank_name varchar(10) not null,
    balance_amt int default 0,
    tran_date date not null,
    tran_time time not null,
    inout_type varchar(2) not null,
    tran_type varchar(10) not null,
    print_content varchar(20) not null,
    tran_amt int not null,
    after_balance_amt int not null,
    branch_name varchar(10) not null,
    state int default 0,
    primary key (user_id, fintech_use_num, tran_date, tran_time),
    foreign key (user_id, fintech_use_num) references bank_account(user_id, fintech_use_num)
);

-- 신규 데이터 생성 (2021/11/21)
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user1', '1234', 'user1', 'ICSE', '25', 'GOLD', 1500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user2', '1234', 'user2', 'ICSE', '27', 'SILVER', 2500000, 'teacher');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user3', '1234', 'user3', 'ICSE', '23', 'BROZE', 3500000, 'office');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user4', '1234', 'user4', 'ICSM', '21', 'GOLD', 1000000'student');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user5', '1234', 'user5', 'ICSM', '24', 'SILVER', 1500000, 'office');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user6', '1234', 'user6', 'ICSM', '25', 'PLATINUM', 3500000, 'selfEmployment');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user7', '1234', 'user7', 'ICOE', '26', 'PLATINUM', 2500000, 'executive');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user8', '1234', 'user8', 'ICOE', '29', 'GOLD', 4500000, 'service');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user9', '1234', 'user9', 'ICOE', '25', 'SILVER', 1500000, 'housewife');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user10', '1234', 'user0', 'ICOM', '20', 'GOLD', 1500000, 'student');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user11', '1234', 'user11', 'ICOM', '21', 'SILVER', 2500000, 'service');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user12', '1234', 'user12', 'ICOM', '27', 'GOLD', 4500000, 'profession');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user13', '1234', 'user13', 'IHSE', '28', 'SILVER', 1500000, 'sales');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user14', '1234', 'user14', 'IHSE', '24', 'GOLD', 3500000, 'agriculture');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user15', '1234', 'user15', 'IHSE', '21', 'BROZE', 1500000, 'student');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user16', '1234', 'user16', 'IHSM', '23', 'SILVER', 3500000, 'office');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user17', '1234', 'user17', 'IHSM', '24', 'BROZE', 3500000, 'executive');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user18', '1234', 'user18', 'IHSM', '25', 'GOLD', 2500000, 'sales');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user19', '1234', 'user19', 'IHOE', '27', 'BROZE', 3500000, 'teacher');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user20', '1234', 'user20', 'IHOE', '25', 'GOLD', 1500000, 'selfEmployment');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user21', '1234', 'user21', 'IHOE', '28', 'PLATINUM', 3500000, 'office');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user22', '1234', 'user22', 'IHOM', '23', 'GOLD', 1500000, 'student');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user23', '1234', 'user23', 'IHOM', '22', 'PLATINUM', 1500000, 'housewife');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user24', '1234', 'user24', 'IHOM', '26', 'SILVER', 3500000, 'service');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user25', '1234', 'user25', 'PCSE', '25', 'GOLD', 5500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user26', '1234', 'user26', 'PCSE', '25', 'SILVER', 1500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user27', '1234', 'user27', 'PCSE', '25', 'DIAMOND', 1500000, 'profession');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user28', '1234', 'user28', 'PCSM', '27', 'BRONZE', 2500000, 'agriculture');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user29', '1234', 'user29', 'PCSM', '25', 'BRONZE', 1500000, 'agriculture');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user30', '1234', 'user30', 'PCSM', '25', 'GOLD', 1500000, 'inoccupation');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user31', '1234', 'user31', 'PCOE', '25', 'GOLD', 1500000, 'selfEmployment');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user32', '1234', 'user32', 'PCOE', '27', 'SILVER', 3500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user33', '1234', 'user33', 'PCOE', '25', 'GOLD', 1500000, 'housewife');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user34', '1234', 'user34', 'PCOM', '25', 'BRONZE', 1500000, 'housewife');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user35', '1234', 'user35', 'PCOM', '29', 'SILVER', 4500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user36', '1234', 'user36', 'PCOM', '25', 'BRONZE', 1500000, 'housewife');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user37', '1234', 'user37', 'PHSE', '27', 'GOLD', 5500000, 'selfEmployment');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user38', '1234', 'user38', 'PHSE', '25', 'SILVER', 1500000, 'craftsman');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user39', '1234', 'user39', 'PHSE', '25', 'GOLD', 1500000, 'profession');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user40', '1234', 'user40', 'PHSM', '27', 'PLATINUM', 5500000, 'agriculture');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user41', '1234', 'user41', 'PHSM', '27', 'PLATINUM', 1500000, 'student');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user42', '1234', 'user42', 'PHSM', '25', 'SILVER', 1500000, 'retirement');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user43', '1234', 'user43', 'PHOE', '25', 'GOLD', 1500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user44', '1234', 'user44', 'PHOE', '25', 'SILVER', 1500000, 'sales');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user45', '1234', 'user45', 'PHOE', '25', 'GOLD', 1500000, 'craftsman');

insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user46', '1234', 'user46', 'PHOM', '25', 'PLATINUM', 2500000, 'profession');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user47', '1234', 'user47', 'PHOM', '25', 'SILVER', 2500000, 'production');
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user48', '1234', 'user48', 'PHOM', '25', 'SILVER', 2500000, 'retirement');

-- 추천목록
-- 즉흥적이고 소비형이며 본인 경험적
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user49', '1234', 'user49', 'ICSE', '25', 'DIAMOND', 3500000, 'executive');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user49', 'ICSE', '25', 496, 3500000, 500000, 600000, 100000, 150000, 100000, 500000, 500000, 0, 0, 0, 100000, 100000);

-- 즉흥 절약 본인 경험
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user50', '1234', 'user50', 'IHSE', '27', 'DIAMOND', 2500000, 'office');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user50', 'IHSE', '27', 511, 2900000, 130000, 0, 50000, 100000, 70000, 300000, 200000, 0, 0, 50000, 0, 50000);

-- 즉흥 소비 타인 물질
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user51', '1234', 'user51', 'ICOM', '23', 'DIAMOND', 2500000, 'service');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user51', 'ICOE', '27', 647, 2700000, 700000, 0, 100000, 100000, 0, 300000, 500000, 0, 0, 200000, 0, 50000);

-- 즉흥 절약 타인 경험
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user52', '1234', 'user52', 'IHOE', '21', 'DIAMOND', 1500000, 'student');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user52', 'IHOE', '21', 623, 1300000, 200000, 0, 0, 70000, 0, 300000, 0, 0, 0, 150000, 0, 50000);

-- 즉흥 절약 타인 물질
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user53', '1234', 'user53', 'IHOM', '29', 'PLATINUM', 4500000, 'profession');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user53', 'IHOM', '29', 372, 4800000, 2000000, 500000, 100000, 70000, 100000, 300000, 500000, 0, 0, 300000, 0, 100000);

-- 계획 소비 본인 경험 
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user54', '1234', 'user54', 'PCSE', '25', 'DIAMOND', 3500000, 'executive');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user54', 'PCSE', '25', 455, 3400000, 500000, 600000, 100000, 150000, 100000, 500000, 500000, 300000, 0, 0, 100000, 100000);

-- 계획 절약 타인 경험
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user55', '1234', 'user55', 'PHOE', '24', 'DIAMOND', 3500000, 'craftsman');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user55', 'PHOE', '24', 512, 3200000, 1400000, 600000, 50000, 100000, 50000, 200000, 100000, 0, 0, 150000, 0, 50000);

-- 계획 절약 본인 경험
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user56', '1234', 'user56', 'PHSE', '23', 'DIAMOND', 2500000, 'sales');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user56', 'PHSE', '23', 572, 2400000, 1000000, 400000, 50000, 100000, 50000, 200000, 0, 0, 0, 50000, 0, 50000);

-- 계획 소비 타인 물질
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user57', '1234', 'user57', 'PCOM', '21', 'DIAMOND', 1500000, 'student');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user57', 'IHOE', '21', 482, 1200000, 200000, 0, 100000, 0, 100000, 300000, 0, 0, 0, 100000, 0, 0);

-- 계획 절약 본잍 물질
insert into user(user_id, password, name, mbti, age, tier, income, job)
values ('user58', '1234', 'user58', 'PHSM', '29', 'PLATINUM', 4500000, 'profession');
insert into BudgetPlanning(user_id, user_mbti, user_age, like_number, user_income, user_savings, 
monthly_rent, insurance_expense, transportation_expense, communication_expense, leisure_expense,
shopping_expense, education_expense, medical_expense, event_expense, etc_expense, subscribe_expense)
values ('user58', 'PHSM', '29', 452, 4500000, 2200000, 500000, 100000, 100000, 100000, 300000, 500000, 0, 0, 100000, 0, 100000);
