WAD PRACTICAL 2B: Docker Container Environment
================================================

FILES CREATED:
-------------
1. Docker_Container_Environment_Guide.pdf
   -> Complete step-by-step implementation instructions PDF.

2. generate_docker_guide.py
   -> Python script used to generate the PDF (requires fpdf2).

3. my-docker-app/
   -> Sample Nginx web application with Dockerfile.
   - index.html  : Sample web page
   - Dockerfile  : Instructions to build Nginx image

4. node-app/
   -> Sample Node.js application with Dockerfile.
   - app.js      : Simple Node.js script
   - Dockerfile  : Instructions to build Node.js image

5. docker-compose.yml
   -> Multi-container setup (Nginx + MySQL)

6. README.txt
   -> This file.

HOW TO USE:
-----------
1. Open Docker_Container_Environment_Guide.pdf and follow all steps.

2. For hands-on practice, use the provided sample projects:

   A) Nginx Web App:
      cd my-docker-app
      docker build -t my-nginx-app .
      docker run -d -p 8080:80 --name web-container my-nginx-app
      Open browser: http://localhost:8080

   B) Node.js App:
      cd node-app
      docker build -t my-node-app .
      docker run --name node-container my-node-app
      docker logs node-container

   C) Docker Compose Stack:
      docker-compose up -d
      docker-compose ps
      docker-compose down

PREREQUISITES:
--------------
- Docker Desktop installed and running
- WSL 2 enabled (recommended for Windows)
- PowerShell / Command Prompt with admin rights

NOTE ON NVIDIA DOCKER:
----------------------
- NVIDIA Container Toolkit requires Linux containers on WSL 2 backend.
- Ensure you have an NVIDIA GPU with updated drivers.
- Instructions for NVIDIA setup are inside the PDF (Chapter 8).

For queries, refer to official Docker documentation:
https://docs.docker.com/
