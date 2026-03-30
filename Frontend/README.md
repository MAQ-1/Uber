# Uber Frontend Documentation

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Routes](#routes)
  - [/ — Home](#--home)
  - [/login — User Login](#login--user-login)
  - [/Signup — User Signup](#signup--user-signup)
  - [/Captain-login — Captain Login](#captain-login--captain-login)
  - [/Captain-Signup — Captain Signup](#captain-signup--captain-signup)

---

## Overview

Frontend for the Uber clone app built with React and Vite. Handles user and captain authentication flows with a clean mobile-first UI.

---

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS v4
- React Router DOM

---

## Getting Started

```bash
cd Frontend
npm install
npm run dev
```

App runs on `http://localhost:5173` by default.

---

## Routes

### `/` — Home

Landing page shown when the user first opens the app.

**Component:** `pages/Home.jsx`  
**Auth Required:** No

**What it shows:**
- Full screen hero background image
- Uber logo
- "Get Started With Uber" card at the bottom with a Continue button

**Navigation:**
| Action | Navigates To |
|--------|-------------|
| Click Continue | `/login` |

---

### `/login` — User Login

Login page for existing users.

**Component:** `pages/UserLogin.jsx`  
**Auth Required:** No

**What it shows:**
- Email and password input fields
- Login button
- Link to signup for new users
- "Sign in as Captain" button at the bottom

**Form Data Collected:**
| Field | Type | Required |
|-------|------|----------|
| `email` | String | Yes |
| `password` | String | Yes |

**Navigation:**
| Action | Navigates To |
|--------|-------------|
| Click Sign Up | `/Signup` |
| Click Sign in as Captain | `/Captain-login` |

---

### `/Signup` — User Signup

Registration page for new users.

**Component:** `pages/UserSignup.jsx`  
**Auth Required:** No

**What it shows:**
- First name and last name inputs (side by side)
- Email and password input fields
- Create Account button
- Link to login for existing users
- Privacy policy notice at the bottom

**Form Data Collected:**
| Field | Type | Required |
|-------|------|----------|
| `Fullname.firstname` | String | Yes — min 3 characters |
| `Fullname.lastname` | String | No |
| `email` | String | Yes |
| `password` | String | Yes — min 6 characters |

**Navigation:**
| Action | Navigates To |
|--------|-------------|
| Click Login | `/login` |

---

### `/Captain-login` — Captain Login

Login page for existing captains.

**Component:** `pages/CaptainLogin.jsx`  
**Auth Required:** No

**What it shows:**
- Email and password input fields
- Login as Captain button
- Link to captain signup for new captains
- "Sign in as User" button at the bottom

**Form Data Collected:**
| Field | Type | Required |
|-------|------|----------|
| `email` | String | Yes |
| `password` | String | Yes |

**Navigation:**
| Action | Navigates To |
|--------|-------------|
| Click Create an account | `/Captain-Signup` |
| Click Sign in as User | `/login` |

---

### `/Captain-Signup` — Captain Signup

Registration page for new captains.

**Component:** `pages/CaptainSignup.jsx`  
**Auth Required:** No

**What it shows:**
- First name and last name inputs (side by side)
- Email and password input fields
- Create Account button
- Link to captain login for existing captains
- Privacy policy notice at the bottom

**Form Data Collected:**
| Field | Type | Required |
|-------|------|----------|
| `Fullname.firstname` | String | Yes — min 3 characters |
| `Fullname.lastname` | String | No |
| `email` | String | Yes |
| `password` | String | Yes — min 6 characters |

**Navigation:**
| Action | Navigates To |
|--------|-------------|
| Click Login | `/Captain-login` |
