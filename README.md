# 🚀 nest-auth-boilerplate

A **production-ready (work in progress) authentication boilerplate** built with [NestJS](https://nestjs.com/).  
This project provides a **scalable, enterprise-grade foundation** for handling authentication and authorization in your applications.

---

## ✨ Features

- ✅ **JWT Authentication** (Access & Refresh tokens)  
- ✅ **Session Management** (revocation & rotation)  
- ✅ **Role-based Authorization (RBAC)**  
- ✅ **Password Hashing & Strong Policy**  
- ✅ **Pluggable Database Support** (Postgres & MariaDB via TypeORM)  
- ✅ **Configurable Environment Setup**  
- ✅ **Enterprise-Ready Folder Structure**  
- ✅ **Best Practices** (DTOs, Guards, Interceptors, Pipes)  
- ✅ **Extensible Module Design** (easy to plug into monoliths)  

---

## ⚡️ Quick Start

### 1️⃣ Clone & Install

```bash
git clone https://github.com/alap-parate/nest-auth-boilerplate.git
cd nest-auth-boilerplate
npm install
```

### 2️⃣ Environment Setup

Create a .env file: .env.sample is included in the code

### 3️⃣ Run the Project

npm run start:dev

### 🛠️ Features
- Database - Support TypeORM with Postgres
- Caching using Redis (Optional)
- Seeding
- Centralized Config Service with validations
- Mailer (Brevo)
- Job Queues using BullMQ
- Sign in and Sign up via Email
- RBAC - roles and permissions
- Swagger
- Docker

### 🔮 Vision
The goal of nest-auth-boilerplate is to serve as the go-to authentication starter kit for NestJS projects.
It saves developers from reinventing authentication and ensures a secure, maintainable, and extensible foundation.

### 🤝 Contributing
Contributions are welcome! Please open an issue or submit a PR.
