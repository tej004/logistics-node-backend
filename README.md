# Logistics Node Backend

## How to Run

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd logistics-node-backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root with the following content (adjust values as needed):

   ```
   DB_HOST="your-db-host"
   DB_PORT=5432
   DB_USER="your-db-user"
   DB_PASS="your-db-password"
   DB_DATABASE="your-db-name"
   DB_SYNCHRONIZE=false
   DB_LOGGING=false

   JWT_SECRET='your_jwt_secret_key'

   NODE_ENV="development"
   PORT=3000
   ```

4. **Run database migrations (optional)**
   ```sh
   npm run migration:run
   ```

5. **Start the backend**
   ```sh
   npm run dev
   ```
   or for production:
   ```sh
   npm start
   ```

## Example `.env`
```
DB_HOST="localhost"
DB_PORT=5432
DB_USER="postgres"
DB_PASS="postgres"
DB_DATABASE="my_db"
DB_SYNCHRONIZE=false
DB_LOGGING=false

JWT_SECRET='your_jwt_secret_key'

NODE_ENV="development"
PORT=3000
```