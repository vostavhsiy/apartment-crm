# 🏢 Apartment CRM — Real Estate and Tenant Management System

A modern **full-stack CRM system** designed for realtors to manage apartments, tenants, and payments. Built as a **production-ready** application with clean architecture, TypeScript across the stack, and a user-friendly interface. Suitable for real estate agencies.

![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?logo=typescript&logoColor=blue)
![NestJS](https://img.shields.io/badge/NestJS-Backend-ea2845?logo=nestjs&logoColor=red)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-61dafb?logo=react&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features

- 🏠 **Property Management** — Adding, editing, and viewing apartments/houses with photos, specifications, and statuses
- 👥 **Tenant Management** — Full tenant profiles, lease agreements, residency history
- 💰 **Financial Module** — Payment tracking, rent accrual, automatic calculation of arrears and penalties
- 📅 **Calendar and Reminders** — Payment deadlines, lease expirations, scheduled repairs
- 🔍 **Search and Filters** — Powerful search across properties, tenants, and payments
- 📊 **Analytics and Reports** — Occupancy rate, profitability, delinquency statistics
- 🔐 **Authorization and Roles** — Support for multiple users with different permissions (admin, manager, accountant)
- 📱 **Responsive Interface** — Convenient use on computers and tablets

---

## 🛠️ Technology Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| Backend          | NestJS + TypeScript          |
| Frontend         | Next.js + TypeScript         |
| Database         | PostgreSQL + Prisma ORM      |
| Authorization    | JWT + Refresh tokens         |
| State            | React Query / TanStack Query |
| UI Library       | shadcn/ui + Tailwind CSS     |
| Forms            | React Hook Form + Zod        |
| Architecture     | FSD + DDD principles         |
| Containerization | Docker + Docker Compose      |

---

## 🏗️ Architecture

The project is divided into two main applications:

```
apartment-crm/
├── apps/
│ ├── api/ # NestJS API (REST + modular structure)
│ └── host/ # Next.js application
└── libs/ # Shared types, utilities, and configs
```

**Main workflow:**

1. Realtor adds an apartment and client through the user-friendly interface
2. NestJS API validates data and saves it to PostgreSQL via Prisma
3. System automatically creates a payment schedule based on the agreement
4. All changes are tracked in real-time thanks to React Query
5. Realtor shares a link to the property with the client for viewing and further discussion
6. Realtor reviews statistics on properties and clients
