CREATE OR ALTER PROCEDURE registerEmployee(
    @employee_id VARCHAR(100),
    @name VARCHAR(200),
    @email VARCHAR(300),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO Employees(employee_id, name, email, password)
    VALUES(@employee_id, @name, @email, @password)

END