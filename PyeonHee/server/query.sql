create schema pyeonhee;
use pyeonhee;

create table user
(
    user_id   varchar(10) not null primary key,
    password varchar(15) not null,
    name varchar(12) not null,
    mbti varchar(4),
    age  int         not null,
    tier varchar(10)
);

insert into pyeonhee.user(id, password, name, mbti, age, tier)
values ('abcd', '1234','john', 'ICSE', 20, 'Bronze');
insert into pyeonhee.user(id, password, name, mbti, age, tier)
values ('efgh', '1234','james', 'PHOM', 23, 'Bronze');
insert into pyeonhee.user(id, password, name, mbti, age, tier)
values ('pyeonhee', '1234','편히가계', 'PCSE', 26, 'Bronze');

insert into pyeonhee.BudgetPlanning(user_id, planned_date, planning_number,
            user_mbti, user_income, user_savings, like_number, monthly_rent,
            insurance_expense,transportation_expense,communication_expense,
            leisure_expense, shopping_expense ,education_expense, medical_expense,
            event_expense, etc_expense)
values ('abcd', now(), 1, 'ICSE', 3000000, 1000000, 12, 500000, 150000, 200000, 100000,
        200000, 200000, 0, 0, 150000, 0);
insert into pyeonhee.BudgetPlanning(user_id, planned_date, planning_number,
            user_mbti, user_income, user_savings, like_number, monthly_rent,
            insurance_expense,transportation_expense,communication_expense,
            leisure_expense, shopping_expense ,education_expense, medical_expense,
            event_expense, etc_expense)
values ('efgh', now(), 2, 'PHOM', 2500000, 800000, 12, 400000, 100000, 150000, 100000,
        150000, 200000, 0, 0, 150000, 0);

create table stamp (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references pyeonhee.user (id)
);

create table point (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references pyeonhee.user (id)
);

create table BudgetPlanning (
    user_id varchar(10) not null,  
    planned_date datetime default current_timestamp,
    planning_number int not null,
    user_mbti varchar(4) not null,
    user_income int not null,
    user_savings int not null,
    like_number int not null,

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

    primary key (user_id,planning_number),
    foreign key (user_id) references pyeonhee.user (id)
);

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
    foreign key (user_id) references pyeonhee.user (id)
);

create table Storage (
    user_id varchar(10) not null,
    planning_number int not null,

    primary key (user_id, planning_number),
    foreign key (user_id) references pyeonhee.user (id)

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

create table BankAddress (
    user_id varchar(10) not null,
    bank_address int not null, 
    bank_name varchar(12) not null,
    primary key (user_id),
    foreign key (user_id) references pyeonhee.user (id)
);
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
    foreign key (user_id) references pyeonhee.user (id)
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

insert into bank_account
values ('abcd', 1, '1000000', '월급통장'),
       ('abcd', 2, '200000', '생활비 통장');

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

create table daily_data 
(
    user_id varchar(10) not null,
    available_money int not null,
    daily_spent_money int not null,

    rest_money int not null,

    primary key (user_id),
    foreign key (user_id) references pyeonhee.user(id)
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