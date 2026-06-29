# QueueMaster

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

QueueMaster is a simple web application designed to help businesses manage their customer waiting queues.

## Features
- Add a customer to the queue
- Mark a customer as "Being Served"
- Mark a customer as "Completed"
- Remove a customer from the queue
- View all customers with their current status (Waiting, Serving, Completed)

## Technology Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Storage**: In-memory Array
- **Containerization**: Docker
- **Reverse Proxy**: Nginx

Nginx is used to serve the production React build and optionally act as a reverse proxy for backend requests.

## Architecture & Project Structure

**Architecture:**
```text
React (Frontend)
        │
HTTP REST API
        │
Express (Backend)
        │
In-Memory Storage (Array)
```

**Project Structure:**
```text
QueueMaster/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
├── nginx/
├── docker-compose.yml
└── README.md
```

## Running the Application

### Prerequisites
- **Docker** installed and running on your machine.
- **Docker Compose** (Highly recommended).

### Recommended: Run with Docker Compose
The easiest way to run the complete stack (Frontend, Backend, and Nginx proxy) is:
```bash
docker compose up --build -d
```
After building, the application will be available at:
- **Frontend App**: [http://localhost](http://localhost) (or `http://localhost:80`)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Nginx Gateway**: [http://localhost:8081](http://localhost:8081)

---

### Instructions for Running the Complete Application (Individual Containers)
Follow these steps to run the frontend and backend in two separate Docker containers.

#### How to build the backend Docker container
```bash
cd backend
docker build -t queuemaster-backend .
```

#### How to run the backend Docker container
```bash
docker run -d -p 5000:5000 --name qm-backend queuemaster-backend
```

#### How to build the frontend Docker container
```bash
cd ../frontend
docker build -t queuemaster-frontend .
```

#### How to run the frontend Docker container
```bash
docker run -d -p 80:80 --name qm-frontend queuemaster-frontend
```

#### How to build the Nginx Docker container
```bash
cd ../nginx
docker build -t queuemaster-nginx .
```

#### How to run the Nginx Docker container
```bash
docker run -d -p 8081:8080 --name qm-nginx queuemaster-nginx
```

#### The URLs/endpoints required to access the application
- **Frontend Web App**: [http://localhost](http://localhost) (or `http://localhost:80`)
- **Backend API Customers Endpoint**: [http://localhost:5000/api/customers](http://localhost:5000/api/customers)
- **Nginx Gateway**: [http://localhost:8081](http://localhost:8081)

#### Any additional setup instructions necessary to run the project successfully
- The frontend is pre-configured to communicate with the backend at `http://localhost:5000/api`. Ensure the backend container is running on port `5000` on your host machine.
- No additional database setup is required, as the backend uses an in-memory data store.

### Environment Variables
- **Frontend (`VITE_API_URL`)**: The URL for the backend API. Defaults to `http://localhost:5000/api` if not provided. Because Vite compiles React into static files, this URL is baked into the code at build time. To change it, you must provide it as a build argument during the frontend Docker build (e.g., `docker build --build-arg VITE_API_URL=https://api.mywebsite.com/api -t queuemaster-frontend .`).
- **Backend (`PORT`)**: The port the backend server runs on. Defaults to `5000`.

---

## API Documentation

### Healthcheck
`GET /`
Returns a simple healthcheck message to confirm the server is running.

### Get all customers
`GET /api/customers`
Returns a list of all customers in the queue.

### Add a customer
`POST /api/customers`

**Request Body:**
```json
{
  "name": "Rahul"
}
```

### Update customer status
`PUT /api/customers/:id/status`

**Request Body:**
```json
{
  "status": "SERVING"
}
```
*(Valid statuses: `WAITING`, `SERVING`, `COMPLETED`)*

### Delete customer
`DELETE /api/customers/:id`
Removes the customer entirely from the queue.

---

## Error Handling
- **Empty customer names** return HTTP 400.
- **Invalid status updates** return HTTP 400.
- **Invalid customer IDs** return HTTP 404 (Not Found).
- **Unexpected server errors** return HTTP 500.

---

## Assumptions
Documented assumptions made during implementation:
1. **Duplicate customer names:** Allowed. A unique ID (UUID) is generated for each customer to accurately distinguish them in the queue.
2. **Multiple serving:** Multiple customers may be marked as "Being Served" concurrently.
3. **Return to queue:** A completed customer cannot directly return to the queue using their old entry; they must be added as a new entry.
4. **Queue order:** FIFO (First In, First Out) is enforced visually by the order they are added.
5. **Data persistence:** Since an in-memory store is used to keep the implementation simple and dependency-free, data will be lost when the backend container restarts.
6. **Empty queue:** If the queue is empty, the UI displays clear empty states ("No customers waiting", etc.) rather than throwing errors.
7. **Customer Statuses:** A customer can only have one of three statuses: `WAITING`, `SERVING`, or `COMPLETED`.

---

## If You Had Another 3 Hours

### What additional improvements you would make
1. **Database Integration:** Replace the in-memory array with a persistent database like PostgreSQL or MongoDB to ensure data isn't lost on restart.
2. **Real-time Updates (WebSockets):** Use Socket.io to push queue updates to the frontend in real-time, rather than relying on manual refreshing or interval polling.
3. **Advanced UI/UX:** Add drag-and-drop support to manually reorder the queue. Add animations for when customers enter or leave the queue.
4. **Form Validation & Toast Notifications:** Add a library like `react-hook-form` and `react-toastify` for better user feedback and robust validation.
5. **Testing:** Write unit and integration tests using Jest and React Testing Library to ensure API and component stability.

### What compromises you made because of the 1-hour time limit
- **In-memory Storage:** Chosen over a proper database to strictly adhere to the 1-hour time constraint and keep setup effortlessly simple for the reviewer.
- **Polling / Refetching:** The frontend fetches data on load, after an action, and runs a 5-second interval polling mechanism. This was used instead of WebSockets to minimize complexity within the limited time.
- **Monolithic State:** Used basic React `useState` and prop drilling instead of Redux or Context API, as the component tree is small enough to not warrant the boilerplate overhead.
