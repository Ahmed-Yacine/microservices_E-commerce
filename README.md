# 🛒 E-Commerce Microservices Platform

<div align="center">

![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue?style=for-the-badge)
![NestJS](https://img.shields.io/badge/Backend-NestJS-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Container-Docker-blue?style=for-the-badge&logo=docker)
![NATS](https://img.shields.io/badge/Messaging-NATS-green?style=for-the-badge)

**A modern, scalable e-commerce platform built with microservices architecture**

[🚀 Quick Start](#-quick-start) •
[📋 Features](#-features) •
[🏗️ Architecture](#️-architecture) •
[🛠️ Tech Stack](#️-tech-stack) •
[📚 Documentation](#-documentation)

</div>

---

## 🌟 Project Overview

This project is a **comprehensive e-commerce platform** built using **microservices architecture** with modern technologies. It provides a scalable, maintainable, and robust solution for online retail businesses.

### 🎯 Key Objectives

- **Scalability**: Each service can be scaled independently based on demand
- **Maintainability**: Clean separation of concerns and modular design
- **Reliability**: Fault-tolerant system with proper error handling
- **Performance**: Optimized for high throughput and low latency
- **Security**: JWT authentication, role-based access control, and data encryption

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TB
    subgraph "External Layer"
        Client[🌐 Client Applications]
        Admin[👨‍💼 Admin Dashboard]
    end
    
    subgraph "API Gateway Layer"
        Gateway[🚪 HTTP API Gateway<br/>Port: 3000]
    end
    
    subgraph "Microservices Layer"
        Users[👥 Users Service<br/>Port: 3001]
        Products[📦 Products Service<br/>Port: 3002]
        Orders[🛒 Orders Service<br/>Port: 3003]
        Payments[💳 Payments Service<br/>Port: 3004]
        Inventory[📊 Inventory Service<br/>Port: 3005]
        Notifications[🔔 Notifications Service<br/>Port: 3006]
        Files[📁 Files Service<br/>Port: 3007]
        EmailSMS[📧 Email/SMS Service<br/>Port: 3008]
    end
    
    subgraph "Message Broker"
        NATS[⚡ NATS Message Broker<br/>Port: 4222]
    end
    
    subgraph "Database Layer"
        UsersDB[(👥 Users DB<br/>Port: 5433)]
        ProductsDB[(📦 Products DB<br/>Port: 5434)]
        OrdersDB[(🛒 Orders DB<br/>Port: 5435)]
        PaymentsDB[(💳 Payments DB<br/>Port: 5436)]
        InventoryDB[(📊 Inventory DB<br/>Port: 5437)]
        NotificationsDB[(🔔 Notifications DB<br/>Port: 5438)]
        FilesDB[(📁 Files DB<br/>Port: 5439)]
    end
    
    Client --> Gateway
    Admin --> Gateway
    
    Gateway --> Users
    Gateway --> Products
    Gateway --> Orders
    Gateway --> Payments
    Gateway --> Files
    
    Users --> NATS
    Products --> NATS
    Orders --> NATS
    Payments --> NATS
    Inventory --> NATS
    Notifications --> NATS
    EmailSMS --> NATS
    
    Users --> UsersDB
    Products --> ProductsDB
    Orders --> OrdersDB
    Payments --> PaymentsDB
    Inventory --> InventoryDB
    Notifications --> NotificationsDB
    Files --> FilesDB
```

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Backend Framework** | ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white) |
| **Message Broker** | ![NATS](https://img.shields.io/badge/NATS-199bfc?style=flat&logo=nats&logoColor=white) |
| **Containerization** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens) |
| **API Documentation** | ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black) |

</div>

---

## 📋 Features

### 🔐 Authentication & User Management
- ✅ **User Registration & Login** with email verification
- ✅ **JWT-based Authentication** with role-based access control
- ✅ **Password Management** (reset, change, strength validation)
- ✅ **User Profiles** with address management
- ✅ **Multi-role Support** (Customer, Admin, Seller)

### 🛍️ Product Catalog
- ✅ **Product Management** (CRUD operations)
- ✅ **Category System** with hierarchical structure
- ✅ **Product Reviews & Ratings** with moderation
- ✅ **Advanced Search & Filtering** by price, category, rating
- ✅ **Image Management** with multiple photos per product

### 🛒 Shopping Experience
- ✅ **Shopping Cart** with persistent storage
- ✅ **Order Management** with status tracking
- ✅ **Order History** with detailed information
- ✅ **Order Cancellation** with automatic stock release

### 💳 Payment Processing
- ✅ **Multiple Payment Methods** (Credit Card, PayPal, Digital Wallets)
- ✅ **Secure Payment Processing** with encryption
- ✅ **Refund Management** with partial refund support
- ✅ **Payment Method Storage** for quick checkout

### 📊 Inventory Management
- ✅ **Real-time Stock Tracking** across multiple warehouses
- ✅ **Stock Reservations** for pending orders
- ✅ **Low Stock Alerts** with automatic notifications
- ✅ **Stock Movement History** for audit trails

### 🔔 Notifications
- ✅ **Multi-channel Notifications** (Email, SMS, In-app)
- ✅ **User Preferences** for notification types
- ✅ **Order Updates** (confirmation, shipping, delivery)
- ✅ **Admin Alerts** (low stock, system issues)

### 📁 File Management
- ✅ **File Upload** with validation and processing
- ✅ **Image Optimization** with multiple sizes
- ✅ **Cloud Storage Integration** (AWS S3, Google Cloud)
- ✅ **CDN Support** for fast content delivery

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+)
- **Docker & Docker Compose**
- **PostgreSQL** (if running locally)
- **Git**

### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ahmed-Yacine/microservices_project.git
cd microservices_e-commerce
```

2. **Start the infrastructure**
```bash
# Start databases and message broker
docker-compose up -d nats users-db products-db orders-db payments-db inventory-db notifications-db files-db
```

3. **Install dependencies for each service**
```bash
# Install dependencies for all services
./scripts/install-dependencies.sh
```

4. **Set up environment variables**
```bash
# Copy environment templates
cp .env.example .env
# Edit .env file with your configuration
```

5. **Run database migrations**
```bash
# Run migrations for all services
./scripts/migrate-databases.sh
```

6. **Start all services**
```bash
# Start all microservices
./start-services.sh
```

### 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **API Gateway** | http://localhost:3000 | Main API endpoint |
| **Swagger Docs** | http://localhost:3000/api | API documentation |
| **NATS Dashboard** | http://localhost:8222 | Message broker monitoring |

---

## 📊 Service Details

<details>
<summary><b>🔐 Users Microservice</b></summary>

**Port:** 3001 | **Database:** users-db (5433)

**Responsibilities:**
- User registration and authentication
- JWT token management
- User profile and address management
- Role-based access control

**Key Endpoints:**
```
POST /auth/register     - User registration
POST /auth/login       - User login
GET  /users/profile    - Get user profile
PUT  /users/profile    - Update user profile
POST /users/addresses  - Add user address
```

</details>

<details>
<summary><b>🛍️ Products Microservice</b></summary>

**Port:** 3002 | **Database:** products-db (5434)

**Responsibilities:**
- Product catalog management
- Category management
- Product reviews and ratings
- Search and filtering

**Key Endpoints:**
```
GET  /products         - List products
GET  /products/:id     - Get product details
POST /products         - Create product (admin)
GET  /categories       - List categories
POST /products/:id/reviews - Add review
```

</details>

<details>
<summary><b>🛒 Orders Microservice</b></summary>

**Port:** 3003 | **Database:** orders-db (5435)

**Responsibilities:**
- Shopping cart management
- Order processing and tracking
- Order status management
- Order history

**Key Endpoints:**
```
POST /cart/items       - Add to cart
GET  /cart            - Get cart
POST /orders          - Create order
GET  /orders          - Get user orders
PUT  /orders/:id/cancel - Cancel order
```

</details>

<details>
<summary><b>💳 Payments Microservice</b></summary>

**Port:** 3004 | **Database:** payments-db (5436)

**Responsibilities:**
- Payment processing
- Payment method management
- Refund processing
- Transaction tracking

**Key Events:**
```
payment.process       - Process payment
payment.add-method    - Add payment method
payment.process-refund - Process refund
```

</details>

<details>
<summary><b>📊 Inventory Microservice</b></summary>

**Port:** 3005 | **Database:** inventory-db (5437)

**Responsibilities:**
- Stock level management
- Stock reservations
- Warehouse management
- Low stock alerts

**Key Events:**
```
inventory.get-stock     - Get stock levels
inventory.reserve-stock - Reserve stock
inventory.update-stock  - Update stock
```

</details>

<details>
<summary><b>🔔 Notifications Microservice</b></summary>

**Port:** 3006 | **Database:** notifications-db (5438)

**Responsibilities:**
- Notification management
- User preferences
- Multi-channel delivery
- Notification history

**Key Events:**
```
notification.send       - Send notification
notification.get-user   - Get user notifications
notification.mark-read  - Mark as read
```

</details>

<details>
<summary><b>📁 Files Upload Microservice</b></summary>

**Port:** 3007 | **Database:** files-db (5439)

**Responsibilities:**
- File upload and storage
- Image processing
- File metadata management
- CDN integration

**Key Endpoints:**
```
POST /upload           - Upload file
GET  /files/:id        - Get file
DELETE /files/:id      - Delete file
```

</details>

<details>
<summary><b>📧 Email/SMS Microservice</b></summary>

**Port:** 3008

**Responsibilities:**
- Email template management
- SMTP integration
- SMS delivery
- Delivery tracking

**Key Events:**
```
email.send            - Send email
sms.send              - Send SMS
email.send-template   - Send templated email
```

</details>

---

## 🔄 Development Workflow

### 📱 Event-Driven Communication

Our microservices communicate through **NATS** using an event-driven pattern:

```typescript
// Example: Order creation flow
1. User creates order → Orders Service
2. Orders Service → 'inventory.reserve-stock' → Inventory Service
3. Orders Service → 'payment.process' → Payments Service
4. Payment success → 'notification.order-created' → Notifications Service
5. Notifications Service → 'email.send' → Email Service
```

### 🏗️ Development Phases

#### 📍 **Phase 1: Core Foundation** *(In Progress)*
- [x] Project structure setup
- [x] Database schemas design
- [ ] Users microservice implementation
- [ ] Products microservice implementation
- [ ] HTTP API Gateway implementation

#### 📍 **Phase 2: E-commerce Flow** *(Planned)*
- [ ] Inventory microservice
- [ ] Orders microservice
- [ ] Payments microservice

#### 📍 **Phase 3: Supporting Services** *(Planned)*
- [ ] Notifications microservice
- [ ] Files upload microservice
- [ ] Email/SMS microservice

#### 📍 **Phase 4: Advanced Features** *(Future)*
- [ ] Search & Analytics
- [ ] Admin Dashboard
- [ ] Mobile API optimizations

---

## 📚 Documentation

### 📖 API Documentation
- **Swagger UI**: http://localhost:3000/api
- **Postman Collection**: [Download here](./docs/postman-collection.json)

### 🗄️ Database Schemas
- [Users Schema](./users-microservice/prisma/schema.prisma)
- [Products Schema](./products-microservice/prisma/schema.prisma)
- [Orders Schema](./orders-microservice/prisma/schema.prisma)
- [Payments Schema](./payments-microservice/prisma/schema.prisma)

### 🎨 Architecture Diagrams
- [System Architecture](./diagrams.md)
- [Database ERD](./docs/database-erd.md)
- [Sequence Diagrams](./docs/sequence-diagrams.md)

---

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### 🧪 Test Coverage Goals
- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Complete user journeys
- **Load Tests**: Performance benchmarks

---

## 🚀 Deployment

### 🐳 Docker Deployment

```bash
# Build all services
docker-compose build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### ☁️ Cloud Deployment

<details>
<summary><b>AWS Deployment</b></summary>

- **ECS/Fargate** for container orchestration
- **RDS** for PostgreSQL databases
- **ElastiCache** for Redis caching
- **SQS/SNS** for messaging (alternative to NATS)
- **S3** for file storage
- **CloudFront** for CDN

</details>

<details>
<summary><b>Google Cloud Deployment</b></summary>

- **GKE** for Kubernetes orchestration
- **Cloud SQL** for PostgreSQL
- **Pub/Sub** for messaging
- **Cloud Storage** for files
- **Cloud CDN** for content delivery

</details>

---

## 🔒 Security

### 🛡️ Security Measures
- **JWT Authentication** with refresh tokens
- **Password Hashing** using bcrypt
- **Input Validation** with class-validator
- **SQL Injection Prevention** with Prisma ORM
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for browser security

### 🔐 Environment Security
```bash
# Secure environment variables
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key
```

---

## 📈 Monitoring & Performance

### 📊 Metrics & Monitoring
- **Health Checks** for all services
- **Performance Metrics** with Prometheus
- **Error Tracking** with Sentry
- **Log Aggregation** with ELK Stack

### ⚡ Performance Optimizations
- **Database Indexing** for fast queries
- **Connection Pooling** for database efficiency
- **Caching Strategies** with Redis
- **CDN Integration** for static assets

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### 📋 Development Guidelines
1. Follow **TypeScript** best practices
2. Write **comprehensive tests**
3. Use **conventional commits**
4. Update **documentation**
5. Follow **code review** process

### 🐛 Reporting Issues
Please use our [Issue Template](./.github/ISSUE_TEMPLATE.md) when reporting bugs.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👥 Team

<div align="center">

**Built with ❤️ by the Development Team**

[![GitHub](https://img.shields.io/badge/GitHub-Ahmed--Yacine-black?style=flat&logo=github)](https://github.com/Ahmed-Yacine)

</div>

---

## 🎯 Project Status

<div align="center">

![Development Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0--alpha-blue?style=for-the-badge)
![Build](https://img.shields.io/badge/Build-Passing-green?style=for-the-badge)

**⭐ Star this repository if you find it helpful!**

[🔝 Back to Top](#-e-commerce-microservices-platform)

</div>
