# Node.js HTTP Server with Cookies

This project implements an HTTP server using Node.js and Express.js, following REST API principles, and including specific features such as asynchronous routines, file uploads, and cookie handling.

## Features

1. **POST to Create JSON Object**:
    - Endpoint: `/create`
    - Method: POST
    - Description: Create a new JSON object with the following properties:
        - `name`: A string representing the object's name.
        - `image`: A string representing the filename of an image associated with the object (e.g., "filename.jpg").
        - `state`: A string indicating the object's state, which can be "pending" or "completed".
    - Response: The POST request returns a unique ID for the newly created object.

2. **GET Object by ID**:
    - Endpoint: `/get/:id`
    - Method: GET
    - Description: Retrieve an object by its ID. The ID should be a parameter in the request URL, and the server responds with the JSON object matching the provided ID.

3. **Asynchronous Routine**:
    - Description: The POST request made in the `/create` endpoint executes an asynchronous routine. The routine does not perform any specific tasks but waits for 5 seconds before completing. During this waiting period, the object's state is set to "pending". After the 5 seconds, the state of the object automatically changes to "completed".

4. **Image Upload**:
    - Endpoint: `/upload`
    - Method: POST
    - Description: Allows users to upload images. The images are stored in the file system of the HTTP server as they are, and each image is accessible later using the URL `/images/filename.jpg`, where "filename.jpg" is the name of the uploaded image.

5. **Representation Endpoint**:
    - Endpoint: `/show`
    - Method: GET
    - Description: Represents all created objects or a single object based on the `id` query parameter. If the `id` parameter is not provided, the server renders a list of all objects using the EJS templating language. If the `id` parameter is provided, the server renders a representation of the specific object with "name" and "image" properties.

6. **Cookie Handling**:
    - Description: In addition to step 5, the server works with cookies. When a request is made to the `/show` endpoint, the server sets a cookie in the user's browser. The cookie contains the latest requested ID, or "all" if no ID parameter is provided in the request. When the server responds to the `/show` request, the value of the cookie is rendered in the header of the page.

## Setup and Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using npm:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node app.js
   ```

5. Access the server at `http://localhost:3000`.

## Technologies Used

- Node.js
- Express.js
- Multer (for file uploads)
- EJS (for templating)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify, enhance, or use this project for educational purposes or as a starting point for your own Node.js projects! If you encounter any issues or have questions, please feel free to open an issue in this repository. Happy coding!
