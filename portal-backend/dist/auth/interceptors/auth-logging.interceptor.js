"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthLoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuthLoggingInterceptor = AuthLoggingInterceptor_1 = class AuthLoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(AuthLoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const method = request.method;
        const url = request.url;
        if (user) {
            this.logger.log(`Authenticated Request: ${method} ${url} - User: ${user.sub}`);
        }
        else {
            this.logger.log(`Public Request: ${method} ${url}`);
        }
        const now = Date.now();
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => this.logger.log(`Request completed in ${Date.now() - now}ms`)));
    }
};
exports.AuthLoggingInterceptor = AuthLoggingInterceptor;
exports.AuthLoggingInterceptor = AuthLoggingInterceptor = AuthLoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], AuthLoggingInterceptor);
//# sourceMappingURL=auth-logging.interceptor.js.map