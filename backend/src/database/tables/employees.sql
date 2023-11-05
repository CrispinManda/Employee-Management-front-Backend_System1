
DROP TABLE Employees

-- select * from Employees

CREATE TABLE Employees (
    employee_id VARCHAR(100) NOT NULL ,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20) Default 'employee',
    welcomed BIT Default 0
) 

SELECT * FROM Employees WHERE email='emmanuel@gmail.com'
UPDATE Employees SET role = 'admin' WHERE email = 'emmanuel@gmail.com'
