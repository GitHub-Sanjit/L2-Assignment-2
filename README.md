
# Instructions

### How to run the application locally

Clone the project

```bash
  https://github.com/sanjitweb479/L2-Assignment-2.git
```

Go to project directory

```bash
  cd projectName
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
 npm run start:dev
```

- Open postman

-Create a user

```
  http://localhost:5000/api/users
```

-Get all users

```
  http://localhost:5000/api/users
```

-Get a specific users

```
  http://localhost:5000/api/users/:userId
```

-Update a specific users

```
  http://localhost:5000/api/users/:userId
```

-Delete a specific users

```
  http://localhost:5000/api/users/:userId
```

-Insert a order to a specific user collection

```
  http://localhost:5000/api/users/:userId/orders
```

-Get specific user All orders

```
  http://localhost:5000/api/users/:userId/orders
```

-Get total price of a specific user orders

```
  http://localhost:5000/api/users/2/orders/total-price
```