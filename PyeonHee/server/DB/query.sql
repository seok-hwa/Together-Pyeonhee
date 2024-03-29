create table user
(
    user_id   varchar(10) not null primary key,
    password varchar(300) not null,
    name varchar(12) not null,
    mbti varchar(4),
    age  int,
    tier varchar(10) default 'BRONZE',
    income int,
    job varchar(20),
    deviceToken varchar(300),
    total_stamp int default 0,
    total_point int default 2000,
    phone varchar(11) default '01012345678',
    state int default 0
);

create table stamp (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references user (user_id) on delete cascade
);

create table point (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references user (user_id) on delete cascade
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
    foreign key (user_id) references user (user_id) on delete cascade
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
    start_date datetime default current_timestamp,
    finish_date datetime default current_timestamp,
    all_savings_money int default 0,
    primary key (saving_number),
    foreign key (user_id) references user (user_id) on delete cascade
);

create table Storage (
    user_id varchar(10) not null,
    planning_number int not null,

    primary key (user_id, planning_number),
    foreign key (user_id) references user (user_id) on delete cascade

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
    foreign key (user_id) references user (user_id) on delete cascade
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

/*
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
    daily_count int default 0,
    last_count int default 0,

    primary key (user_id),
    foreign key (user_id) references user(user_id) on delete cascade
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
    foreign key (planning_number) references BudgetPlanning (planning_number) on delete cascade
);

create table openBankingUser (
    user_id varchar(10) not null,
    access_token varchar(300) not null,
    user_seq_no varchar(10) not null,
    primary key (user_id),
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
    foreign key (user_id) references openBankingUser (user_id) on delete cascade
);

/*21 11 20 수정*/
/*real_expense 테이블 생성*/
create table real_expense
(
    user_id      varchar(10) not null,
    fintech_use_num varchar(25) not null,
    bank_name varchar(10) not null,
    balance_amt int default 0,
    tran_date varchar(11) not null,
    tran_time time not null,
    inout_type varchar(2) not null,
    tran_type varchar(10) not null,
    print_content varchar(20) not null,
    tran_amt int not null,
    after_balance_amt int not null,
    branch_name varchar(10) not null,
    state int default 0,
    alarm int default 0,
    primary key (user_id, fintech_use_num, tran_date, tran_time),
    foreign key (user_id, fintech_use_num) references bank_account(user_id, fintech_use_num) on delete cascade
);

/*관리자페이지_21 11 27 생성*/
create table admin
(
    admin_id   varchar(10) not null primary key,
    password varchar(300) not null,
    name varchar(12) not null
);

/*게시판*/
create table board
(
    board_number int not null auto_increment,
    category varchar(10) not null,
    title varchar(50) not null,
    content text not null,
    user_id varchar(10) not null,
    board_date timestamp default current_timestamp,
    comment_check int default 0,
    primary key (board_number),
    foreign key (user_id) references user (user_id) on delete cascade
);

/*게시판 댓글 (관리자용)*/
create table comment
(
    comment_number int not null auto_increment,
    board_number int not null,
    content text not null,
    /*user_id varchar(10) not null,*/
    comment_date timestamp default current_timestamp,
    primary key (comment_number),
    /*foreign key (user_id) references user (user_id) on delete cascade,*/
    foreign key (board_number) references board (board_number) on delete cascade on update cascade
);

/*공지사항*/
create table notice
(
    notice_number int not null auto_increment,
    category varchar(10) not null,
    title varchar(50) not null,
    content text not null,
    notice_date timestamp default current_timestamp,
    modified_date timestamp default current_timestamp,
    primary key (notice_number)
);


/*금융상품 테이블*/

create table saving_product
(
    saving_number int not null auto_increment,
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    product_type varchar(10) not null,
    interest float(4,2) not null,
    max_interest float(4,2) not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (saving_number)
);

create table fund_product
(
    fund_number int not null auto_increment,
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    interest_3 float(4,2) not null,
    interest_6 float(4,2) not null,
    interest_12 float(4,2) not null,
    fund_sum int not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (fund_number)
);

create table pension_product
(
    pension_number int not null auto_increment,
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    product_type varchar(10) not null,
    disconnected varchar(3) not null,
    interest float(4,2) not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (pension_number)
);

create table loan_product
(
    loan_number int not null auto_increment,
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    interest_type varchar(10) not null,
    repay_type varchar(10),
    interest float(4,2) not null,
    link varchar(200) not null,
    primary key (loan_number)
);


/*
create table saving_product
(
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    product_type varchar(10) not null,
    interest float(4,2) not null,
    max_interest float(4,2) not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (product_name)
);

create table fund_product
(
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    interest_3 float(4,2) not null,
    interest_6 float(4,2) not null,
    interest_12 float(4,2) not null,
    fund_sum int not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (product_name)
);

create table pension_product
(
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    product_type varchar(10) not null,
    disconnected varchar(3) not null,
    interest float(4,2) not null,
    link varchar(200) not null,
    mbti varchar(1) not null,
    primary key (product_name)
);

//primary key(bank_name, product_name) 으로 변경
create table loan_product
(
    bank_name varchar(20) not null,
    product_name varchar(20) not null,
    interest_type varchar(10) not null,
    repay_type varchar(10),
    interest float(4,2) not null,
    link varchar(200) not null,
    primary key (bank_name, product_name)
);
*/

/*예산계획 추가열람*/
create table OpenCount (
    user_id varchar(10) not null,
    planning_number int not null,
    open_check int default 1,

    primary key (user_id, planning_number),
    foreign key (user_id) references user (user_id),
    foreign key (planning_number) references BudgetPlanning (planning_number) on delete cascade
);

/*상담사 테이블*/

create table FinancialCounselor (
    name varchar(12) not null,
    counselor_id int not null primary key,
    part varchar(12) not null,
    company varchar(16) not null,
    like_count int default 0,
    email varchar(50) not null
);

ALTER TABLE FinancialCounselor MODIFY counselor_id int not null auto_increment;
ALTER TABLE FinancialCounselor auto_increment =10000;

create table AssetCounselor (
    name varchar(12) not null,
    counselor_id int not null primary key,
    company varchar(16) not null,
    like_count int default 0,
    email varchar(50) not null
);

ALTER TABLE AssetCounselor MODIFY counselor_id int not null auto_increment;
ALTER TABLE AssetCounselor auto_increment =20000;