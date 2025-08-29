## Core Goals: 
- Provide secure authentication with flexible login methods.
- Support token-based authentication (JWT/PASETO).
- Enable user verification via email/SMS/Whatapp OTP(Twilio).
- Optional Two-Factor Authentication (TOTP/HOTP).
- Support token refresh with rotation & revocation.
- Allow admin provisioned accounts with verification rules.
- Expose APIs usable across different stacks.

## Features (MVP)
- Registeration (username/email/mobile)
- Verification (email code, SMS/Whatsapp OTP)
- Authentication (username/email/mobile)
- Configurable login strategies (e.g., username+email or email+mobile)
- Optional immediate user revocation using Redis Blacklist
- 2FA via TOTP/HOTP (Authy, Google Authenticator)
- Admin user creation (with enforced verification)

## High Level Design (HLD)
- Will be available in respository

## Low-Level Design (LLD)
### Modules
- Auth Module
- Token Module
- Verification Module
- 2FA Module
- Admin Module
### Database Schema (MVP)
- users → id, username, email, mobile, verified flags, hashed password, 2FA secret.
- refresh_tokens → id, user_id, token, status, expiry.
- revoked_tokens (Redis) → jti (JWT id), expiry.

## API Contracts
POST /auth/register – Register with email/mobile/username.
POST /auth/verify – Submit OTP/email code.
POST /auth/login – Authenticate + get tokens.
POST /auth/refresh – Refresh token rotation.
POST /auth/logout – Invalidate refresh token.
POST /auth/2fa/setup – Setup TOTP/HOTP.
POST /auth/2fa/verify – Verify 2FA code.
POST /admin/users – Create user (with verification flags).

## Security Consideration
- Password hashing: Argon2
- Rate Limiting: login/register endpoints
- CSRF-safe 
- Multi-tenant readiness (add tenant_id if scaling later, optional)
- Secrets rotation

## Development Workflow
Sprint 1 → Basic register/login with JWT.
Sprint 2 → Refresh token rotation.
Sprint 3 → Email/SMS OTP verification.
Sprint 4 → 2FA integration.
Sprint 5 → Admin APIs + revocation.
Sprint 6 → Documentation, tests, observability.

“Work in progress — this will change and improve as Strand Auth develops into a full service.”
“This project will remain completely open source under the MIT license.”
