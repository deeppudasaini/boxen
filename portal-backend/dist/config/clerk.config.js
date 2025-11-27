"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('clerk', () => ({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    jwtKey: process.env.CLERK_JWT_KEY,
}));
//# sourceMappingURL=clerk.config.js.map