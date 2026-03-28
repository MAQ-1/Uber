# Uber Backend API Documentation

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [POST /users/register](#post-usersregister)

---

## Base URL

```
http://localhost:4000
```

---

## Authentication

Protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

---

## Endpoints

### POST /users/register

Registers a new user account. Hashes the password before storage and returns a signed JWT token upon success.

**URL:** `/users/register`  
**Method:** `POST`  
**Auth Required:** No  
**Content-Type:** `application/json`

---

#### Request Body

```json
{
  "Fullname": {
    "Firstname": "John",
    "Lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

#### Field Reference

| Field               | Type   | Required | Validation                                      |
|---------------------|--------|----------|-------------------------------------------------|
| `Fullname.Firstname`| String | Yes      | Minimum 3 characters                            |
| `Fullname.Lastname` | String | No       | Minimum 3 characters if provided                |
| `email`             | String | Yes      | Must be a valid email format; must be unique    |
| `password`          | String | Yes      | Minimum 6 characters; stored as bcrypt hash     |

---

#### Success Response

**Code:** `201 Created`

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6622ff7c0b7e9b5a12345678",
    "Fullname": {
      "Firstname": "John",
      "Lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

#### Error Responses

**Code:** `400 Bad Request` — Validation failed

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Firstname should be at least 3 characters long",
      "path": "Fullname.Firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Valid email is required",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Code:** `500 Internal Server Error` — Unexpected server error

```json
{
  "message": "Error registering user"
}
```

---

#### Status Code Summary

| Status Code | Meaning                  | Cause                                              |
|-------------|--------------------------|----------------------------------------------------|
| `201`       | Created                  | User registered successfully                       |
| `400`       | Bad Request              | Missing fields, failed validation rules            |
| `500`       | Internal Server Error    | Database error or unexpected server-side failure   |

---

#### Notes

- The `password` field is never returned in any response — it is excluded at the schema level (`select: false`).
- JWT tokens are signed using `process.env.JWT_SECRET`. Ensure this is set in your `.env` file before starting the server.
- Submitting a duplicate `email` will result in a `500` error due to the unique constraint on the database field.
- The `socketId` field is reserved for real-time ride tracking via Socket.IO and is `null` at registration.
