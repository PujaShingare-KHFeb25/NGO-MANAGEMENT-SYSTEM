import StatusCodes from 'http-status-codes';
import conn from '../models/db.js';

export const createDonation = (request, response) => {
    try {
        const data = request.body;
        const qry = `INSERT INTO donations (donor_name, email, amount, message) VALUES ('${data.donor_name}', '${data.email}', ${data.amount || null}, ${data.message ? `'${data.message}'` : null})`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log(error);
                if (error.errno === 1062) {
                    response.status(StatusCodes.BAD_REQUEST).send("Duplicate Email");
                } else {
                    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
                }
            } else {
                response.status(StatusCodes.OK).send("Donation Registered Successfully..!!");
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const getAllDonations = (request, response) => {
    try {
        const qry = "SELECT * FROM donations";

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

export const getDonationById = (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const qry = `SELECT * FROM donations WHERE id = ${id}`;

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

export const updateDonation = (request, response) => {
    try {
        const data = request.body;
        const id = parseInt(request.params.id);
        const qry = `UPDATE donations SET donor_name = '${data.donor_name}', email = '${data.email}', amount = ${data.amount || null}, message = ${data.message ? `'${data.message}'` : null} WHERE id = ${id}`;

        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                response.status(StatusCodes.OK).send("Donation Updated Successfully..!!");
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};

export const deleteDonation = (request, response) => {
    try {
        const id = parseInt(request.params.id);
        const qry = `DELETE FROM donations WHERE id = ${id}`;

        conn.query(qry, (error, result) => {
            if (error) {
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                response.status(StatusCodes.OK).send("Donation Deleted Successfully..!!");
            }
        });
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};
export const recentDonation = (request, response) => {
    try {
        const data = request.body;
        console.log("Received email for recent donations:", data);  // 🐛 Debug here
        const qry = `SELECT donor_name, email, amount, message, date FROM donations WHERE email = '${data.email}'`;

        conn.query(qry, (error, result) => {
            if (error) {
                console.log("DB error:", error);  // 🐛 Log DB error
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
            } else {
                response.status(StatusCodes.OK).send(result);
            }
        });
    } catch (error) {
        console.log("Catch error:", error);  // 🐛 Log unexpected error
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong..!!!");
    }
};
