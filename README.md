# Research Assistant

## Overview

The Research Assistant is a Spring Boot application that leverages the Gemini API to process research-related content. It provides functionalities such as summarizing text and suggesting related topics for further reading.

## Technologies Used

*   Java 17
*   Spring Boot 3.4.2
*   Spring WebFlux
*   Project Reactor
*   Lombok
*   Maven
*   Gemini API

## Setup Instructions

### Prerequisites

*   [Java Development Kit (JDK) 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) or later
*   [Maven](https://maven.apache.org/download.cgi)
*   A Google Cloud project with the Gemini API enabled
*   A valid Gemini API key

### Configuration

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd research-assistant
    ```

2.  **Set up your Gemini API key:**

    *   Obtain a Gemini API key from the Google Cloud Console.
    *   Create or modify the `src/main/resources/application.properties` (or `application.yml`) file to include your API key and the Gemini API URL:

        ```properties
        gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
        gemini.api.key=?key=YOUR_API_KEY
        ```

        **Note:** Replace `YOUR_API_KEY` with your actual Gemini API key.

### Building and Running the Application

1.  **Build the application using Maven:**

    ```bash
    mvn clean install
    ```

2.  **Run the application:**

    ```bash
    mvn spring-boot:run
    ```

    Alternatively, you can run the packaged jar file:

    ```bash
    java -jar target/research-assistant-0.0.1-SNAPSHOT.jar
    ```

The application will start on port 8080 by default.

## API Endpoints

### `POST /api/research/process`

Processes the provided content based on the specified operation.

*   **Request Body:**

    ```json
    {
      "content": "Your research content here",
      "operation": "summarize" or "suggest"
    }
    ```

*   **Example Request:**

    ```bash
    curl -X POST \
      http://localhost:8080/api/research/process \
      -H 'Content-Type: application/json' \
      -d '{
            "content": "A long article about quantum physics...",
            "operation": "summarize"
          }'
    ```

*   **Response:**

    Returns a string containing the processed content (e.g., a summary or suggested topics).

    ```json
    "A concise summary of the provided quantum physics article."
    ```

## Functionalities

*   **Summarization:**  Provides a clear and concise summary of the input text.  Use `"operation": "summarize"` in the request body.
*   **Suggestion:** Suggests related topics and further reading based on the input content.  It formats the response with clear headings and bullet points. Use `"operation": "suggest"` in the request body.

## Dependencies
The project uses the following dependencies which are managed by Maven, see `pom.xml` in `G:\Intellij Idea\IntellijIdea Workspace\Research Assistant\research-assistant\pom.xml` for details:

*   `org.springframework.boot:spring-boot-starter-web`
*   `org.springframework.boot:spring-boot-starter-webflux`
*   `org.projectlombok:lombok`
*   `org.springframework.boot:spring-boot-starter-test`
*   `io.projectreactor:reactor-test`

## Notes

*   Ensure that your Gemini API key has the necessary permissions to access the Gemini API.
*   The application uses `@CrossOrigin(origins = "*")` in `G:\Intellij Idea\IntellijIdea Workspace\Research Assistant\research-assistant\src\main\java\com\research\research_assistant\controller\ResearchController.java` to allow cross-origin requests from any origin.  This is suitable for development but might need to be adjusted for production.

