create table pyeonhee.user
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

create table pyeonhee.stamp (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);

create table pyeonhee.point (
    user_id varchar(10) not null,
    record_time timestamp default current_timestamp,
    diff int not null,
    description text,
    primary key (user_id,record_time),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);

create table pyeonhee.BudgetPlanning (
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
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);


create table pyeonhee.Savings ( 
    user_id varchar(10) not null,
    planned_date datetime default current_timestamp,
    
    saving_number int not null auto_increment,
    saving_name varchar(30) not null, 

    savings_money int not null,
    start_date datetime default current_timestamp,
    finish_date datetime default current_timestamp,
    all_savings_money int default 0,
    primary key (saving_number),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);

create table pyeonhee.Storage (
    user_id varchar(10) not null,
    planning_number int not null,

    primary key (user_id, planning_number),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade

);

create table pyeonhee.FinancialProduct (
    product_name varchar(12) not null,
    product_type varchar(10) not null,
    recommend_mbti varchar(4) not null,
    recommend_age int not null,
    product_description varchar(150) not null,

    primary key (product_name)
);

create table pyeonhee.Consultation (
    consult_number int not null,
    counselor_name varchar(10) not null,
    consult_title varchar(10) not null,
    consult_part varchar(10) not null,
    consult_price int not null,

    primary key (consult_number)
);

create table pyeonhee.Reservation (
    consult_number int not null,
    user_id varchar(10) not null,
    consult_date date,
    checked boolean default false,

    primary key (consult_number),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);

create table pyeonhee.daily_data 
(
    user_id varchar(10) not null,
    available_money int not null,
    daily_spent_money int not null,

    rest_money int not null,
    daily_count int default 0,
    last_count int default 0,

    primary key (user_id),
    foreign key (user_id) references pyeonhee.user(user_id) on delete cascade
);

create table pyeonhee.LikeCount (
    user_id varchar(10) not null,
    planning_number int not null,
    like_check int default 1,

    primary key (user_id, planning_number),
    foreign key (user_id) references pyeonhee.user (user_id),
    foreign key (planning_number) references pyeonhee.BudgetPlanning (planning_number) on delete cascade
);

create table pyeonhee.openBankingUser (
    user_id varchar(10) not null,
    access_token varchar(300) not null,
    user_seq_no varchar(10) not null,
    primary key (user_id),
    foreign key (user_id) references pyeonhee.user (user_id)
);

create table pyeonhee.bank_account
(
    user_id    varchar(10) not null,
    fintech_use_num varchar(25) not null,
    account_alias varchar(20) not null, 
    bank_code_std varchar(4) not null,
    bank_name varchar(10) not null,
    account_num_masked varchar(20) not null,
    account_holder_name varchar(5) not null,
    primary key (user_id, fintech_use_num),
    foreign key (user_id) references pyeonhee.openBankingUser (user_id) on delete cascade
);

create table pyeonhee.real_expense
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
    foreign key (user_id, fintech_use_num) references pyeonhee.bank_account(user_id, fintech_use_num) on delete cascade
);

/*관리자페이지_21 11 27 생성*/
create table pyeonhee.admin
(
    admin_id   varchar(10) not null primary key,
    password varchar(300) not null,
    name varchar(12) not null
);

/*게시판*/
create table pyeonhee.board
(
    board_number int not null auto_increment,
    category varchar(10) not null,
    title varchar(50) not null,
    content text not null,
    user_id varchar(10) not null,
    board_date timestamp default current_timestamp,
    comment_check int default 0,
    primary key (board_number),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);

/*게시판 댓글 (관리자용)*/
create table pyeonhee.comment
(
    comment_number int not null auto_increment,
    board_number int not null,
    content text not null,
    /*user_id varchar(10) not null,*/
    comment_date timestamp default current_timestamp,
    primary key (comment_number),
    /*foreign key (user_id) references user (user_id) on delete cascade,*/
    foreign key (board_number) references pyeonhee.board (board_number) on delete cascade on update cascade
);

/*공지사항*/
create table pyeonhee.notice
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
create table pyeonhee.saving_product
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

create table pyeonhee.fund_product
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

create table pyeonhee.pension_product
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

create table pyeonhee.loan_product
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


/*예산계획 추가열람*/
create table pyeonhee.OpenCount (
    user_id varchar(10) not null,
    planning_number int not null,
    open_check int default 1,

    primary key (user_id, planning_number),
    foreign key (user_id) references pyeonhee.user (user_id) on delete cascade,
    foreign key (planning_number) references pyeonhee.BudgetPlanning (planning_number) on delete cascade
);

/*상담사 테이블*/

create table pyeonhee.FinancialCounselor (
    name varchar(12) not null,
    counselor_id int not null primary key,
    part varchar(12) not null,
    company varchar(16) not null,
    like_count int default 0
);

ALTER TABLE pyeonhee.FinancialCounselor MODIFY counselor_id int not null auto_increment;
ALTER TABLE pyeonhee.FinancialCounselor auto_increment =10000;

create table pyeonhee.AssetCounselor (
    name varchar(12) not null,
    counselor_id int not null primary key,
    company varchar(16) not null,
    like_count int default 0
);

ALTER TABLE pyeonhee.AssetCounselor MODIFY counselor_id int not null auto_increment;
ALTER TABLE pyeonhee.AssetCounselor auto_increment =20000;

/*
CREATE TABLE pyeonhee.Monthly_Report (
	user_id varchar(10) not null,
	report_month varchar(11) not null,
	mbti varchar(4),

	progress_days int default 0,

	realCommunication int default 0,
	realDinner int default 0, 
	realEducation int default 0, 
	realEvent int default 0, 
	realHobby int default 0,
	realInsurance int default 0, 
	realMedical int default 0, 
	realRent int default 0, 
	realSaving int default 0, 
	realShopping int default 0, 
	realSubscribe int default 0, 
	realTraffic int default 0, 
	realEct int default 0,

	primary key (user_id, report_month),
	foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
);
*/

CREATE TABLE pyeonhee.Monthly_Report (
	user_id varchar(10) not null,
	report_month varchar(11) not null,
	mbti varchar(4),
	progress_days int default 0,

	income int not null,

	realCommunication int default 0,
	realDinner int default 0, 
	realEducation int default 0, 
	realEvent int default 0, 
	realHobby int default 0,
	realInsurance int default 0, 
	realMedical int default 0, 
	realRent int default 0, 
	realSaving int default 0, 
	realShopping int default 0, 
	realSubscribe int default 0, 
	realTraffic int default 0, 
	realEct int default 0,

	primary key (user_id, report_month),
	foreign key (user_id) references pyeonhee.user (user_id) on delete cascade
	);

INSERT INTO Monthly_Report(user_id,report_month,mbti, progress_days,income,realCommunication,
realDinner,realEducation,realEvent,realHobby,realInsurance,realMedical,realRent,realSaving,realShopping,realSubscribe,realTraffic,realEct)
VALUES ('jykim123', 202111, 'PHSE', 26, 2500000, 138000,717700,0,230000,190000,0,0,500000,1050000,5271000,100000,326800,840000);

INSERT INTO Monthly_Report(user_id,report_month,mbti, progress_days, income,realCommunication,
realDinner,realEducation,realEvent,realHobby,realInsurance,realMedical,realRent,realSaving,realShopping,realSubscribe,realTraffic,realEct)
VALUES ('jykim123', 202110, 'PHOM', 26, 2500000, 100000,400000,0,100000,300000,0,0,500000,500000,300000,100000,200000,0);