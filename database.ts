import * as SQLite from 'expo-sqlite';
import e from 'express';

// Open a connection to the SQLite database
const db = SQLite.openDatabaseSync('census');

// Define the Person interface
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occupation: string;
  province: string;
  district: string;
  date: string;
  gender: string;
 
}

// Initialize the database and create tables if they don't exist
export const initializeDB = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      -- Create the 'person' table
      
      CREATE TABLE IF NOT EXISTS person (
        id INTEGER PRIMARY KEY NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        date TEXT NOT NULL,
        province TEXT NOT NULL,
        district TEXT NOT NULL,
        gender TEXT NOT NULL
      
      );

    

     
      -- Create the 'household' table
      CREATE TABLE IF NOT EXISTS household (
        id INTEGER PRIMARY KEY NOT NULL,
        householdHead INTEGER NOT NULL, -- Foreign Key linking to 'person' table
        numberOfMembers INTEGER NOT NULL,
        residenceType TEXT NOT NULL,
        FOREIGN KEY (householdHead) REFERENCES person(id)
      );

      -- Create the 'address' table
      CREATE TABLE IF NOT EXISTS address (
        id INTEGER PRIMARY KEY NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        province TEXT NOT NULL,
        zipCode TEXT NOT NULL
      );
    `);
    console.log("Tables initialized successfully.");
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
};



// Function to add a new person to the 'person' table
export const addPerson = async (
  firstName: string, 
  lastName: string, 
  phone: string, 
  email: string, 
  occupation: string,
  province: string,
  district: string,
  date: string, 
  gender: string

) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO person 
        (firstName, lastName,phone, email,province, district, occupation,  date, gender) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      firstName, lastName, phone, email, occupation,province, district, date, gender, 
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

// Function to update a person's record in the 'person' table
export const updatePerson = async (
  id: number, 
  firstName: string, 
  lastName: string, 
  phone: string, 
  email: string, 
  occupation: string,
  province: string,
  district: string,
  date: string, 
  gender: string,

) => {
  try {
    await db.runAsync(
      `UPDATE person 
       SET firstName = ?, lastName = ?, phone = ?, email = ?, occupation = ?, province = ?, district = ?, date = ?, gender = ? 
       WHERE id = ?`,
      firstName, lastName,phone, email, occupation, province, district,  date, gender,  id
    );
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

// Function to delete a person from the 'person' table
export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

// Function to get all persons from the 'person' table
export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};

// Function to add a new household
export const addHousehold = async (
  householdHead: number, 
  numberOfMembers: number, 
  residenceType: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO household (householdHead, numberOfMembers, residenceType) VALUES (?, ?, ?)', 
      householdHead, numberOfMembers, residenceType
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding household:", error);
  }
};

// Function to add a new address
export const addAddress = async (
  street: string, 
  city: string, 
  province: string, 
  zipCode: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO address (street, city, province, zipCode) VALUES (?, ?, ?, ?)', 
      street, city, province, zipCode
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding address:", error);
  }
};

// Function to get all households
export const getHouseholds = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM household');
    return allRows;
  } catch (error) {
    console.error("Error getting households:", error);
    return [];
  }
};

// Function to get all addresses
export const getAddresses = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM address');
    return allRows;
  } catch (error) {
    console.error("Error getting addresses:", error);
    return [];
  }
};
