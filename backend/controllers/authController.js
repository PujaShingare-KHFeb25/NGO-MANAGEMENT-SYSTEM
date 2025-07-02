import StatusCodes from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conn from '../models/db.js';

const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key in production

export const registerUser = async (request, response) => {
    try {
        const { username, email, password } = request.body;

        // Validate required fields
        if (!username) {
            return response.status(StatusCodes.BAD_REQUEST).send("Username is required");
        }
        if (!email) {
            return response.status(StatusCodes.BAD_REQUEST).send("Email is required");
        }
        if (!password) {
            return response.status(StatusCodes.BAD_REQUEST).send("Password is required");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into the database
        const qry = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                if (error.errno === 1062) {
                    response.status(StatusCodes.BAD_REQUEST).send("Duplicate Username or Email");
                } else {
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
                }
            } else {
                response.status(StatusCodes.OK).send("User Registered Successfully..!!");
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const loginUser = (request, response) => {
    try {
        const data = request.body;
        const qry = `SELECT * FROM users WHERE email = '${data.email}'`;

        conn.query(qry, async (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                if (result.length > 0) {
                    const user = result[0];
                    const match = await bcrypt.compare(data.password, user.password);
                    if (match) {
                        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                        response.status(StatusCodes.OK).json({ message: "Login Successful..!!", token, userId: user.id });
                    } else {
                        response.status(StatusCodes.UNAUTHORIZED).send("Invalid Email or Password");
                    }
                } else {
                    response.status(StatusCodes.UNAUTHORIZED).send("Invalid Email or Password");
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const getAllUsers = (request, response) => {
    try {
        const qry = "SELECT * FROM users";

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

export const getUserById = (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const qry = `SELECT * FROM users WHERE id = ${id}`;

        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                if (result.length > 0) {
                    response.status(StatusCodes.OK).send(result[0]);
                } else {
                    response.status(StatusCodes.NOT_FOUND).send("User Not Found");
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const updateUser = async (request, response) => {
    try {
        const data = request.body;
        const id = parseInt(request.params.id);
        let qry = `UPDATE users SET username = '${data.username}', email = '${data.email}'`;
        
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            qry += `, password = '${hashedPassword}'`;
        }
        
        qry += ` WHERE id = ${id}`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                if (error.errno === 1062) {
                    response.status(StatusCodes.BAD_REQUEST).send("Duplicate Username or Email");
                } else {
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
                }
            } else {
                if (result.affectedRows > 0) {
                    response.status(StatusCodes.OK).send("User Updated Successfully..!!");
                } else {
                    response.status(StatusCodes.NOT_FOUND).send("User Not Found");
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const deleteUser = (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const qry = `DELETE FROM users WHERE id = ${id}`;

        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                if (result.affectedRows > 0) {
                    response.status(StatusCodes.OK).send("User Deleted Successfully..!!");
                } else {
                    response.status(StatusCodes.NOT_FOUND).send("User Not Found");
                }
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};