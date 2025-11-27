# Boxen AI - Setup Instructions

## Overview
Boxen AI is an email-based AI automation system with three main services:
- **portal-backend**: NestJS API with Clerk authentication
- **agent-service**: AI Engine with LangChain
- **frontend**: React application with Vite

## Prerequisites
- Node.js v18+
- PostgreSQL 14+
- Redis (for queue management)
- Clerk account

## Setup Instructions

### 1. Clone and Install

```bash
# Navigate to project directory
cd boxenai

# Install dependencies for all services
cd portal-backend && npm install
cd ../agent-service && npm install
cd ../frontend && npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb boxenai

# Run schema
psql -d boxenai -f portal-backend/schema.sql
```

### 3. Environment Configuration

#### Portal Backend
```bash
cd portal-backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
NODE_ENV=development

# Clerk Keys
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=boxenai

FRONTEND_URL=http://localhost:5173
```

#### Agent Service
```bash
cd agent-service
cp .env.example .env
```

Edit `.env`:
```env
OPENAI_API_KEY=sk-xxxxx
REDIS_HOST=localhost
REDIS_PORT=6379
```

#### Frontend
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### 4. Start Services

#### Terminal 1 - Portal Backend
```bash
cd portal-backend
npm run start:dev
```

#### Terminal 2 - Agent Service
```bash
cd agent-service
npm run dev
```

#### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Project Structure

```
boxenai/
├── portal-backend/          # NestJS API
│   ├── src/
│   │   ├── auth/           # Clerk authentication
│   │   ├── users/          # User management
│   │   └── config/         # Configuration
│   └── schema.sql          # Database schema
├── agent-service/           # AI Engine
│   ├── src/
│   │   ├── connector/      # Email connectors
│   │   ├── queue/          # Job queues
│   │   └── worker/         # RAG workers
│   └── package.json
└── frontend/                # React app
    ├── src/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Development Workflow

### Running Tests
```bash
# Portal backend
cd portal-backend
npm test

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Portal backend
cd portal-backend
npm run build
npm run start:prod

# Agent service
cd agent-service
npm run build
npm start

# Frontend
cd frontend
npm run build
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Ensure database exists: `psql -l | grep boxenai`

### Clerk Authentication Issues
- Verify keys are correct in both frontend and backend
- Check Clerk dashboard for application status
- Ensure CORS is configured properly

### Port Conflicts
- Backend default: 3000
- Frontend default: 5173
- Change ports in respective `.env` files if needed

## Next Steps

Phase 1 is complete! Ready to implement:
- Phase 2: Email Sync MVP
- Phase 3: RAG Basics
- Phase 4: Full Chat Agent
