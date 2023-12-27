# Skill Bazaar

This is a backend api for Skill Bazaar built using express and typescript.

## Requirements

- Docker
- Nodejs
- MongoDB
- Typescript
- Redis
- npm
- pnpm(prefered package manager)

## Installation

<details>
<summary>
Click Me
</summary>

1. Clone the repository
2. Install the dependencies
3. Run the server

```bash
git clone git@github.com:geekyharsh05/Skill-Bazaar-API.git
cd Skill-Bazaar-API
pnpm install
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
pnpm dev
```

The application will start, and you can access it at `http://localhost:4000` (or the port you specified in your `.env` file).
The Redis server will be listening on `http://localhost:8001/redis-stack/browser`
</details>

### NOTE: Setup environment variable in .env

## API Endpoints

The application provides various API endpoints for interacting with the data stored in the MongoDB database. You can find the routes and their descriptions in the source code.

## Author

**Author Name** &nbsp; : &nbsp; Harsh Vardhan Pandey <br>
**Author URI** &nbsp; &nbsp; &nbsp; : &nbsp; [www.aboutharsh.vercel.app](https://aboutharsh.vercel.app/) <br>
**GitHub URI** &nbsp; &nbsp; &nbsp; : &nbsp; [geekyharsh05](https://github.com/geekyharsh05)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
