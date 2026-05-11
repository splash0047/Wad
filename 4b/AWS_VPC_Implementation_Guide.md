# AWS VPC Implementation Guide for Restaurant Web Application

## Objective
Deploy and host the Restaurant Full-Stack Web Application on AWS using Virtual Private Cloud (VPC) infrastructure.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Create a VPC](#step-1-create-a-vpc)
3. [Step 2: Create Subnets](#step-2-create-subnets)
4. [Step 3: Create Internet Gateway](#step-3-create-internet-gateway)
5. [Step 4: Create Route Tables](#step-4-create-route-tables)
6. [Step 5: Create Security Groups](#step-5-create-security-groups)
7. [Step 6: Launch EC2 Instances](#step-6-launch-ec2-instances)
8. [Step 7: Deploy the Application](#step-7-deploy-the-application)
9. [Step 8: Create NAT Gateway (Optional)](#step-8-create-nat-gateway-optional)
10. [Architecture Diagram](#architecture-diagram)

---

## Prerequisites
- AWS Account (Free Tier eligible)
- AWS CLI installed and configured (optional)
- Key Pair created in AWS EC2 Dashboard
- Application source code ready for deployment

---

## Step 1: Create a VPC

1. Log in to the **AWS Management Console**.
2. Navigate to **VPC** service.
3. Click **"Create VPC"**.
4. Select **"VPC and more"** (automated setup) or **"VPC only"** (manual setup).
5. Enter the following details:
   - **Name tag:** `RestaurantApp-VPC`
   - **IPv4 CIDR block:** `10.0.0.0/16`
   - **Tenancy:** Default
6. Click **"Create VPC"**.

> **Note:** `10.0.0.0/16` provides 65,536 private IP addresses for your network.

---

## Step 2: Create Subnets

Create subnets in different Availability Zones for high availability.

### Public Subnet (for Frontend / Application Server)
1. Go to **Subnets** in the VPC Dashboard.
2. Click **"Create subnet"**.
3. Select your VPC (`RestaurantApp-VPC`).
4. Enter details:
   - **Subnet name:** `Public-Subnet-1a`
   - **Availability Zone:** `ap-south-1a` (Mumbai region)
   - **IPv4 CIDR block:** `10.0.1.0/24`
5. Click **"Create subnet"**.

### Private Subnet (for Database)
1. Click **"Create subnet"** again.
2. Select your VPC.
3. Enter details:
   - **Subnet name:** `Private-Subnet-1b`
   - **Availability Zone:** `ap-south-1b`
   - **IPv4 CIDR block:** `10.0.2.0/24`
4. Click **"Create subnet"**.

### Enable Auto-assign Public IP (Public Subnet)
1. Select `Public-Subnet-1a`.
2. Click **"Actions"** → **"Edit subnet settings"**.
3. Check **"Enable auto-assign public IPv4 address"**.
4. Click **"Save"**.

---

## Step 3: Create Internet Gateway

An Internet Gateway allows your VPC to communicate with the internet.

1. Go to **Internet Gateways** in the VPC Dashboard.
2. Click **"Create internet gateway"**.
3. Enter **Name tag:** `RestaurantApp-IGW`.
4. Click **"Create internet gateway"**.
5. Select the IGW and click **"Actions"** → **"Attach to VPC"**.
6. Select `RestaurantApp-VPC` and click **"Attach internet gateway"**.

---

## Step 4: Create Route Tables

### Public Route Table
1. Go to **Route Tables** in the VPC Dashboard.
2. Click **"Create route table"**.
3. Enter:
   - **Name:** `Public-RT`
   - **VPC:** `RestaurantApp-VPC`
4. Click **"Create route table"**.
5. Select `Public-RT` and go to **"Routes"** tab.
6. Click **"Edit routes"** → **"Add route"**:
   - **Destination:** `0.0.0.0/0`
   - **Target:** Internet Gateway (`RestaurantApp-IGW`)
7. Click **"Save changes"**.
8. Go to **"Subnet associations"** tab.
9. Click **"Edit subnet associations"**.
10. Select `Public-Subnet-1a` and click **"Save associations"**.

### Private Route Table
1. Click **"Create route table"**.
2. Enter:
   - **Name:** `Private-RT`
   - **VPC:** `RestaurantApp-VPC`
3. Click **"Create route table"**.
4. Go to **"Subnet associations"** tab.
5. Click **"Edit subnet associations"**.
6. Select `Private-Subnet-1b` and click **"Save associations"**.

> **Note:** Private subnet does NOT have a route to `0.0.0.0/0` (no direct internet access).

---

## Step 5: Create Security Groups

### Web Server Security Group (Frontend + Backend)
1. Go to **Security Groups** in the VPC Dashboard.
2. Click **"Create security group"**.
3. Enter:
   - **Security group name:** `WebServer-SG`
   - **Description:** `Security group for web and app servers`
   - **VPC:** `RestaurantApp-VPC`
4. Add **Inbound Rules**:
   | Type        | Protocol | Port Range | Source      | Description       |
   |-------------|----------|------------|-------------|-------------------|
   | SSH         | TCP      | 22         | My IP       | SSH Access        |
   | HTTP        | TCP      | 80         | 0.0.0.0/0   | Web Traffic       |
   | HTTPS       | TCP      | 443        | 0.0.0.0/0   | Secure Web        |
   | Custom TCP  | TCP      | 3000       | 0.0.0.0/0   | React Dev Server  |
   | Custom TCP  | TCP      | 5000       | 0.0.0.0/0   | Node.js API       |
5. Click **"Create security group"**.

### Database Security Group
1. Click **"Create security group"**.
2. Enter:
   - **Security group name:** `Database-SG`
   - **Description:** `Security group for database`
   - **VPC:** `RestaurantApp-VPC`
3. Add **Inbound Rules**:
   | Type        | Protocol | Port Range | Source        | Description       |
   |-------------|----------|------------|---------------|-------------------|
   | SSH         | TCP      | 22         | My IP         | SSH Access        |
   | Custom TCP  | TCP      | 5000       | WebServer-SG  | App Server Access |
4. Click **"Create security group"**.

---

## Step 6: Launch EC2 Instances

### Launch Frontend + Backend Server (Public Subnet)
1. Go to **EC2** Dashboard → **Instances** → **"Launch instances"**.
2. Enter:
   - **Name:** `RestaurantApp-Server`
   - **AMI:** Ubuntu Server 22.04 LTS (Free Tier)
   - **Instance type:** `t2.micro` (Free Tier eligible)
   - **Key pair:** Select your existing key pair or create new
3. **Network settings:**
   - **VPC:** `RestaurantApp-VPC`
   - **Subnet:** `Public-Subnet-1a`
   - **Auto-assign public IP:** Enable
   - **Security group:** `WebServer-SG`
4. **Storage:** 8 GB (default)
5. Click **"Launch instance"**.

### Launch Database Server (Private Subnet) - Optional
1. Go to **EC2** Dashboard → **Instances** → **"Launch instances"**.
2. Enter:
   - **Name:** `RestaurantApp-DB`
   - **AMI:** Ubuntu Server 22.04 LTS
   - **Instance type:** `t2.micro`
3. **Network settings:**
   - **VPC:** `RestaurantApp-VPC`
   - **Subnet:** `Private-Subnet-1b`
   - **Auto-assign public IP:** Disable
   - **Security group:** `Database-SG`
4. Click **"Launch instance"**.

---

## Step 7: Deploy the Application

### Connect to your EC2 Instance
1. Select `RestaurantApp-Server` instance.
2. Click **"Connect"** → **"SSH client"**.
3. Use the SSH command provided (or use EC2 Instance Connect).

### Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 for process management
sudo npm install -g pm2
```

### Deploy Backend
```bash
# Create app directory
mkdir -p ~/restaurant-app/backend
cd ~/restaurant-app/backend

# Copy your backend files (using scp from local or git clone)
# Example using git:
git clone <your-repo-url> .

# Or using scp from local machine:
# scp -i your-key.pem -r ./backend/* ubuntu@<EC2_PUBLIC_IP>:~/restaurant-app/backend/

# Install dependencies
npm install

# Start backend with PM2
pm2 start server.js --name "restaurant-backend"
pm2 startup
pm2 save
```

### Deploy Frontend
```bash
# Build frontend on your local machine first:
cd ./frontend
npm install
npm run build

# Copy the dist folder to EC2:
# scp -i your-key.pem -r ./dist ubuntu@<EC2_PUBLIC_IP>:~/restaurant-app/frontend/

# On EC2, copy dist to serve via backend or install nginx:
sudo apt install -y nginx
sudo cp -r ~/restaurant-app/frontend/dist/* /var/www/html/
sudo systemctl restart nginx
```

### Configure Nginx as Reverse Proxy
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace the content with:
```nginx
server {
    listen 80;
    server_name _;

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Access the Application
Open your browser and navigate to: `http://<EC2_PUBLIC_IP>`

---

## Step 8: Create NAT Gateway (Optional)

If your private subnet instances need internet access (for updates, package installation):

1. Go to **NAT Gateways** in VPC Dashboard.
2. Click **"Create NAT Gateway"**.
3. Enter:
   - **Name:** `RestaurantApp-NAT`
   - **Subnet:** `Public-Subnet-1a`
   - **Connectivity type:** Public
   - **Elastic IP allocation:** Click **"Allocate Elastic IP"**
4. Click **"Create NAT Gateway"**.

### Update Private Route Table
1. Go to **Route Tables** → Select `Private-RT`.
2. **Routes** tab → **Edit routes**.
3. Add route:
   - **Destination:** `0.0.0.0/0`
   - **Target:** NAT Gateway (`RestaurantApp-NAT`)
4. Click **"Save changes"**.

> **Note:** NAT Gateway incurs charges. Use it only if your private instances need outbound internet access.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      AWS CLOUD                               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              RestaurantApp-VPC (10.0.0.0/16)         │   │
│  │                                                     │   │
│  │   ┌──────────────────┐    ┌──────────────────┐      │   │
│  │   │  Public Subnet   │    │  Private Subnet  │      │   │
│  │   │  (10.0.1.0/24)   │    │  (10.0.2.0/24)   │      │   │
│  │   │  ap-south-1a     │    │  ap-south-1b     │      │   │
│  │   │                  │    │                  │      │   │
│  │   │  ┌──────────┐   │    │  ┌──────────┐   │      │   │
│  │   │  │  EC2     │   │    │  │  EC2     │   │      │   │
│  │   │  │  Web     │   │    │  │  DB      │   │      │   │
│  │   │  │  Server  │   │    │  │  Server  │   │      │   │
│  │   │  │          │   │    │  │          │   │      │   │
│  │   │  │ Frontend │   │    │  │ SQLite/  │   │      │   │
│  │   │  │ Backend  │   │    │  │ Database │   │      │   │
│  │   │  └──────────┘   │    │  └──────────┘   │      │   │
│  │   │       │         │    │       │         │      │   │
│  │   └───────┼─────────┘    └───────┼─────────┘      │   │
│  │           │                      │                  │   │
│  │   ┌───────▼────────┐    ┌────────▼────────┐      │   │
│  │   │  Public Route  │    │  Private Route  │      │   │
│  │   │  Table         │    │  Table          │      │   │
│  │   │                │    │                │      │   │
│  │   │ 0.0.0.0/0 → IGW│    │ 0.0.0.0/0 → NAT│     │   │
│  │   └───────┬────────┘    └─────────────────┘      │   │
│  │           │                                        │   │
│  │   ┌───────▼────────┐                               │   │
│  │   │ Internet Gateway│                               │   │
│  │   └───────┬────────┘                               │   │
│  └───────────┼─────────────────────────────────────────┘   │
│              │                                             │
│         ┌────▼────┐                                       │
│         │ INTERNET │                                      │
│         └─────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Additional Best Practices

1. **Use Elastic Load Balancer (ELB)** for distributing traffic across multiple instances.
2. **Enable CloudWatch** monitoring for logs and metrics.
3. **Set up Auto Scaling Groups** for handling traffic spikes.
4. **Use AWS RDS** instead of EC2-hosted database for production.
5. **Enable AWS WAF** for web application firewall protection.
6. **Use AWS Certificate Manager** for free SSL/TLS certificates.
7. **Configure Route 53** for custom domain name management.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot connect via SSH | Verify Security Group allows port 22 from your IP |
| Website not loading | Check Nginx is running: `sudo systemctl status nginx` |
| API not responding | Verify backend is running: `pm2 status` |
| Database connection failed | Check Security Group allows port 5000 from WebServer-SG |
| Permission denied on scp | Ensure key file has correct permissions: `chmod 400 your-key.pem` |

---

## Cleanup (To Avoid Charges)

1. Terminate all EC2 instances.
2. Delete NAT Gateway.
3. Release Elastic IPs.
4. Delete Internet Gateway.
5. Delete Subnets.
6. Delete Route Tables.
7. Delete Security Groups.
8. Delete VPC.

> **Note:** Always clean up resources after testing to avoid unexpected AWS charges.

---

**Document Version:** 1.0  
**Created:** May 2026  
**Author:** WAD Practical 4B
