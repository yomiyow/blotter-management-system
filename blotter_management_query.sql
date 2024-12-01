#-------------------------------------------------
# Creating Database Queries
#-------------------------------------------------
CREATE DATABASE blotter_db;
DROP DATABASE blotter_db;

CREATE TABLE complainant ( 
	complainant_id INT AUTO_INCREMENT,
    firstname VARCHAR(255),
    middlename VARCHAR(255),
    lastname VARCHAR(255),	
    nickname VARCHAR(255),
    age VARCHAR(255),
    gender VARCHAR(255),
    civil_status VARCHAR(255),
    citizenship VARCHAR(255),
    birthdate VARCHAR(255),
    birthplace VARCHAR(255),
    occupation VARCHAR(255),
    province VARCHAR(255),
    city VARCHAR(255),
    barangay VARCHAR(255), 
    house_no_street VARCHAR(255), 
    mobile_no VARCHAR(15),
    tel_no VARCHAR(15),
    email VARCHAR(100),
    
    PRIMARY KEY (complainant_id)
);
CREATE TABLE suspect (
	suspect_id INT AUTO_INCREMENT,
    firstname VARCHAR(255),
    middlename VARCHAR(255),
    lastname VARCHAR(255),	
    nickname VARCHAR(255),
    age VARCHAR(255),
    gender VARCHAR(255),
    civil_status VARCHAR(255),
    citizenship VARCHAR(255),
    birthdate VARCHAR(255),
    birthplace VARCHAR(255),
    occupation VARCHAR(255),
    province VARCHAR(255),
    city VARCHAR(255),
    barangay VARCHAR(255), 
    house_no_street VARCHAR(255), 
    mobile_no VARCHAR(15),
    tel_no VARCHAR(15),
    email VARCHAR(100),
    
    PRIMARY KEY (suspect_id)
);
CREATE TABLE blotter (
	blotter_id VARCHAR(255),
    street VARCHAR(255),
    barangay VARCHAR(255),
    date_time_reported VARCHAR(255),
    date_time_incident VARCHAR(255),
	narrative TEXT,
    category VARCHAR(255),
    `status` VARCHAR(255),
    
    PRIMARY KEY (blotter_id)
);
CREATE TABLE blotter_complainant ( 
	blotter_id VARCHAR(255),
    complainant_id INT,
    
    PRIMARY KEY (blotter_id, complainant_id),
    FOREIGN KEY (blotter_id) REFERENCES blotter(blotter_id) ON DELETE CASCADE,
    FOREIGN KEY (complainant_id) REFERENCES complainant(complainant_id)
);
CREATE TABLE blotter_suspect (
	blotter_id VARCHAR(255),
    suspect_id INT,
    
    PRIMARY KEY (blotter_id, suspect_id),
    FOREIGN KEY (blotter_id) REFERENCES blotter(blotter_id) ON DELETE CASCADE,
    FOREIGN KEY (suspect_id) REFERENCES suspect(suspect_id)
);
CREATE TABLE user (
    firstname VARCHAR(255),
    middlename VARCHAR(255),
    lastname VARCHAR(255),
    gender VARCHAR(255),
    birthdate VARCHAR(255),
    civil_status VARCHAR(255),
    address VARCHAR(255),
    email VARCHAR(255),
	contact_no VARCHAR(255),
    `password` VARCHAR(255),
    avatar_path VARCHAR(255),
    PRIMARY KEY (email)
);


INSERT INTO user ()
VALUES ('Romeo', 'Mercado', 'Quiñones', 'Male', '2003-02-21', 'Single', '300 Purok 5 Rueda, Plaridel, Bulacan', 'romeoquinones4@gmail.com', '09064316098', '2022100960Romeo');

USE blotter_db;

SELECT * FROM complainant;
SELECT * FROM suspect;
SELECT * FROM blotter;
SELECT * FROM blotter_complainant;
SELECT * FROM blotter_suspect;
SELECT * FROM `user`;
#-------------------------------------------------


#-------------------------------------------------
# Chart Data Queries
#-------------------------------------------------
-- Total Blotter Entries per Barangay
SELECT 
	barangay,
	COUNT(blotter_id) AS total_blotter
FROM blotter
GROUP by barangay;

--  Monthly Blotter Entries
SELECT 
  DATE_FORMAT(date_time_reported, '%Y-%m') AS month,
  COUNT(blotter_id) AS total_blotter
FROM blotter
GROUP BY month
ORDER BY month;

-- Age Distribution
SELECT 
  c.age,
  COUNT(*) AS total_complainants
FROM blotter_complainant bc
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id 
GROUP BY age
ORDER BY age;

SELECT 
  age,
  COUNT(*) AS total_suspects
FROM blotter_suspect bs
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id 
GROUP BY age
ORDER BY age;

-- Gender Distribution 
SELECT 
  gender,
  COUNT(*) AS total_complainants
FROM blotter_complainant bc
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id 
GROUP BY gender
ORDER BY gender;

SELECT 
  gender,
  COUNT(*) AS total_suspects
FROM blotter_suspect bs
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id 
GROUP BY gender
ORDER BY gender;
#-------------------------------------------------


#-------------------------------------------------
# Resetting database
#-------------------------------------------------
DELETE FROM blotter_suspect;
DELETE FROM blotter_complainant;
DELETE FROM blotter;
DELETE FROM suspect;
DELETE FROM complainant;
DELETE FROM user;

# off sql safe mode
SET SQL_SAFE_UPDATES = 0;

# reset primary key count
ALTER TABLE complainant AUTO_INCREMENT = 1;
ALTER TABLE suspect AUTO_INCREMENT = 1;
ALTER TABLE user AUTO_INCREMENT = 1;
#-------------------------------------------------


#---------------------------------------------------------------------------------------
# Dump Queries
#---------------------------------------------------------------------------------------
SELECT 
	b.blotter_id , 
    bc.date_time_reported, 
    CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
    CONCAT(s.firstname, ' ',s.middlename, ' ', s.lastname) AS suspect_fullname
FROM blotter b
INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id;

# Get Complete blotter record base on blotter_id

SELECT
	b.blotter_id,
    CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
	c.nickname AS complainant_nickname,
	c.age AS complainant_age,
	c.gender AS complainant_gender,
	c.civil_status AS complainant_civil_status,
	c.citizenship AS complainant_citizenship,
    c.birthdate AS complainant_birthdate,
	c.birthplace AS complainant_birthplace,
	c.occupation AS complainant_occupation,
    CONCAT(c.house_no_street, ' ', c.barangay, ' ', c.city, ' ', c.province) AS complainant_address,
	c.mobile_no AS complainant_mobile_no,
	c.tel_no AS complainant_tel_no,
	c.email AS complainant_email,
	CONCAT(s.firstname, ' ', s.middlename, ' ', s.lastname) AS suspect_fullname,
	s.nickname AS suspect_nickname,
	s.age AS suspect_age,
	s.gender AS suspect_gender,
	s.civil_status AS suspect_civil_status,
	s.citizenship AS suspect_citizenship,
	s.birthdate AS suspect_birthdate,
	s.birthplace AS suspect_birthplace,
	s.occupation AS suspect_occupation,
	CONCAT(s.house_no_street, ' ', s.barangay, ' ', s.city, ' ', s.province) AS suspect_address,
	s.mobile_no AS suspect_mobile_no,
	s.tel_no AS suspect_tel_no,
	s.email AS suspect_email,
    b.street,
	b.barangay,
	bc.date_time_reported,
	bc.date_time_incident,
    b.narrative
FROM blotter b
INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
WHERE b.blotter_id = '111524-477b77d298c';

UPDATE complainant
SET 
	firstname = ?, middlename = ?, lastname = ?, nickname = ?, age = ?,
	gender = ?, civil_status = ?, citizenship = ?, birthplace = ?, birthdate = ?, 
	occupation = ?, province = ?, city = ?, barangay = ?, house_no_street = ?, 
	mobile_no = ?, tel_no = ?, email = ?
WHERE complainant_id = (
	SELECT complainant_id
    FROM blotter_complainant
    WHERE blotter_id = ?
);

# Get today total blotter entries
SELECT COUNT(blotter_id) AS today_total_entries
FROM blotter_complainant
WHERE DATE(date_time_reported) = CURRENT_DATE();

SELECT COUNT(*) AS total_blotter_record
FROM blotter;

SELECT 
	YEAR(bc.date_time_reported) AS year,
	MONTH(bc.date_time_reported) AS month,
	COUNT(b.blotter_id) AS monthly_total_entries
FROM blotter b
INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
GROUP BY YEAR(bc.date_time_reported), MONTH(bc.date_time_reported);
-- ORDER BY YEAR(bc.date_time_reported), MONTH(bc.date_time_reported);

SELECT
	b.blotter_id ,
	bc.date_time_reported,
	CONCAT(c.firstname, ' ', c.middlename, ' ', c.lastname) AS complainant_fullname,
	CONCAT(s.firstname, ' ',s.middlename, ' ', s.lastname) AS suspect_fullname
FROM blotter b
INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
WHERE 
	b.blotter_id LIKE ? OR
	bc.date_time_reported LIKE ? OR 
	complainant_fullname LIKE ? OR
	suspect_fullname LIKE ?;
    
SELECT DATE_FORMAT(date_time_reported, '%b %e, %Y %l:%i %p') AS date_time_reported
FROM blotter_complainant;

USE blotter_db;

# Chart dataset

SELECT
	YEAR(date_time_reported) AS year,
	MONTH(date_time_reported) AS month,
	COUNT(blotter_id) AS monthly_cases
FROM blotter 
GROUP BY YEAR(date_time_reported), MONTH(date_time_reported)
ORDER BY  MONTH(date_time_reported);

SELECT
	YEAR(date_time_reported) AS year,
	MONTH(date_time_reported) AS month,
	COUNT(blotter_id) AS under_investigation
FROM blotter 
WHERE status = 'Under Investigation'
GROUP BY YEAR(date_time_reported), MONTH(date_time_reported);

SELECT
	YEAR(date_time_reported) AS year,
	MONTH(date_time_reported) AS month,
	COUNT(blotter_id) AS resolved
FROM blotter 
WHERE status = 'Resolved'
GROUP BY YEAR(date_time_reported), MONTH(date_time_reported);

SELECT
	COUNT(blotter_id) AS new_cases
FROM blotter
WHERE MONTH(date_time_reported) = MONTH(CURDATE());


SELECT * FROM blotter; 

SELECT
	c.firstname AS comFirstname,
	c.middlename AS comMiddlename,
	c.lastname AS comLastname,
	c.nickname AS comNickname,
	c.age AS comAge,
	c.gender AS comGender,
	c.civil_status AS comCivilStatus,
	c.citizenship AS comCitizenship,
	c.birthdate AS comBirthdate,
	c.birthplace AS comBirthplace,
	c.occupation AS comOccupation,
	c.province AS comProvince,
	c.city AS comCity,
	c.barangay AS comBarangay,
	c.house_no_street AS comHouseNoStreet,
	c.mobile_no AS comMobileNo,
	c.tel_no AS comTelNo,
	c.email AS comEmail,
	s.firstname AS susFirstname,
	s.middlename AS susMiddlename,
	s.lastname AS susLastname,
	s.nickname AS susNickname,
	s.age AS susAge,
	s.gender AS susGender,
	s.civil_status AS susCivilStatus,
	s.citizenship AS susCitizenship,
	s.birthdate AS susBirthdate,
	s.birthplace AS susBirthplace,
	s.occupation AS susOccupation,
	s.province AS susProvince,
	s.city AS susCity,
	s.barangay AS susBarangay,
	s.house_no_street AS susHouseNoStreet,
	s.mobile_no AS susMobileNo,
	s.tel_no AS susTelNo,
	s.email AS susEmail,
	b.blotter_id,
	b.street,
	b.barangay,
	b.narrative,
	DATE_FORMAT(b.date_time_reported, '%b %e, %Y at %l:%i %p') AS date_time_reported,
	b.date_time_incident,
	b.category,
	b.status
FROM blotter b
INNER JOIN blotter_complainant bc ON b.blotter_id = bc.blotter_id
INNER JOIN complainant c ON bc.complainant_id = c.complainant_id
INNER JOIN blotter_suspect bs ON b.blotter_id = bs.blotter_id
INNER JOIN suspect s ON bs.suspect_id = s.suspect_id
WHERE 
	(COALESCE('', '') = '' OR b.category = '') AND
    (COALESCE('New', '') = '' OR b.status = 'New');
#---------------------------------------------------------------------------------------