# People Hub API

## Technology Stack

- Node.js
- Express.js
- MySQL
- json2csv

---

## Installation

```bash
npm install
```

---

## Configure Environment

Create a `.env` file.

Example:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=people_hub
DB_PORT=3306
PORT=5000
```

---

## Run Project

```bash
npm start
```

or

```bash
nodemon app.js
```

---

## APIs

### Departments

POST /departments

GET /departments

PUT /departments/:id

DELETE /departments/:id

---

### Employees

POST /employees

GET /employees

GET /employees/:id

PUT /employees/:id

PATCH /employees/:id/status

DELETE /employees/:id

GET /employees/export

---

### Dashboard

GET /dashboard

---

## Features

- CRUD APIs
- Pagination
- Search
- Department Filter
- Status Filter
- Employee Validations
- CSV Export
- Dashboard Statistics
