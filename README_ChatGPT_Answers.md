# MySQL and Java SpringBoot with ChatGPT

Credits:
- ChatGPT: https://chat.openai.com/chat (Sunday, December 18, 2022)
- https://attacomsian.com/blog/spring-data-jpa-one-to-many-mapping

<br/>

## MySQL Tables

> Write the MySQL for creating Employees and Salaries tables with a one-to-many relationship.

Here is the MySQL code for creating the Employees and Salaries tables with a one-to-many relationship:

```sql
CREATE TABLE Employees (
  EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Phone VARCHAR(255) NOT NULL,
  HireDate DATE NOT NULL,
  JobTitle VARCHAR(255) NOT NULL
);

CREATE TABLE Salaries (
  SalaryID INT PRIMARY KEY AUTO_INCREMENT,
  EmployeeID INT NOT NULL,
  Amount DECIMAL(10,2) NOT NULL,
  StartDate DATE NOT NULL,
  EndDate DATE NOT NULL,
  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
```

This will create two tables: the Employees table and the Salaries table. The Employees table will have a primary key column called EmployeeID which will be an auto-incrementing integer. The Salaries table will have a primary key column called SalaryID which will also be an auto-incrementing integer.

The Salaries table will also have a foreign key column called EmployeeID which references the EmployeeID column in the Employees table. This establishes the one-to-many relationship between the two tables, with each employee potentially having multiple salary records in the Salaries table.

Note that this is just one way to structure the tables and define the relationship between them. There are many other ways to do it, depending on your specific requirements and needs.

<br/>

## Insert into tables

> Write the SQL to insert 2 entries to each table created

To insert 2 entries into the Employees and Salaries tables, you can use the following SQL statements:

```sql
INSERT INTO Employees (FirstName, LastName, Email, Phone, HireDate, JobTitle)
VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '2022-01-01', 'Manager'),
       ('Jane', 'Doe', 'jane.doe@example.com', '987-654-3210', '2022-01-01', 'Employee');

INSERT INTO Salaries (EmployeeID, Amount, StartDate, EndDate)
VALUES (1, 50000, '2022-01-01', '2022-12-31'),
       (1, 52000, '2023-01-01', '2023-12-31'),
       (2, 40000, '2022-01-01', '2022-12-31'),
       (2, 42000, '2023-01-01', '2023-12-31');
```

This will insert 2 employees into the Employees table, and 4 salary records into the Salaries table (2 salary records for each employee).

Note that in the Salaries table, the EmployeeID values must match the EmployeeID values in the Employees table in order to establish the correct relationship between the two tables.

<br/>

> Write the MySQL query to show all the salary of the first employee

To show all the salary records of the first employee in the Salaries table, you can use the following MySQL query:

```sql
SELECT * FROM Salaries WHERE EmployeeID = 1;
```

This query selects all columns (`*`) from the Salaries table and filters the results to only include salary records where the EmployeeID is 1.

This will return all the salary records for the first employee in the Salaries table.

Note that this query assumes that the EmployeeID column in the Salaries table is correctly referencing the EmployeeID column in the Employees table, and that the first employee has a unique EmployeeID value of 1. You may need to modify the query based on the actual structure and data in your tables.

<br/>

## Employee Model

> Write the SpringBoot Employee model

Here is an example of a SpringBoot Employee model that you can use to represent an employee in your application:

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Employee {
  @Id
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String hireDate;
  private String jobTitle;

  @OneToMany(mappedBy = "employee")
  private List<Salary> salaries;

  // Getters and setters for the fields
  // ...
}
```

This model uses the @Entity annotation to indicate that it represents a database entity. It also uses the @Id annotation to specify that the id field is the primary key of the entity.

The @OneToMany annotation is used to define the one-to-many relationship between the Employee and Salary entities. The mappedBy attribute specifies the field in the Salary entity that maps to the Employee entity.

The salaries field is a list of Salary objects that represents the salary records for this employee.

Note that this is just one way to define the model, and you may need to modify it based on your specific requirements and needs.

<br/>

## Salary Model

> Write the SpringBoot model for Salary

Here is an example of a SpringBoot model for the Salary entity:

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Salary {
  @Id
  private Long id;
  private Double amount;
  private String startDate;
  private String endDate;

  @ManyToOne
  private Employee employee;

  // Getters and setters for the fields
  // ...
}
```

This model uses the @Entity annotation to indicate that it represents a database entity. It also uses the @Id annotation to specify that the id field is the primary key of the entity.

The @ManyToOne annotation is used to define the many-to-one relationship between the Salary and Employee entities. The employee field represents the Employee object that this salary record belongs to.

Note that this is just one way to define the model, and you may need to modify it based on your specific requirements and needs.

<br/>

## Salary Repository

> Create the SpringBoot `SalaryRepo` class for Salary entity

Here is an example of a SpringBoot class for the SalaryRepository repository that you can use to perform database operations on the Salary entity:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaryRepository extends JpaRepository<Salary, Long> {
}
```

This class extends the JpaRepository interface, which provides a set of basic CRUD (create, read, update, delete) methods for the Salary entity.

By extending this interface, the SalaryRepository gains access to all of the CRUD methods, as well as additional methods for pagination, sorting, and more.

<br/>

## Salary Service

> Write the SpringBoot class SalaryService for Service entity

Here is an example of a SpringBoot class for the SalaryService service that you can use to perform operations on the Salary entity:

```java
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SalaryService {
  private final SalaryRepository salaryRepository;

  public SalaryService(SalaryRepository salaryRepository) {
    this.salaryRepository = salaryRepository;
  }

  public List<Salary> findAll() {
    return salaryRepository.findAll();
  }

  public Salary findById(Long id) {
    return salaryRepository.findById(id).orElse(null);
  }

  public Salary save(Salary salary) {
    return salaryRepository.save(salary);
  }

  public void deleteById(Long id) {
    salaryRepository.deleteById(id);
  }
}
```

This class is marked with the @Service annotation to indicate that it is a service bean in the Spring application context. It is also marked with the @Transactional annotation to indicate that it uses database transactions.

The SalaryService class has a constructor that injects a SalaryRepository instance, which is used to perform database operations on the Salary entity.

It defines methods for finding all salary records, finding a salary record by ID, saving a salary record, and deleting a salary record by ID. These methods use the SalaryRepository to perform the corresponding database operations.

<br/>

## Salary Resource

> Write the SpringBoot SalaryResource class

Here is an example of a SpringBoot class for the SalaryResource resource that you can use to expose a REST API for the Salary entity:

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/salaries")
public class SalaryResource {
  private final SalaryService salaryService;

  public SalaryResource(SalaryService salaryService) {
    this.salaryService = salaryService;
  }

  @GetMapping
  public List<Salary> findAll() {
    return salaryService.findAll();
  }

  @GetMapping("/{id}")
  public Salary findById(@PathVariable Long id) {
    return salaryService.findById(id);
  }

  @PostMapping
  public Salary save(@RequestBody Salary salary) {
    return salaryService.save(salary);
  }

  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable Long id) {
    salaryService.deleteById(id);
  }
}
```

This class is marked with the @RestController annotation to indicate that it is a controller bean that exposes a REST API. It is also marked with the @RequestMapping annotation to specify the base URL for the API.

The SalaryResource class has a constructor that injects a SalaryService instance, which is used to perform operations on the Salary entity.

It defines methods for handling HTTP GET, POST, and DELETE requests for the /api/salaries URL. These methods use the SalaryService to perform the corresponding operations on the Salary entity.

<br/>

## Project Folder Structure

> Write the project folder structure for the above java classes

Here is an example of a project folder structure for the above Java classes:

```
src/
  main/
    java/
      com.example/
        model/
          Employee.java
          Salary.java
        repository/
          SalaryRepository.java
        service/
          SalaryService.java
        resource/
          SalaryResource.java
```

In this structure, the model classes (Employee and Salary) are placed in the com.example.model package, the repository class (SalaryRepository) is placed in the com.example.repository package, the service class (SalaryService) is placed in the com.example.service package, and the resource class (SalaryResource) is placed in the com.example.resource package.

This is just one way to organize the classes in a project, and you may need to modify the package structure based on your specific requirements and needs.