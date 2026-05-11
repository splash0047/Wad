from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(0, 51, 102)
        self.cell(0, 10, "WAD Practical 2B: Docker Container Environment", ln=True, align="C")
        self.ln(2)
        self.set_draw_color(0, 51, 102)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(128)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    def chapter_title(self, title):
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(0, 51, 102)
        self.set_fill_color(230, 240, 255)
        self.cell(0, 10, title, ln=True, fill=True)
        self.ln(3)

    def section_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(0, 0, 0)
        self.cell(0, 8, title, ln=True)
        self.ln(1)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def code_block(self, code):
        self.set_font("Courier", "", 9)
        self.set_text_color(0, 100, 0)
        self.set_fill_color(245, 245, 245)
        self.multi_cell(0, 5, code, fill=True)
        self.ln(2)
        self.set_text_color(0, 0, 0)

    def note_box(self, text):
        self.set_font("Helvetica", "I", 10)
        self.set_text_color(100, 60, 0)
        self.set_fill_color(255, 250, 220)
        self.multi_cell(0, 6, f"NOTE: {text}", fill=True)
        self.ln(2)
        self.set_text_color(0, 0, 0)

    def warning_box(self, text):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(150, 0, 0)
        self.set_fill_color(255, 230, 230)
        self.multi_cell(0, 6, f"WARNING: {text}", fill=True)
        self.ln(2)
        self.set_text_color(0, 0, 0)


pdf = PDF()
pdf.alias_nb_pages()
pdf.add_page()

# Title Page
pdf.set_font("Helvetica", "B", 20)
pdf.set_text_color(0, 51, 102)
pdf.cell(0, 20, "Docker Container Environment", ln=True, align="C")
pdf.set_font("Helvetica", "B", 16)
pdf.cell(0, 12, "Implementation Guide", ln=True, align="C")
pdf.ln(10)
pdf.set_font("Helvetica", "", 12)
pdf.set_text_color(0, 0, 0)
pdf.multi_cell(0, 8, "Subject: Web Application Development (WAD)\nPractical: 2B\n\nThis document provides step-by-step instructions to set up and work with Docker container environments, including Docker Desktop, basic commands, Dockerfile creation, multi-container orchestration with Docker Compose, and optional NVIDIA Container Toolkit for GPU-accelerated workloads.", align="C")
pdf.ln(20)
pdf.set_font("Helvetica", "I", 10)
pdf.cell(0, 10, "Generated for academic practical implementation", ln=True, align="C")

pdf.add_page()

# Table of Contents
pdf.chapter_title("Table of Contents")
pdf.set_font("Helvetica", "", 11)
toc = [
    "1. Prerequisites and System Requirements",
    "2. Installing Docker Desktop on Windows",
    "3. Enabling WSL 2 Backend (Required for GPU support)",
    "4. Basic Docker Commands",
    "5. Creating Your First Dockerfile",
    "6. Building and Running Containers",
    "7. Docker Compose: Multi-Container Setup",
    "8. NVIDIA Container Toolkit (Optional - GPU)",
    "9. Hands-On Exercises",
    "10. Common Troubleshooting"
]
for item in toc:
    pdf.cell(0, 8, item, ln=True)
    pdf.ln(1)

pdf.add_page()

# Chapter 1
pdf.chapter_title("1. Prerequisites and System Requirements")
pdf.section_title("1.1 System Requirements for Docker Desktop")
pdf.body_text("Before installing Docker, ensure your Windows machine meets the following requirements:")
reqs = (
    "Operating System: Windows 10/11 (64-bit), version 19041 or higher.\n"
    "Processor: 64-bit processor with Second Level Address Translation (SLAT).\n"
    "RAM: Minimum 4 GB (8 GB or more recommended).\n"
    "Virtualization: Hyper-V and Windows Hypervisor Platform must be enabled.\n"
    "WSL 2: Windows Subsystem for Linux version 2 (recommended for best performance).\n"
    "Disk Space: At least 10 GB of free space.\n"
    "GPU (Optional): NVIDIA GPU with compute capability 5.0+ for NVIDIA Docker support."
)
pdf.body_text(reqs)

pdf.section_title("1.2 Required Software / Accounts")
pdf.body_text("- Docker Hub account (free): https://hub.docker.com/\n- Windows Terminal or PowerShell (admin rights required)\n- Visual Studio Code (recommended) with Docker extension")
pdf.note_box("If you are using Windows Home edition, WSL 2 backend is mandatory as Hyper-V is not available.")

pdf.add_page()

# Chapter 2
pdf.chapter_title("2. Installing Docker Desktop on Windows")
pdf.section_title("Step 1: Download Docker Desktop")
pdf.body_text("1. Open your web browser and go to https://www.docker.com/products/docker-desktop/")
pdf.body_text("2. Click on 'Download for Windows - AMD64' (or ARM64 if applicable).")
pdf.body_text("3. Save the installer (.exe file) to your Downloads folder.")

pdf.section_title("Step 2: Run the Installer")
pdf.body_text("1. Double-click the Docker Desktop Installer.exe file.")
pdf.body_text("2. When prompted, ensure 'Use WSL 2 instead of Hyper-V' is checked (recommended).")
pdf.body_text("3. Click OK and wait for the installation to complete. This may take several minutes.")
pdf.body_text("4. If prompted, restart your computer after the installation finishes.")

pdf.section_title("Step 3: Verify Installation")
pdf.body_text("After restarting, open PowerShell or Command Prompt and run:")
pdf.code_block("docker --version\ndocker-compose --version")
pdf.body_text("You should see output similar to:")
pdf.code_block("Docker version 26.x.x, build xxxxxxx\nDocker Compose version v2.x.x")
pdf.warning_box("Docker Desktop must be running (icon in system tray) for commands to work.")

pdf.add_page()

# Chapter 3
pdf.chapter_title("3. Enabling WSL 2 Backend (Required for GPU support)")
pdf.section_title("Step 1: Install WSL 2")
pdf.body_text("Open PowerShell as Administrator and run:")
pdf.code_block("wsl --install")
pdf.body_text("This installs Ubuntu as the default distribution along with WSL 2 kernel. Restart your PC when prompted.")

pdf.section_title("Step 2: Set WSL 2 as Default")
pdf.code_block("wsl --set-default-version 2")

pdf.section_title("Step 3: Configure Docker Desktop")
pdf.body_text("1. Open Docker Desktop.\n2. Go to Settings (gear icon) > General.\n3. Ensure 'Use the WSL 2 based engine' is checked.\n4. Go to Resources > WSL Integration.\n5. Enable integration with your default WSL distro (e.g., Ubuntu).\n6. Click 'Apply & Restart'.")

pdf.note_box("WSL 2 is essential for running Linux containers and is the only way to use NVIDIA Container Toolkit on Windows.")

pdf.add_page()

# Chapter 4
pdf.chapter_title("4. Basic Docker Commands")
pdf.body_text("Practice these essential commands in PowerShell / Terminal:")

cmds = [
    ("Check Docker version", "docker --version"),
    ("List running containers", "docker ps"),
    ("List all containers (including stopped)", "docker ps -a"),
    ("List Docker images", "docker images"),
    ("Pull an image from Docker Hub", "docker pull hello-world"),
    ("Run a container", "docker run hello-world"),
    ("Run container interactively", "docker run -it ubuntu bash"),
    ("Run container in background", "docker run -d -p 8080:80 nginx"),
    ("Stop a running container", "docker stop <container_id>"),
    ("Remove a container", "docker rm <container_id>"),
    ("Remove an image", "docker rmi <image_id>"),
    ("View container logs", "docker logs <container_id>"),
    ("Execute command inside running container", "docker exec -it <container_id> bash"),
]

for desc, cmd in cmds:
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, desc, ln=True)
    pdf.code_block(cmd)

pdf.note_box("Use the first 3-4 characters of the container ID instead of typing the full ID.")

pdf.add_page()

# Chapter 5
pdf.chapter_title("5. Creating Your First Dockerfile")
pdf.body_text("A Dockerfile is a text file containing instructions to build a Docker image. Let's create a simple web server.")

pdf.section_title("Step 1: Create Project Directory")
pdf.code_block("mkdir my-docker-app\ncd my-docker-app")

pdf.section_title("Step 2: Create a simple HTML file")
pdf.code_block("notepad index.html")
pdf.body_text("Paste the following content and save:")
pdf.code_block('<!DOCTYPE html>\n<html>\n<head><title>Docker App</title></head>\n<body>\n  <h1>Hello from Docker Container!</h1>\n  <p>This page is served by Nginx inside a Docker container.</p>\n</body>\n</html>')

pdf.section_title("Step 3: Create the Dockerfile")
pdf.code_block("notepad Dockerfile")
pdf.body_text("Paste the following content and save (no file extension):")
pdf.code_block(
    "# Use official Nginx image as base\n"
    "FROM nginx:alpine\n\n"
    "# Copy custom HTML to Nginx web root\n"
    "COPY index.html /usr/share/nginx/html/\n\n"
    "# Expose port 80\n"
    "EXPOSE 80\n\n"
    "# Start Nginx when container launches\n"
    "CMD [\"nginx\", \"-g\", \"daemon off;\"]"
)

pdf.note_box("The Dockerfile must be named exactly 'Dockerfile' with no extension.")

pdf.add_page()

# Chapter 6
pdf.chapter_title("6. Building and Running Containers")
pdf.section_title("Step 1: Build the Docker Image")
pdf.code_block("docker build -t my-nginx-app .")
pdf.body_text("Explanation:\n- '-t my-nginx-app' tags the image with name 'my-nginx-app'\n- '.' means the Dockerfile is in the current directory")

pdf.section_title("Step 2: Run the Container")
pdf.code_block("docker run -d -p 8080:80 --name web-container my-nginx-app")
pdf.body_text("Explanation:\n- '-d' runs in detached (background) mode\n- '-p 8080:80' maps host port 8080 to container port 80\n- '--name web-container' assigns a friendly name")

pdf.section_title("Step 3: Test in Browser")
pdf.body_text("Open your browser and navigate to: http://localhost:8080")
pdf.body_text("You should see your 'Hello from Docker Container!' message.")

pdf.section_title("Step 4: Stop and Clean Up")
pdf.code_block("docker stop web-container\ndocker rm web-container\ndocker rmi my-nginx-app")

pdf.add_page()

# Chapter 7
pdf.chapter_title("7. Docker Compose: Multi-Container Setup")
pdf.body_text("Docker Compose allows you to define and run multi-container applications using a YAML file.")

pdf.section_title("Step 1: Create docker-compose.yml")
pdf.code_block("notepad docker-compose.yml")
pdf.body_text("Paste the following content:")
pdf.code_block(
    "version: '3.8'\n\n"
    "services:\n"
    "  web:\n"
    "    image: nginx:alpine\n"
    "    ports:\n"
    "      - '8080:80'\n"
    "    volumes:\n"
    "      - ./index.html:/usr/share/nginx/html/index.html\n"
    "    container_name: compose-web\n\n"
    "  db:\n"
    "    image: mysql:8.0\n"
    "    environment:\n"
    "      MYSQL_ROOT_PASSWORD: rootpass\n"
    "      MYSQL_DATABASE: testdb\n"
    "    ports:\n"
    "      - '3306:3306'\n"
    "    container_name: compose-db\n\n"
    "volumes:\n"
    "  db_data:\n"
)

pdf.section_title("Step 2: Start Services")
pdf.code_block("docker-compose up -d")

pdf.section_title("Step 3: Verify Running Services")
pdf.code_block("docker-compose ps")

pdf.section_title("Step 4: Stop and Remove Services")
pdf.code_block("docker-compose down")

pdf.note_box("Ensure docker-compose.yml and index.html are in the same directory before running docker-compose commands.")

pdf.add_page()

# Chapter 8
pdf.chapter_title("8. NVIDIA Container Toolkit (Optional - GPU)")
pdf.body_text("NVIDIA Container Toolkit (nvidia-docker) allows Docker containers to access GPU resources. This is useful for machine learning, AI, and compute-intensive tasks.")

pdf.section_title("Step 1: Verify NVIDIA GPU")
pdf.code_block("nvidia-smi")
pdf.body_text("If this command fails, update your NVIDIA drivers from https://www.nvidia.com/drivers")

pdf.section_title("Step 2: Install NVIDIA Container Toolkit on WSL 2")
pdf.body_text("Open your WSL 2 Ubuntu terminal and run these commands:")
pdf.code_block(
    "# Add NVIDIA package repositories\n"
    "distribution=$(. /etc/os-release;echo $ID$VERSION_ID)\n"
    "curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -\n"
    "curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list"
)
pdf.code_block(
    "# Install nvidia-docker2 package\n"
    "sudo apt-get update\n"
    "sudo apt-get install -y nvidia-docker2"
)
pdf.code_block(
    "# Restart Docker daemon\n"
    "sudo systemctl restart docker"
)

pdf.section_title("Step 3: Test GPU Container")
pdf.code_block("docker run --rm --gpus all nvidia/cuda:12.0-base nvidia-smi")
pdf.body_text("If successful, you will see your GPU details inside the container.")

pdf.warning_box("NVIDIA Container Toolkit on Windows requires WSL 2 backend. It does NOT work with Windows containers or Hyper-V backend.")

pdf.add_page()

# Chapter 9
pdf.chapter_title("9. Hands-On Exercises")
pdf.section_title("Exercise 1: Basic Container Lifecycle")
pdf.body_text("1. Pull the 'hello-world' image.\n2. Run it and observe the output.\n3. List all containers and note the exited container.\n4. Remove the exited container.\n5. Remove the 'hello-world' image.")

pdf.section_title("Exercise 2: Custom Node.js Application")
pdf.body_text("1. Create a directory 'node-app'.\n2. Inside it, create 'app.js' that prints 'Hello from Node.js' to the console.\n3. Create a Dockerfile using 'node:18-alpine' as base.\n4. Build and run the image.\n5. Verify the output using 'docker logs'.")

pdf.section_title("Exercise 3: Persist Data with Volumes")
pdf.body_text("1. Run an nginx container with a volume mounted to /usr/share/nginx/html.\n2. Create a custom index.html in the mounted host directory.\n3. Verify the changes reflect in the browser.\n4. Delete and recreate the container.\n5. Confirm that the custom page persists.")

pdf.section_title("Exercise 4: Docker Compose Web + DB Stack")
pdf.body_text("1. Create a docker-compose.yml with PHP-Apache and MySQL services.\n2. Connect the PHP application to MySQL using the service name as hostname.\n3. Verify both containers can communicate on the default Docker network.")

pdf.add_page()

# Chapter 10
pdf.chapter_title("10. Common Troubleshooting")

troubleshooting = [
    (
        "Docker Desktop fails to start",
        "- Ensure virtualization is enabled in BIOS.\n"
        "- Enable Hyper-V and Windows Hypervisor Platform in Windows Features.\n"
        "- Ensure WSL 2 is installed and set as default."
    ),
    (
        "Port already in use",
        "- Change the host port mapping (e.g., -p 8081:80 instead of -p 8080:80).\n"
        "- Find and stop the process using the port: netstat -ano | findstr :8080"
    ),
    (
        "Permission denied on WSL",
        "- Run commands with 'sudo' or add your user to the docker group:\n"
        "  sudo usermod -aG docker $USER && newgrp docker"
    ),
    (
        "Image pull fails / no internet in container",
        "- Check Docker Desktop network settings.\n"
        "- Restart Docker Desktop.\n"
        "- Verify proxy settings if behind a corporate firewall."
    ),
    (
        "NVIDIA GPU not visible in container",
        "- Ensure WSL 2 is used (not Hyper-V).\n"
        "- Install latest NVIDIA drivers supporting WSL.\n"
        "- Verify nvidia-docker2 is installed inside WSL distro."
    ),
    (
        "Container exits immediately",
        "- Check container logs: docker logs <container_id>\n"
        "- Ensure the foreground process is specified in Dockerfile CMD/ENTRYPOINT.\n"
        "- Use 'docker run -it' for interactive debugging."
    ),
]

for title, content in troubleshooting:
    pdf.section_title(title)
    pdf.body_text(content)

pdf.add_page()
pdf.set_font("Helvetica", "B", 14)
pdf.set_text_color(0, 51, 102)
pdf.cell(0, 20, "End of Document", ln=True, align="C")
pdf.set_font("Helvetica", "", 12)
pdf.set_text_color(0, 0, 0)
pdf.cell(0, 10, "Follow each step carefully and verify outputs at every stage.", ln=True, align="C")
pdf.cell(0, 10, "Refer to official Docker documentation for advanced topics:", ln=True, align="C")
pdf.set_text_color(0, 0, 255)
pdf.cell(0, 10, "https://docs.docker.com/", ln=True, align="C")

# Save
output_path = r"C:\Users\Pinak chimurkar\Desktop\Wad practicals\2b\Docker_Container_Environment_Guide.pdf"
pdf.output(output_path)
print(f"PDF generated successfully at: {output_path}")
