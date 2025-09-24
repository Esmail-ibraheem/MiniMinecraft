# Virtual LLMs Project

A web-based platform for interacting with Large Language Models (LLMs) through a proxy server and user interface.

## Project Structure

This project consists of two main components:

- **AI Proxy Server**: A Node.js server that handles LLM requests
- **Web Interface**: A client-side application for interacting with the LLMs

## Prerequisites

- Node.js (for the proxy server)
- Python 3.x (for the web server)
- Modern web browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Esmail-ibraheem/Virtual-LLMs.git
cd Virtual-LLMs
```

## Running the Application

### Step 1: Start the AI Proxy Server

Open a terminal and navigate to the `ai-proxy` directory:

```bash
cd ai-proxy
node server.mjs
```

The proxy server will start and be ready to handle LLM requests.

### Step 2: Start the Web Interface

Open another terminal and navigate to the `games` directory:

```bash
cd games
python -m http.server 8080
```

Alternatively, if you have Python 3, you can use:
```bash
python3 -m http.server 8080
```

### Step 3: Access the Application

Open your web browser and go to:
```
http://localhost:8080
```

## Usage

1. The web interface will load in your browser
2. The application will communicate with the AI proxy server running on the backend
3. You can interact with various LLM features through the intuitive web interface

## Features

- Web-based interface for LLM interactions
- Proxy server for managing API requests
- Support for multiple language models
- User-friendly chat interface

## Troubleshooting

- Ensure both servers are running simultaneously
- Check that port 8080 is available for the web server
- Verify that the proxy server has the necessary API keys/configurations
- Make sure you're in the correct directories when starting each server

## License

This project is open source. See the LICENSE file for more details.



<img width="1914" height="935" alt="image" src="https://github.com/user-attachments/assets/0f9d823f-d6ab-4fce-be9d-52e89564c120" />


<img width="1913" height="931" alt="image" src="https://github.com/user-attachments/assets/2dd1ed74-21db-4be7-981a-ba7126b3d1d4" />
