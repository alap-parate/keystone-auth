# strand-auth
A standalone Authentication &amp; Identity microservice that can be integrated into any monolith or microservice ecosystem

## Vision & Scope
The `strand-auth` provides a standalone, extensible authentication and identity layer 
that can be plugged into any application — monolith or microservice.  
- Supports multiple authentication mechanisms (username, email, mobile, 2FA).  
- Designed with token flexibility (JWT or PASETO, hybrid stateful refresh).  
- Enterprise-ready features like RBAC, audit logs, and immediate revocation.  

The goal: make authentication **modular, secure, and easy to integrate** without locking into a specific tech stack.

## Tech Stack
**MVP**
- Framework: NestJS (TypeScript)
- Database: PostgreSQL
- ORM: TypeORM (with Kysely for query flexibility)
- Cache/Revocation: Redis/Valkey
- Authentication Tokens: JWT & PASETO (configurable)
- Containerization: Docker + Docker Compose (deployment-ready)
- Testing: Jest + Supertest

**MVP Features**
- User registeration & login (username, email, mobile with verification)
- 2FA (TOTP) optional
- Token management (JWT or PASETO) with hybrid refresh flow
- Immediate revocation (via Redis)
- Basic RBAC (roles & permissions)

**Future / Roadmap**
- Additional DB support: MariaDB/MySQL
- Messaging Queues: RabbitMQ/Kafka - for OTP, email and audit logging

### 🔒 Security & Authentication
- Passwordless authentication - magic links or OTP-based login
- WebAuthn support

### 👥 Authorization & Governance
- ABAC in addition to RBAC
- Policy engine integration
- Tenant-aware RBAC

### 📊 Observability & Compliance
- Compliance modules - GDPR, SOC2, HIPAA log retention helpers. 
- Rate limiting & anomaly detection – stop brute-force and token abuse.

### ⚙️ Developer & Ops Experience
- Admin dashboard / Management UI – manage users, sessions, policies.
- Configurable deployment modes – monolith-friendly vs microservice-first.

  ---
👐 This project will be completely open-source.  
Contributions, ideas, and discussions are welcome as it evolves.
