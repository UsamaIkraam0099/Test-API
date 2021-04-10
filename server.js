var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("hifz.db");

db.serialize(function () {
  //db.run("Server File Executed");
  {
    // CREATE TABLE
    // console.log("Creating Students table...");
    // db.run(
    //   "create table Students (Student_ID INTEGER PRIMARY KEY AUTOINCREMENT,Roll_Number VARCHAR,Student_Name VARCHAR,Date_Of_Birth VARCHAR,Father_Name VARCHAR,Address VARCHAR,Phone_Number VARCHAR,Date_Of_Admission VARCHAR,Avatar VARCHAR, Student_AdmissionForm_Image)"
    // );
    // console.log("Students created successfully!");
  }

  {
    // CREATE ATTENDANCE TABLE
    // console.log("Creating Attendance table...");
    // db.run(
    //   "create table Attendance (A_ID INTEGER PRIMARY KEY AUTOINCREMENT, Student_ID INTEGER, Date VARCHAR, Time VARCHAR, Period VARCHAR,FOREIGN KEY(Student_ID) REFERENCES Students(Student_ID))"
    // );
    // console.log("Attendance created successfully!");
  }

  {
    // CREATE TABLE SABAQ
    // console.log("Creating SABAQ table...");
    // db.run(
    //   "create table SABAQ (Sabaq_ID INTEGER PRIMARY KEY AUTOINCREMENT, Student_ID INTEGER, Para_No INTEGER, Surah_No INTEGER, Ayat_No INTEGER, Mistakes INTEGER, Atkinay INTEGER, FOREIGN KEY(Student_ID) REFERENCES Students(Student_ID))"
    // );
    // console.log("SABAQ created successfully!");
  }

  {
    // CREATE TEACHER TABLE
    // console.log("Creating Teacher table...");
    // db.run(
    //   "create table Teacher (Teacher_ID INTEGER PRIMARY KEY AUTOINCREMENT, Teacher_Name VARCHAR, Father_Name VARCHAR, NIC INTEGER, Date_Of_Birth VARCHAR, Date_Of_Contract VARCHAR, Address VARCHAR, Status VARCHAR, Contact VARCHAR, Avatar VARCHAR, Teacher_Agreement_Image)"
    // );
    // console.log("Teacher created successfully!");
  }

  {
    // CREATE TABLE SABAQI_MANZIL
    // console.log("Creating SABAQI_MANZIL Table...");
    // db.run(
    //   "create table Sabaqi_Manzil(Sabaqi_OR_Manzil_ID INTEGER PRIMARY KEY AUTOINCREMENT, P_ID INTEGER, Student_ID INTEGER, Sabaqi_OR_Manzil VARCHAR, Date VARCHAR, FOREIGN KEY(P_ID) REFERENCES Para(P_ID),FOREIGN KEY(Student_ID) REFERENCES Students(Student_ID))"
    // );
    // console.log("Sabaqi_Manzil created successfully!");
  }

  {
    // CREATE TABLE PARA
    // console.log("Creating Para Table...");
    // db.run(
    //   "create table Para (P_ID INTEGER PRIMARY KEY AUTOINCREMENT, Sabaqi_OR_Manzil_ID INTEGER, Para_No INTEGER, s_ID_l INTEGER, Mistakes INTEGER, Atkinay INTEGER, Date VARCHAR, T_Verification VARCHAR, Comments VARCHAR, Rukoo_No INTEGER, Ayat_No INTEGER, Surah_No INTEGER, isParaComplete VARCHAR ,FOREIGN KEY (Sabaqi_OR_Manzil_ID) REFERENCES Sabaqi_Manzil(Sabaqi_OR_Manzil_ID))"
    // );
    // console.log("Para created successfully!");
  }

  {
    // CREATE TABLE STUDENT_TEACHER_RELATION
    // console.log("Create Student_Teacher_Relationr Table...");
    // db.run(
    //   "create table Students_Teacher_Relation (S_T_ID INTEGER PRIMARY KEY AUTOINCREMENT, Student_ID INTEGER, Teacher_ID INTEGER, Start_Date VARCHAR, End_Date VARCHAR, FOREIGN KEY(Student_ID) REFERENCES Students(Student_Id), FOREIGN KEY(Teacher_ID) REFERENCES Teacher(Teacher_Id))"
    // );
    // console.log("Student_Teacher_Relationr created successfully!");
  }

  {
    // CREATE TABLE SURAH_NAME
    // console.log("Create Surah_Name Table...");
    // db.run(
    //   "create table Surah_Name (Surah_ID INTEGER PRIMARY KEY AUTOINCREMENT, Name VARCHAR, Ayats INTEGER, Rukoos INTEGER)"
    // );
    // console.log("Surah created successfully!");
  }

  {
    // CREATE TABLE PARANAME
    // console.log("Create Para_Name Table...");
    // db.run(
    //   "create table Para_Name (P_N_ID INTEGER PRIMARY KEY AUTOINCREMENT, Para_Name Varchar)"
    // );
    // console.log("Para_Name created successfully!");
  }

  {
    // CREATE TEST TABLE
    // console.log("Create Test Table...");
    // db.run(
    //   "create table Test (T_ID INTEGER PRIMARY KEY AUTOINCREMENT, T_Name Varchar, T_City VARCHAR)"
    // );
    // console.log("Test created successfully!");
  }

  {
    // DROPE TABLE QUERY
    // console.log("Deleting table...");
    // db.run("DROP TABLE Sabaqi_Manzil");
    // console.log("Table deleted successfully!");
  }

  {
    // ADD NEW COLUMN
    // console.log("Alter Table");
    // db.run("ALTER TABLE Para ADD Surah_No INTEGER");
    // console.log("Table Successfully Updated!");
  }

  {
    // CHANGR COLUMN NAME
    // console.log("Changing Column Name...");
    // db.run("ALTER TABLE Para RENAME COLUMN m_ID TO Sabaqi_OR_Manzil_ID");
    // console.log("Change Successfully!");
  }

  {
    // ADD FOREIGN KEY THROUGH ALTER
    // console.log("Adding Foreign Key...");
    // db.run(
    //   "ALTER TABLE Para ADD FOREIGN KEY (Sabaqi_OR_Manzil_ID) REFERENCES Sabaqi_Manzil(Sabaqi_OR_Manzil_ID)"
    // );
    // console.log("Foreign Key Added Successfully");
  }

  {
    // DROPE COLUMN
    // try {
    //   console.log("Drop Column...");
    //   db.run("ALTER TABLE Para DROP COLUMN Sabaqi_OR_Manzil_ID;");
    //   console.log("Column Drop Successfully...");
    // } catch (error) {
    //   console.log("Error =", error);
    // }
  }

  /////////////////////////////  TEST API FOR SOUKEINA  /////////////////////////////////

  // {
  //   //CREATE TABLE USER
  //   console.log("Creating User table...");
  //   db.run(
  //     "create table User (iduser INTEGER PRIMARY KEY AUTOINCREMENT, Firstname VARCHAR, Lastname VARCHAR, Profile VARCHAR)"
  //   );
  //   console.log("Students created successfully!");
  // }

});

db.close();
