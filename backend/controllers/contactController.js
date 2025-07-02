import { StatusCodes } from 'http-status-codes';
import conn from '../models/db.js';

// Create a new contact message
export const createMessage = (request, response) => {
  try {
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      return response.status(StatusCodes.BAD_REQUEST).send("All fields are required.");
    }

    const qry = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
    conn.query(qry, [name, email, message], (error, result) => {
      if (error) {
        console.error("DB Error:", error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Failed to send message.");
      } else {
        return response.status(StatusCodes.CREATED).send("Message sent successfully!");
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong.");
  }
};


// Get all contact messages (original code preserved)
export const getAllMessages = (request, response) => {
  try {
    const qry = "SELECT * FROM contact_messages";

    conn.query(qry, (error, result) => {
      if (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong");
      } else {
        response.status(StatusCodes.OK).send(result);
      }
    });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong");
  }
};

// Get a contact message by ID (original code preserved)
export const getMessageById = (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const qry = `SELECT * FROM contact_messages WHERE id = ${id}`;

    conn.query(qry, (error, result) => {
      if (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
      } else {
        response.status(StatusCodes.OK).send(result);
      }
    });
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
  }
};