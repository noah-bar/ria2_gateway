# Data Object Readme
## Description
This application is a Node.js server built with Express.js, designed for handling file uploads and publishing. It integrates with Google Cloud Storage, allowing users to upload files and generate public URLs for sharing. 
## Getting started
### Prerequisites
List all dependencies and their version needed by the project as :
- Node V21.1+
- Npm V10.2+
- Typescript V5.3+
## API Endpoints

### 1. Upload File
- **Endpoint**: `/api/v1/upload`
- **Method**: POST
- **Description**: Allows users to upload a file to Google Cloud Storage. The endpoint expects a file and a name in the request.
- **Request Fields**:
  - `file`: The file to be uploaded.
  - `name`: The name to associate with the file in storage.

### 2. Publish File
- **Endpoint**: `/api/v1/publish/:name`
- **Method**: GET
- **Description**: Generates a public URL for a file stored in Google Cloud Storage. The URL is valid for a specified duration.
- **URL Parameters**:
  - `name`: The name of the file to be published.
- **Request Body** (optional):
  - `expirationTime`: The duration (in days) for which the URL will remain valid. Defaults to 90 days if not specified.

### 3. Analyse Image
- **Endpoint**: `/api/v1/analyse`
- **Method**: POST
- **Description**: This endpoint accepts an image for analysis and returns labels describing the image. The client can specify the maximum number of results to return and the minimum confidence level for the labels.
- **Request Body**:
  - `image`: (String) The image data or a URL to the image.
  - `maxResults`: (Number, optional) Maximum number of labels to return. Defaults to 7.
  - `minConfidenceLevel`: (Number, optional) Minimum confidence level for the labels. Defaults to 90.
- **Response**: A JSON object containing an array of labels and their respective confidence scores.

## Deployment
### On dev environment
1. Rename `.env.example` file to `.env`.
2. Complete the following variables in the `.env` file:
   - `DATA_OBJECT_TARGET`: The endpoint to data object api
   - `LABEL_DETECTOR_TARGET`: The endpoint to label detector api
   - `PORT`: The port on which the application will run (default is 6000).
 3. Install dependencies:
    ```
    npm i
    ```
 4. Launch the application in development mode:
    ```
    npm run dev
    ```
### On integration environment
1. Build the application:
   ```
   npm run build
   ```
   This step creates a `dist` folder.
3. Place a `.env` file with production configurations inside the `dist` folder.
4. Launch the application:
   ```
   node dist/index.js
   ```
## Directory structure
```console
gateway
├── dist                                //compiled files ready for production use
├── package-lock.json
├── package.json
├── src                                 //contains the source code
│   ├── proxy.ts
│   ├── config
│   │   └── routes.ts
│   └── index.ts
└── tsconfig.json
```
## Collaborate
### Commit Message Guidelines
To maintain clarity and consistency in our repository's history, we adhere to the following commit guidelines:
- **Descriptive Messages**: Ensure each commit message clearly describes the changes made.
- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) format, using types like `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, etc.
### Branching Strategy
We use [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) as our branching strategy. Please create feature, hotfix, or release branches as appropriate and merge them back into the main branches as per Git Flow guidelines.
### Pull Requests
Open a pull request with a clear title and description for your changes. Link any relevant issues in the pull request description.
## License
This project is open source and available under the [MIT License].
