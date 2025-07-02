# API Documentation for NGO Management System

This document provides a detailed overview of all API endpoints in the NGO Management System backend. Use this guide to test the API using Thunder Client or any other API client. The base URL for all requests is
 `http://localhost:2222`.

## Overview
- **Public Routes**: `/auth/register` and `/auth/login` do not require authentication.
- **Protected Routes**: `/users` and `/donations` routes require a JWT token in the `Authorization` header.
- **Authentication**: Use the `/auth/login` endpoint to obtain a JWT token, which is valid for 1 hour.

## Authentication Routes

### 1. Register a User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Description**: Creates a new user in the system.
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Example**:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - **200 OK**: `"User Registered Successfully..!!"`
  - **400 Bad Request**: `"Duplicate Username or Email"` (if username or email already exists)
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 2. Login
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Example**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "message": "Login Successful..!!",
      "token": "<jwt_token>",
      "userId": 1
    }
    ```
  - **401 Unauthorized**: `"Invalid Email or Password"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

## User Routes (Protected)
All `/users` routes require authentication. Include the JWT token in the `Authorization` header as `Bearer <jwt_token>`.

### 3. Get All Users
- **Method**: `GET`
- **Endpoint**: `/users`
- **Description**: Retrieves a list of all registered users.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Responses**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "password": "<hashed_password>",
        "created_at": "2025-05-08T12:34:56.000Z"
      }
    ]
    ```
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong"`

### 4. Get User by ID
- **Method**: `GET`
- **Endpoint**: `/users/:id`
- **Description**: Retrieves details of a specific user by their ID.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Example**: `/users/1`
- **Responses**:
  - **200 OK**:
    ```json
    {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "password": "<hashed_password>",
      "created_at": "2025-05-08T12:34:56.000Z"
    }
    ```
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **404 Not Found**: `"User Not Found"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 5. Update User
- **Method**: `PUT`
- **Endpoint**: `/users/:id`
- **Description**: Updates a user’s information. The `password` field is optional.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string" // Optional
  }
  ```
- **Example**:
  - URL: `/users/1`
  - Body:
    ```json
    {
      "username": "updateduser",
      "email": "updated@example.com",
      "password": "newpassword123"
    }
    ```
- **Responses**:
  - **200 OK**: `"User Updated Successfully..!!"`
  - **400 Bad Request**: `"Duplicate Username or Email"`
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **404 Not Found**: `"User Not Found"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 6. Delete User
- **Method**: `DELETE`
- **Endpoint**: `/users/:id`
- **Description**: Deletes a user by their ID.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Example**: `/users/1`
- **Responses**:
  - **200 OK**: `"User Deleted Successfully..!!"`
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **404 Not Found**: `"User Not Found"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

## Donation Routes (Protected)
All `/donations` routes require authentication. Include the JWT token in the `Authorization` header as `Bearer <jwt_token>`.

### 7. Create a Donation
- **Method**: `POST`
- **Endpoint**: `/donations`
- **Description**: Creates a new donation.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "donor_name": "string",
    "email": "string",
    "amount": "number(Decimal(10,2)",
    "message": "string" // Optional
  }
  ```
- **Example**:
  ```json
  {
    "donor_name": "John Doe",
    "email": "john@example.com",
    "amount": 100.50,
    "message": "For a good cause"
  }
  ```
- **Responses**:
  - **200 OK**: `"Donation Registered Successfully..!!"`
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 8. Get All Donations
- **Method**: `GET`
- **Endpoint**: `/donations`
- **Description**: Retrieves a list of all donations.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Responses**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "donor_name": "John Doe",
        "email": "john@example.com",
        "amount": 100.50,
        "message": "For a good cause",
        "created_at": "2025-05-08T12:34:56.000Z"
      }
    ]
    ```
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong"`

### 9. Get Donation by ID
- **Method**: `GET`
- **Endpoint**: `/donations/:id`
- **Description**: Retrieves details of a specific donation by its ID.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Example**: `/donations/1`
- **Responses**:
  - **200 OK**:
    ```json
    [
      {
        "id": 1,
        "donor_name": "John Doe",
        "email": "john@example.com",
        "amount": 100.50,
        "message": "For a good cause",
        "created_at": "2025-05-08T12:34:56.000Z"
      }
    ]
    ```
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 10. Update Donation
- **Method**: `PUT`
- **Endpoint**: `/donations/:id`
- **Description**: Updates a donation’s information.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "donor_name": "string",
    "email": "string",
    "amount": "number",
    "message": "string" // Optional
  }
  ```
- **Example**:
  - URL: `/donations/1`
  - Body:
    ```json
    {
      "donor_name": "John Doe Updated",
      "email": "john.updated@example.com",
      "amount": 150.75,
      "message": "Updated message"
    }
    ```
- **Responses**:
  - **200 OK**: `"Donation Updated Successfully..!!"`
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

### 11. Delete Donation
- **Method**: `DELETE`
- **Endpoint**: `/donations/:id`
- **Description**: Deletes a donation by its ID.
- **Headers**:
  - `Authorization: Bearer <jwt_token>`
- **Request Body**: None
- **Example**: `/donations/1`
- **Responses**:
  - **200 OK**: `"Donation Deleted Successfully..!!"`
  - **401 Unauthorized**: `"Access Denied: No Token Provided"` or `"Invalid Token"`
  - **500 Internal Server Error**: `"Something Went Wrong..!!!"`

## Testing Flow with Thunder Client
1. **Register a User**:
   - Use `POST /auth/register` to create a user.
2. **Log In**:
   - Use `POST /auth/login` to get a JWT token.
3. **Test Protected Routes**:
   - Use the JWT token in the `Authorization` header for `/users` and `/donations` routes.
4. **Handle Token Expiration**:
   - If you get a `401` with `"Invalid Token"`, the token may have expired (1-hour validity). Log in again to get a new token.

## Notes
- **Base URL**: All endpoints assume the server is running on `http://localhost:2222`.
- **Security**: The API uses string interpolation for SQL queries, which is vulnerable to SQL injection. In a production environment, use parameterized queries.
- **Sensitive Data**: The `/users` endpoints return hashed passwords. In production, exclude the `password` field from responses.