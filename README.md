# Triangle Classification Tests

This repository contains automated tests for a triangle classification application. The tests are implemented using Playwright with TypeScript and follow the Page Object Model (POM) design pattern to ensure modular and reusable code. The project validates various types of triangles, including isosceles, equilateral, and right triangles, as well as scenarios with maximum, minimum, and fractional numbers.

## Features

- **Playwright Tests:** Automated end-to-end tests for triangle classification.
- **Page Object Model (POM):** Organizes test code in a modular way to enhance maintainability and reusability.
- **Comprehensive Coverage:** Tests for different triangle types and edge cases.

## Technologies Used

- **Playwright:** A Node.js library for browser automation.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your_username/triangle-tests.git
   cd triangle-tests
   ```

2. **Install Dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies:

   ```bash
   npm install
   ```

3. **Run Tests:**

   To run the automated tests, use:

   ```bash
   npm test
   ```

   Alternatively, you can run tests in headed mode using:

   ```bash
   npm run e2e:headed
   ```

## Project Structure

- **`page-models/`**: Contains the Page Object Model classes used for interacting with the web application.
- **`tests/`**: Contains the test files that use the Page Object Model classes to perform automated tests.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## Contact

For any questions or feedback, please reach out to [yutta.dyck@gmail.com]
