# Implementation Plan and Microservice Level Architecture

This document outlines the complete implementation plan for the email
based AI automation system using three services: Gateway API, AI Engine,
and Frontend. It also maps all tasks to the product requirements and
specifies the technologies used across the stack.

## Overview of Technologies

-   LangChain Framework in Typescript for AI agent based mail processing
    and RAG maintenance
-   NestJS for CRUD backend with Clerk for authentication, signup, and
    account linking
-   Postgres for structured data
-   Any vector database for knowledge bases and user specific RAG
    storage
-   React with Vite for frontend

## System Architecture

The system will be composed of three deployable services:

-   Gateway API Service (portal-backend)\
-   AI Engine Service\
-   Frontend Application

The AI Engine contains the Connector module, Queue module, and Worker
RAG module inside a single deployable unit.

------------------------------------------------------------------------

## Service 1: Gateway API Service (NestJS)

### Responsibilities

-   Authentication and authorization using Clerk
-   CRUD operations for users, settings, knowledge bases, documents
-   Store metadata for emails, extracted items, insights
-   Provide APIs to initialize OAuth flows for Gmail and Outlook
-   Receive events from AI Engine for email status and updates
-   Forward chat requests to the AI Engine
-   Serve admin endpoints
-   Handle permission logic

### Dedicated Tasks

-   Implement Clerk integration\
-   Create user and account mapping schema\
-   Build connector OAuth endpoints\
-   Implement CRUD endpoints
    -   Knowledge bases\
    -   Documents\
    -   User settings\
    -   Mail metadata\
    -   Extracted items\
-   Chat endpoint that forwards to AI Engine\
-   Admin analytics endpoints\
-   Rate limits and validation

------------------------------------------------------------------------

## Service 2: AI Engine Service (LangChain Typescript)

This service includes multiple internal modules.

### A. Connector Module

#### Responsibilities

-   Gmail OAuth refresh\
-   Outlook OAuth refresh\
-   IMAP polling fallback\
-   Gmail push notification handlers\
-   Normalizing emails upon arrival\
-   Pushing ingestion jobs to Queue module

#### Tasks

-   Gmail OAuth and token refresh logic\
-   Outlook OAuth and refresh logic\
-   IMAP worker\
-   Push callback handlers\
-   Unified email normalization layer\
-   New email job push function

### B. Queue Module

#### Responsibilities

-   Manage ingestion, embedding, extraction, summarization, and reindex
    tasks\
-   Enable retries and dead letter queues\
-   Control processing flow

#### Tasks

-   Configure Redis and BullMQ\
-   Create queues: ingestion, embedding, extraction, summarization\
-   Setup job retry and backoff\
-   Setup monitoring endpoints\
-   Create deadletter queues

### C. Worker and RAG Module

#### Responsibilities

-   Parse email body and extract plain text\
-   Chunking and embedding\
-   Vector upsert operations\
-   RAG retrieval logic\
-   Extraction for tasks, contacts, dates, invoices\
-   Generate summaries and insights\
-   Produce weekly insights\
-   Generate structured action items\
-   Provide chat RAG answers with citations\
-   Draft email replies and follow ups\
-   Reindex KB when needed

#### Tasks

-   Build ingestion worker pipeline\
-   Build text extraction and cleaning logic\
-   Chunking workflow\
-   Embedding generation\
-   Vector DB upsert workflow\
-   Retriever implementation\
-   RAG chat pipeline with citations\
-   Extraction agent for tasks and insights\
-   Summaries: daily and weekly\
-   Draft generation agent\
-   Reindex worker\
-   Logging and performance monitoring

------------------------------------------------------------------------

## Service 3: Frontend Application (React with Vite)

### Responsibilities

-   User interface for mailbox browsing\
-   Chat assistant UI\
-   Insights and summaries dashboard\
-   Settings page\
-   Connector onboarding pages\
-   Knowledge base management UI\
-   Admin pages\
-   Clerk authentication in client

### Tasks

-   Setup Clerk frontend workflow\
-   Build dashboard layout\
-   Build mailbox view\
-   Build chat interface with streaming\
-   Build RAG source inspection UI\
-   Build insights and summaries pages\
-   Build settings and connector setup pages\
-   Build KB management page\
-   Build admin management views\
-   Error handling, loading states, and responsiveness

------------------------------------------------------------------------

## Feature Implementation Plan

Below are all product capabilities mapped to development tasks.

### 1. Email Ingestion and Sync

-   Connector module receives emails\
-   AI Engine processes parsing and extraction\
-   Vector DB stores embeddings\
-   Gateway stores metadata

#### Tasks

-   Gmail sync\
-   Outlook sync\
-   IMAP sync\
-   Normalize and parse email\
-   Extract attachments\
-   Create embeddings\
-   Build RAG entries\
-   Threading logic

### 2. Smart RAG Based Search

-   LangChain based hybrid retrieval\
-   Vector DB for semantic search

#### Tasks

-   Implement text chunker\
-   Build embedding pipeline\
-   Build vector namespaces per user\
-   Develop semantic retriever\
-   Expose a unified search endpoint via AI Engine\
-   UI search experience

### 3. Daily Summaries

-   Worker collects past 24 hours\
-   Generates summary\
-   Stores in summaries table\
-   Display in dashboard

### 4. Weekly Insights

-   Long range summarization\
-   Pattern detection\
-   Categories: relationships, deadlines, recurring topics

#### Tasks

-   Insight summarization agent\
-   Insight categories and schema\
-   Weekly cron job\
-   Dashboard presentation

### 5. Task Extraction and Reminders

#### Tasks

-   Extraction prompts for tasks, deadlines, dates\
-   Parse output to store structured tasks\
-   UI showing detected items\
-   Notification or reminder flow

### 6. Multi Knowledge Base Management

#### Tasks

-   KB creation\
-   Index manually added documents\
-   KB specific RAG\
-   KB management UI

### 7. Chat Assistant

#### Tasks

-   RAG retrieval\
-   Answer generation\
-   Citation linking\
-   Email reply suggestions\
-   Streaming UI\
-   Conversation memory handling

### 8. Admin and Team Support

#### Tasks

-   Role mapping\
-   Admin dashboard\
-   Team members CRUD\
-   Team permissions

------------------------------------------------------------------------

## Development Phases and Milestones

### Phase 1: Foundation

-   Gateway skeleton\
-   AI Engine skeleton\
-   Frontend skeleton\
-   Clerk integration\
-   Database schema

### Phase 2: Email Sync MVP

-   Gmail OAuth\
-   Normalize and parse emails\
-   Basic ingestion worker

### Phase 3: RAG Basics

-   Chunker\
-   Embeddings\
-   Vector DB connection\
-   Simple search

### Phase 4: Full Chat Agent

-   Chat endpoint\
-   RAG agent with citations\
-   Chat UI

### Phase 5: Insights and Summaries

-   Daily summary\
-   Weekly insights\
-   Dashboard

### Phase 6: Extraction and Action Items

-   Tasks detection\
-   Follow ups\
-   Contacts extraction

### Phase 7: Teams and Admin

-   Admin views\
-   Role based access

### Phase 8: Hardening

-   Logging\
-   Monitoring\
-   Load testing

------------------------------------------------------------------------

## Database Model Summary

Tables:

-   users\
-   accounts\
-   settings\
-   emails\
-   attachments\
-   extracted_items\
-   rag_kbs\
-   kb_documents\
-   kb_embeddings\
-   summaries\
-   insights\
-   audit_logs\
-   teams\
-   team_users

------------------------------------------------------------------------

## Vector Database Strategy

-   Use PGVector or any dedicated vector DB\
-   Create namespaces per user or per KB\
-   Store chunk metadata for citations\
-   Implement hybrid retrieval
