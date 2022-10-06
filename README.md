# Employee Manager App with Angular and SpringBoot Rest API

Employee Manager App that permits CRUD operations through Angular SPA that consumes a SpringBoot REST API connected to MySQL Database.

This project is based on [Spring Boot Full Stack with Angular App - Full Course 05-Feb-2021 - Amigoscode - 2h40m](https://youtu.be/Gx4iBLKLVHk) tutorial. The complete documentation for this project can be found here: [Spring Boot Full Stack with Angular Application - Full Course 05-Feb-2021 - Amigoscode](https://github.com/radualexandrub/Study/blob/master/SpringBoot/SpringBootWithAngularCourse.md).

<br/>

## SpringBoot REST API URLs:

- `http://localhost:8080/api/employees` - GET - `getAllEmployees()`

- `http://localhost:8080/api/employees/{id}` - GET - `getEmployeeById(@PathVariable("id") Long id)`

- `http://localhost:8080/api/employees/new` - POST - `addEmployee(@RequestBody Employee employee)`

- `http://localhost:8080/api/employees/update` - PUT - `updateEmployee(@RequestBody Employee employee)`

- `http://localhost:8080/api/employees/{id}` - DELETE - `deleteEmployee(@PathVariable("id") Long id)`

<br/>

## Install Dependencies & Run the App Locally

### Clone this repository

```bash
git clone https://github.com/radualexandrub/SpringBoot-Angular-EmployeeManagerApp SpringBoot_EmployeeManagerApp
```

### Configure MySQL

- First, start the MySQL Service:
    - In Windows, open the Start Menu, search and open "Services", manually find MySQL80 service -> Right click it -> Start
    - In Debian, run `sudo systemctl start mysql.service`

- Set up the root (or user) password for MySQL:
    - In Windows, you can set the root password during the MySQL installation process
    - In Debian, right after installing MySQL (`sudo apt install mysql-server`), you can run `sudo mysql_secure_installation` to run the MySQL Installation script (you can follow along [this tutorial from DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04))

- In SpringBoot app, go to `src/main/resources/application.properties` and set the `spring.datasource.password` to match the password set for MySQL

- Finally, create the `employeemanager` database:
    - You can create this database by opening MySQL Workbench GUI, log in, and run `create database employeemanager;` (or you can run this command from MySQL CLI in Windows)
    - In Debian, run `sudo su`, then `sudo mysql -u root -p` to login and access the MySQL CLI, then run `create database employeemanager;`

- Check the database with the following commands:
    - `show databases;`
    - `use employeemanager`
    - `show tables` (it should be empty if SpringBoot app was never ran)
    - `create database employeemanager;` (it should return error SpringBoot app was never ran)

### Install and Configure Java and Maven

- For x86 Windows:
    - (Recommended) You can download the JDK (Java Development Toolkit) separately from here: https://www.oracle.com/java/technologies/downloads/#jdk17-windows
    - Go to "System Properties" (Can be found on Control Panel > System and Security > System > Advanced System Settings)
    - Click on the "Environment variables" button under the "Advanced" tab
    - Then, select the "Path" variable in System variables and click on the "Edit" button
    - Click on the "New" button and add the path where Java is installed, followed by \bin. By default, Java is installed in `C:\Program Files\Java\jdk-11.0.1` (If nothing else was specified when you installed it). In that case, You will have to add a new path with: `C:\ProgramFiles\Java\jdk-11.0.1\bin` Then, click "OK", and save the settings
    - Restart PC
    - Open Command Prompt (cmd.exe) and type `java -version` to see if Java is running on your machine
    - Then, you can download and install Maven from here: https://maven.apache.org/download.cgi


- For x86 Debian based systems (Ubuntu, Zorin OS, KDE Neon, etc):
    - Run the following commands based on [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04)
        - `sudo apt install default-jre`
        - `sudo apt install default-jdk`
        - `java -version`
        - `javac -version`
        - `sudo update-alternatives --config java`
        - `sudo update-alternatives --config javac`
    - Set the `$JAVA_HOME` Environment Variable
        - `sudo nano /etc/environment`
        - write `JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"`
        - `cat /etc/environment`
    - Install Maven: `sudo apt install maven`
        - `mvn -v`

### Install Node.js, npm and Angular

- For Windows:
    - First, download [Node.js](https://nodejs.org/en/download/) - we need it to use NPM (Node Package Manager)
    - Make sure you have `C:\Program Files\nodejs\` path on your `System Properties > Environment Variables > System Variables > Path`. Restart PC.
    - Then install the Angular CLI: To install the Angular CLI globally, open a terminal window and run the following command (You will run this only once): `npm install -g @angular/cli`
    - Within `employeemanager-angular` Angular App folder, run `npm install`

- For x86 Debian based systems (Ubuntu, Zorin OS, KDE Neon, etc):
    - Run `curl -s https://deb.nodesource.com/setup_16.x | sudo bash` (to get Node v16)
    - Run `sudo apt install nodejs -y`
    - Install npm `sudo npm install -g npm@8.19.2`
    - Install Angular `sudo npm install -g @angular/cli`
    - Within `employeemanager-angular` Angular App folder, run `npm install`

### Running the app locally

The complete project (MySQL + SpringBoot BackEnd + Angular FrontEnd) can be started in Windows with these steps:

- start the MySQL Server by opening Windows Start Menu, search and open "Services", manually find MySQL80 service -> Right click it -> Start (for Linux, run `sudo systemctl start mysql.service`)
- start the SpringBoot Back-end Server with **`mvn spring-boot:run`** and test on http://localhost:8080/api/employees
- start the Front-end Angular Application with **`ng serve --open`** and open http://localhost:4200/

<br/>

## License

Copyright (c) 2022 Radu-Alexandru Bulai

Released under [MIT License](./LICENSE).