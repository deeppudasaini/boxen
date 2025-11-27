"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ClerkAuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClerkAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
let ClerkAuthMiddleware = ClerkAuthMiddleware_1 = class ClerkAuthMiddleware {
    constructor() {
        this.logger = new common_1.Logger(ClerkAuthMiddleware_1.name);
    }
    async use(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (token) {
                const decodedToken = await clerk_sdk_node_1.clerkClient.verifyToken(token);
                req.user = decodedToken;
            }
        }
        catch (error) {
            this.logger.error('Error verifying Clerk token', error);
        }
        next();
    }
};
exports.ClerkAuthMiddleware = ClerkAuthMiddleware;
exports.ClerkAuthMiddleware = ClerkAuthMiddleware = ClerkAuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], ClerkAuthMiddleware);
//# sourceMappingURL=clerk-auth.middleware.js.map