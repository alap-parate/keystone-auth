import { registerAs } from '@nestjs/config';
import { toBool, toInt } from './transformers';
import { requireSecret } from './validators';
import ms from 'ms';
import type { StringValue } from 'ms';

export default registerAs('config', () => ({
    app: {
        env: process.env.NODE_ENV ?? 'development',
        name: process.env.APP_NAME ?? 'strand-auth',
        port: toInt(process.env.PORT, 'PORT'),
        apiPrefix: process.env.API_PREFIX ?? 'api',
        frontendDomain: process.env.FRONTEND_DOMAIN ?? 'http://localhost:3000',
        backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost:3000',
    },
    database: {
        type: process.env.DATABASE_TYPE ?? 'postgres',
        host: process.env.DATABASE_HOST,
        port: toInt(process.env.DATABASE_PORT, 'DATABASE_PORT'),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PWD,
        name: process.env.DATABASE_NAME,
        synchronize: toBool(process.env.DATABASE_SYNCHRONIZE),
        maxConnections: toInt(process.env.DATABASE_MAX_CONNECTIONS, 'DATABASE_MAX_CONNECTIONS'),
        sslEnabled: toBool(process.env.DATABASE_SSL_ENABLED),
        rejectUnauthorized: toBool(process.env.DATABASE_REJECT_UNAUTHORIZED),
        ca: process.env.DATABASE_CA,
        key: process.env.DATABASE_KEY,
        cert: process.env.DATABASE_CERT,
        url: 'postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PWD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME,
    },
    auth: {
        secret: requireSecret(process.env.JWT_SECRET, 'secret'),
        expiresIn: ms((process.env.JWT_EXP_IN ?? '15m') as StringValue),
        refreshSecret: requireSecret(process.env.JWT_REFRESH_SECRET, 'refresh-secret'),
        refreshExpiresIn: ms((process.env.JWT_REFRESH_EXP_IN ?? '7d') as StringValue),
        algorithm: process.env.JWT_ALGORITHM ?? 'HS256',
        issuer: process.env.JWT_ISSUER ?? 'strand-auth',
        audience: process.env.JWT_AUDIENCE ?? 'strand-app',
        forgotPasswordSecret: requireSecret(process.env.JWT_FORGOT_PASSWORD_SECRET, 'forgot-password-secret'),
        forgotPasswordExpiresIn: ms((process.env.JWT_FORGOT_PASSWORD_EXP_IN ?? '1h') as StringValue),
        confirmEmailSecret: requireSecret(process.env.JWT_CONFIRM_EMAIL_SECRET, 'confirm-email-secret'),
        confirmEmailExpiresIn: ms((process.env.JWT_CONFIRM_EMAIL_EXP_IN ?? '1h') as StringValue),
        twoFactor: {
            secret: requireSecret(process.env.AUTH_TWO_FACTOR_SECRET, 'two-factor-secret'),
            issuer: process.env.AUTH_TWO_FACTOR_ISSUER ?? 'strand-auth',
            window: toInt(process.env.AUTH_TWO_FACTOR_WINDOW, 'AUTH_TWO_FACTOR_WINDOW'),
            digits: toInt(process.env.AUTH_TWO_FACTOR_DIGITS, 'AUTH_TWO_FACTOR_DIGITS'),
            algorithm: process.env.AUTH_TWO_FACTOR_ALGORITHM ?? 'SHA1',
        }
    },
    mail: {
        provider: process.env.MAIL_PROVIDER ?? 'brevo',
        apiKey: process.env.MAIL_API_KEY,
        smtp: {
            host: process.env.MAIL_SMTP_HOST ?? 'smtp-relay.brevo.com',
            port: toInt(process.env.MAIL_SMTP_PORT ?? '587', 'MAIL_SMTP_PORT'),
            user: process.env.MAIL_SMTP_USER ?? 'your-brevo-user',
            password: process.env.MAIL_SMTP_PWD ?? 'your-brevo-password',
        }, 
        sender: {
            noReplyEmail: process.env.MAIL_SENDER_NOREPLY_EMAIL ?? 'no-reply@strand.com',
            noReplyName: process.env.MAIL_SENDER_NOREPLY_NAME ?? 'strand-auth-no-reply',
            supportEmail: process.env.MAIL_SENDER_SUPPORT_EMAIL ?? 'support@strand.com',
            supportName: process.env.MAIL_SENDER_SUPPORT_NAME ?? 'strand-auth-support',
        }
    }
}))