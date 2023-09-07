# Astro Place Express Backend

Welcome to the Astro Place Express Backend project! This Node.js/Express backend serves as a demonstration of various backend development concepts and best practices. It covers a wide range of topics, including CORS policies, the Single Responsibility Principle, Service creation, Schema validation with Joi, Error handling Middlewares using Boom, and routing. Additionally, the application has been deployed using Vercel.

## Project Overview

This project showcases the implementation of a Node.js/Express Backend with a focus on the following key aspects:

- **CORS Policies**: The application demonstrates the use of CORS (Cross-Origin Resource Sharing) policies to control access to resources from different origins.

- **Single Responsibility Principle**: The code adheres to the Single Responsibility Principle, promoting clean and maintainable code by separating concerns appropriately.

- **Service Creation**: Services are used to encapsulate the business logic and data manipulation, ensuring modularity and code organization.

- **Schema Validation with Joi**: The project leverages Joi for data validation, ensuring that incoming data meets predefined schemas.

- **Error Handling with Boom**: Middleware functions handle errors gracefully using Boom, providing informative and standardized error responses.

- **Routing**: The application defines various endpoints to perform CRUD (Create, Read, Update, Delete) operations for managing products.

## Endpoints

The following endpoints are available:

- `GET /api/v1/products`: Retrieve a list of products.
- `GET /api/v1/products/:id`: Retrieve a specific product by ID.
- `POST /api/v1/products`: Create a new product.
- `PUT /api/v1/products/:id`: Update a product by ID.
- `DELETE /api/v1/products/:id`: Delete a product by ID.

## Deployment

The application has been deployed using Vercel, making it accessible online. You can access the deployed backend at [Astro Place Express Backend](https://astro-place-express-backend.vercel.app/).

<p align="center">
  <img src="https://i.ibb.co/vDFh9s5/express-backend-pre.png" alt="Preview.png" style="width: 50%; height: auto;">
  <p align="center">Server</p>
</p>

For the project I also prepared some notes with Notion, take a look here: [Express Backend Notes](https://bg99astro.notion.site/bg99astro/2658332bba3f40448545b6f3ba1c099f?v=bde7de79341747989e2a5f1f5ac7df80).

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/BryanGaray99/astro-place-express-backend.git`
2. Install dependencies: `npm install`
3. Configure environment variables if necessary.
4. Start the server: `npm run dev`

## License
This project is released under the [MIT License](https://opensource.org/licenses/MIT).

## Developer
Bryan Garay
</br>Contact: bryangarayacademico@gmail.com

---

Happy coding!
