NestJS Clerk Authentication Template
A production-ready NestJS template with Clerk authentication, including guards, middleware, interceptors, and role-based access control.
🏗️ Architecture
System Components
┌─────────────────────────────────────────────────────────────┐
│                         Client App                          │
│                   (Frontend with Clerk)                     │
└────────────────────────┬────────────────────────────────────┘
                         │ Bearer Token
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    NestJS Application                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         ClerkAuthMiddleware (Global)                 │  │
│  │  • Extracts JWT from Authorization header            │  │
│  │  • Validates token with Clerk                        │  │
│  │  • Attaches user to request object                   │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ClerkAuthGuard                          │  │
│  │  • Checks if user exists on request                  │  │
│  │  • Allows @Public() routes to bypass                 │  │
│  │  • Throws UnauthorizedException if not authenticated │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               RolesGuard                             │  │
│  │  • Validates user roles from metadata                │  │
│  │  • Enforces @Roles() decorator requirements          │  │
│  │  • Throws ForbiddenException if insufficient perms   │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          AuthLoggingInterceptor                      │  │
│  │  • Logs authenticated requests                       │  │
│  │  • Tracks response times                             │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Route Handlers                            │  │
│  │  • Access user via @CurrentUser() decorator          │  │
│  │  • Execute business logic                            │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
📁 Project Structure
nestjs-clerk-template/
├── src/
│   ├── auth/
│   │   ├── guards/
│   │   │   ├── clerk-auth.guard.ts      # Main authentication guard
│   │   │   └── roles.guard.ts            # Role-based access control
│   │   ├── middleware/
│   │   │   └── clerk-auth.middleware.ts  # Token extraction & validation
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts # Extract user from request
│   │   │   ├── public.decorator.ts       # Mark routes as public
│   │   │   └── roles.decorator.ts        # Define required roles
│   │   ├── interceptors/
│   │   │   └── auth-logging.interceptor.ts # Request logging
│   │   ├── dto/
│   │   │   └── clerk-user.dto.ts         # User data validation
│   │   ├── interfaces/
│   │   │   └── clerk-jwt.interface.ts    # Type definitions
│   │   ├── auth.module.ts
│   │   └── auth.service.ts               # Clerk integration logic
│   ├── common/
│   │   └── filters/
│   │       └── auth-exception.filter.ts  # Auth error handling
│   ├── config/
│   │   └── clerk.config.ts               # Clerk configuration
│   ├── users/
│   │   ├── users.controller.ts           # Example controller
│   │   ├── users.service.ts              # Example service
│   │   └── users.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
npm or yarn
Clerk account (Sign up here)

Step 1: Clone and Install
bash# Navigate to project directory
cd nestjs-clerk-template

# Install dependencies
npm install
Step 2: Configure Clerk

Go to Clerk Dashboard
Create a new application or select existing one
Navigate to API Keys section
Copy your keys

Step 3: Environment Setup
bash# Copy environment template
cp .env.example .env
Edit .env file:
envPORT=3000
NODE_ENV=development

# Clerk Keys (from Clerk Dashboard)
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
CLERK_JWT_KEY=your_jwt_verification_key

# Optional
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
Step 4: Run the Application
bash# Development mode
npm run start:dev

# Build and run production
npm run build
npm start
The server will start at http://localhost:3000/api
🔐 Authentication Flow
1. Frontend Authentication
typescript// Example: React with Clerk
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';

function App() {
  const { getToken } = useAuth();
  
  const fetchProtectedData = async () => {
    const token = await getToken();
    
    const response = await fetch('http://localhost:3000/api/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.json();
  };
}
2. Backend Processing
typescript// Middleware extracts token → validates → attaches user
// Guard checks authentication
// Controller receives authenticated user

@Controller('users')
@UseGuards(ClerkAuthGuard, RolesGuard)
export class UsersController {
  @Get('profile')
  async getProfile(@CurrentUser() user: ClerkUser) {
    return { user };
  }
}
📖 Usage Examples
Public Routes
typescript@Controller('public')
export class PublicController {
  @Get('info')
  @Public() // No authentication required
  getPublicInfo() {
    return { message: 'This is public' };
  }
}
Protected Routes
typescript@Controller('protected')
@UseGuards(ClerkAuthGuard)
export class ProtectedController {
  @Get('data')
  getProtectedData(@CurrentUser() user: ClerkUser) {
    return { 
      message: 'Protected data',
      userId: user.userId 
    };
  }
}
Role-Based Access
typescript@Controller('admin')
@UseGuards(ClerkAuthGuard, RolesGuard)
export class AdminController {
  @Get('dashboard')
  @Roles(UserRole.ADMIN) // Only admins can access
  getAdminDashboard(@CurrentUser() user: ClerkUser) {
    return { message: 'Admin dashboard' };
  }
  
  @Get('moderator')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR) // Multiple roles
  getModeratorPanel() {
    return { message: 'Moderator panel' };
  }
}
Extracting Specific User Data
typescript@Get('email')
getUserEmail(@CurrentUser('email') email: string) {
  return { email };
}

@Get('id')
getUserId(@CurrentUser('userId') userId: string) {
  return { userId };
}
🔧 Setting User Roles in Clerk
To use role-based guards, set roles in Clerk's public metadata:

Go to Clerk Dashboard → Users
Select a user
Navigate to Metadata tab
Add to Public Metadata:

json{
  "role": "admin"
}
Available roles (defined in clerk-jwt.interface.ts):

user (default)
admin
moderator

🧪 Testing the API
Test Public Endpoint
bashcurl http://localhost:3000/api/users/public
Test Protected Endpoint
bash# Get token from Clerk (via frontend)
TOKEN="your_clerk_jwt_token"

curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:3000/api/users/profile
Test Admin Endpoint
bash# User must have role: "admin" in publicMetadata
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:3000/api/users/admin/all
🛠️ Customization
Add New Roles
Edit src/auth/interfaces/clerk-jwt.interface.ts:
typescriptexport enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  EDITOR = 'editor', // New role
  VIEWER = 'viewer',  // New role
}
Custom Metadata
Access custom metadata from Clerk:
typescript@Get('metadata')
getUserMetadata(@CurrentUser() user: ClerkUser) {
  return {
    publicMetadata: user.publicMetadata,
    privateMetadata: user.privateMetadata
  };
}
Add Custom Guards
typescript// src/auth/guards/custom.guard.ts
@Injectable()
export class CustomGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Your custom logic
    return true;
  }
}
📚 Key Features
✅ Clerk JWT Verification - Secure token validation
✅ Global Authentication Middleware - Automatic token extraction
✅ Flexible Guard System - Fine-grained access control
✅ Role-Based Access Control - Multiple role support
✅ Public Route Decorator - Easy public endpoint marking
✅ Request Logging - Track authenticated requests
✅ Error Handling - Proper auth error responses
✅ Type Safety - Full TypeScript support
✅ Production Ready - Best practices implementation
🔒 Security Best Practices

Never commit .env - Keep credentials secure
Use HTTPS in production - Encrypt tokens in transit
Rotate secrets regularly - Update Clerk keys periodically
Validate input - Use DTOs with class-validator
Rate limiting - Add rate limiting for production
CORS configuration - Restrict allowed origins

📝 Environment Variables
VariableRequiredDescriptionPORTNoServer port (default: 3000)NODE_ENVNoEnvironment (development/production)CLERK_PUBLISHABLE_KEYYesClerk publishable keyCLERK_SECRET_KEYYesClerk secret keyCLERK_JWT_KEYYesJWT verification keyCLERK_WEBHOOK_SECRETNoWebhook signature verificationFRONTEND_URLNoCORS origin (default: *)
🐛 Troubleshooting
"Invalid or expired token"

Verify token is being sent in Authorization: Bearer <token> format
Check token hasn't expired
Ensure Clerk keys are correct in .env

"User role not defined"

Add role to user's public metadata in Clerk Dashboard
Verify role matches enum values in code

"CORS Error"

Set FRONTEND_URL in .env
Check CORS configuration in main.ts

📦 Deployment
Build for Production
bashnpm run build
Environment Variables
Set all required environment variables in your deployment platform:

Heroku: Settings → Config Vars
Vercel: Project Settings → Environment Variables
AWS/GCP: Use secrets management service

Health Check
bashcurl http://your-domain.com/api/users/public
🤝 Contributing
This is a template project. Feel free to customize it for your needs!
📄 License
MIT License - Feel free to use this template for your projects.
🔗 Resources

Clerk Documentation
NestJS Documentation
Clerk + NestJS Guide


Built with ❤️ using NestJS and Clerk