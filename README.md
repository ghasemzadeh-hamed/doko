# Doko Platform

<p align="center">
  <a href="https://github.com/sponsors/ghasemzadeh-hamed" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Sponsor-GitHub%20Sponsors-black?logo=githubsponsors" alt="Sponsor on GitHub">
  </a>
  &nbsp;
  <a href="https://tronscan.org/#/address/TFF6hgmr5h5fy8sEJS8sLYN81pm4rarkDM" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Donate-TRX%20(TRON)-red?logo=tron" alt="Donate TRX (TRON)">
  </a>
</p>

Doko is a modular operations platform that combines e-commerce, logistics, CRM, HR, and finance
components. The repository contains a Django monolith that exposes REST APIs, a FastAPI service for
lightweight integrations, and a Next.js admin interface based on the Materio template.

## Table of contents

- [Architecture overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Installation (English)](#installation-english)
- [راهنمای نصب (فارسی)](#راهنمای-نصب-فارسی)
- [Environment variables](#environment-variables)
- [Integrity & stability checks](#integrity--stability-checks)
- [Service quick starts](#service-quick-starts)
- [Contributing](#contributing)
- [💸 Donate (Crypto)](#-donate-crypto)
- [ERP capability roadmap](#erp-capability-roadmap)
- [License / مجوز](#license--مجوز)

## Architecture overview

| Path | Description |
| --- | --- |
| `backend/` | Django project configuration (settings, URLs, ASGI/WSGI). |
| `apps/` | Domain Django apps for partners, catalog, inventory, sales, purchase, CRM, and helpdesk. |
| `fastapi_app/` | Stand-alone FastAPI microservice (`main.py`). |
| `frontend/` | Next.js admin dashboard (`materio-mui-react-nextjs-admin-template`). |
| `templates/`, `static/` | Server-rendered templates and static assets for the Django admin/apps. |
| `manage.py` | Django management entry point. |
| `requirements.txt` | Python backend dependencies. |
| `package.json` | Root-level JavaScript dependencies shared across tooling. |

## Prerequisites

Before installing, ensure the following tooling is available:

- Python 3.11+
- Node.js 18+ and npm
- PostgreSQL 13+ for production deployments (SQLite is supported for local development)
- Redis (required when enabling Django Channels or background workers)
- `virtualenv`/`venv` for Python isolation and `make` for the provided helper targets

Clone the repository and optionally create a Python virtual environment:

```bash
git clone https://github.com/ghasemzadeh-hamed/doko.git
cd doko
python -m venv .venv
source .venv/bin/activate
```

## Installation (English)

1. **Copy the environment template**

   ```bash
   cp .env.example .env
   ```

   Update the secrets (`DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`) and database credentials before
   deploying. For local development you can omit the PostgreSQL settings to fall back to SQLite.

2. **Install backend dependencies**

   ```bash
   pip install -r requirements.txt
   ```

   > If your environment restricts internet access, mirror the packages to an internal index or use
   > the `Makefile` target `make init` after configuring your proxy.

3. **Install frontend dependencies**

   ```bash
   npm install
   ```

4. **Apply database migrations**

   ```bash
   python manage.py migrate
   ```

5. **Run development services**

   ```bash
   python manage.py runserver 0.0.0.0:8000   # Django API
   uvicorn fastapi_app.main:app --reload      # Optional FastAPI integration service
   npm run dev                                # Next.js dashboard on http://localhost:3000
   ```

6. **Generate TypeScript API clients (optional)**

   ```bash
   npm run gen:types
   ```

## راهنمای نصب (فارسی)

۱. **فایل تنظیمات نمونه را کپی کنید**

   ```bash
   cp .env.example .env
   ```

   مقادیر `DJANGO_SECRET_KEY`، `DJANGO_ALLOWED_HOSTS` و اطلاعات پایگاه‌داده را متناسب با محیط خود
   تنظیم کنید. برای توسعهٔ محلی می‌توانید از تنظیمات پیش‌فرض (SQLite) استفاده کنید.

۲. **پیش‌نیازهای بک‌اند را نصب کنید**

   ```bash
   pip install -r requirements.txt
   ```

   > در صورت محدودیت دسترسی به اینترنت، پکیج‌ها را در یک مخزن داخلی آینه کنید یا پس از تنظیم
   > پراکسی از دستور `make init` استفاده نمایید.

۳. **پکیج‌های فرانت‌اند را نصب کنید**

   ```bash
   npm install
   ```

۴. **مهاجرت‌های پایگاه‌داده را اعمال کنید**

   ```bash
   python manage.py migrate
   ```

۵. **سرویس‌ها را اجرا کنید**

   ```bash
   python manage.py runserver 0.0.0.0:8000   # سرویس Django
   uvicorn fastapi_app.main:app --reload      # سرویس FastAPI (اختیاری)
   npm run dev                                # داشبورد Next.js روی آدرس http://localhost:3000
   ```

۶. **تولید کلاینت‌های TypeScript (اختیاری)**

   ```bash
   npm run gen:types
   ```

## Environment variables

The `.env.example` file documents all supported keys. Key values required for production are:

- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`
- `REDIS_URL` when enabling Channels or task queues
- `NEXT_PUBLIC_API_BASE_URL` for the frontend build pipeline

Set `DJANGO_SETTINGS_MODULE` to `backend.settings.prod` in production environments so that the
hardening checks (e.g. `DEBUG=False`, secure cookies, PostgreSQL enforcement) take effect.

## Integrity & stability checks

Use the following commands to validate the stack before deploying:

- **Backend unit tests**

  ```bash
  pytest
  ```

  The test suite relies on `pytest-django`; install it via `pip install -r requirements.txt`. When
  running in restricted networks, configure pip to reach your internal Python package index.

- **Django test runner (alternative)**

  ```bash
  python manage.py test
  ```

- **Backend linting & formatting**

  ```bash
  make lint-backend
  make fmt-backend    # Auto-formats with black and isort
  ```

- **Frontend linting**

  ```bash
  npm run lint
  ```

- **Security hardening review**

  Consult [`README_HARDENING.md`](README_HARDENING.md) for production security
  recommendations, including SSL enforcement, secure cookies, and infrastructure hardening.

## Service quick starts

### Backend (Django)

The backend defaults to PostgreSQL credentials sourced from environment variables. Production
deployments **must** set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, and the `POSTGRES_*` values.
For development, the `dev` settings module gracefully falls back to SQLite if PostgreSQL variables
are absent. Use `DJANGO_SETTINGS_MODULE=backend.settings.prod` when running `collectstatic` or
deploying.

### FastAPI service

The `fastapi_app/main.py` module exposes an auxiliary API. Run it locally with:

```bash
uvicorn fastapi_app.main:app --reload
```

You can proxy this service behind the primary Django app or deploy it independently.

### Frontend (Next.js) dashboard

The `frontend` directory contains the Materio-based admin interface.

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on port 3000 by default. Update the API base URLs in the frontend source to
point at your running Django/FastAPI instances.

With the Django API running locally, generate updated TypeScript definitions for API clients via:

```bash
npm run gen:types
```

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes with appropriate tests.
3. Run the backend migrations and frontend builds where applicable.
4. Submit a pull request describing your changes.

Please ensure sensitive credentials are never committed to version control and review the security
settings before going live.

## 💸 Donate (Crypto)

**TRON (TRX)**  
Address: `TFF6hgmr5h5fy8sEJS8sLYN81pm4rarkDM`  

[![Donate TRX](https://img.shields.io/badge/Donate-TRX%20(TRON)-red?logo=tron)](https://tronscan.org/#/address/TFF6hgmr5h5fy8sEJS8sLYN81pm4rarkDM)

> Only send **TRX / TRC20** assets to this address.

## ERP capability roadmap

The current codebase provides foundational models and an administrative UI, but it does not yet
ship the full breadth of ERP features (advanced CRM pipelines, warehouse management, accounting,
purchase, POS, helpdesk, HR/payroll, marketing, etc.). To coordinate the build-out, see
[`staff-documents/ERP_Roadmap.md`](staff-documents/ERP_Roadmap.md) for:

- A snapshot of missing functionality across backend and frontend services.
- Strategic options (Odoo integration vs. native lightweight modules vs. AI-first differentiation).
- A prioritized backlog (P0/P1/P2) covering CRM, WMS, Sales, Purchase, POS, Accounting, Helpdesk,
  HR, and additional verticals.
- Immediate next steps to align stakeholders, harden infrastructure, and scope the highest-value
  modules.

Keep the roadmap updated as teams deliver modules or change priorities so that contributors have
clear guidance on integration requirements and long-term direction.

## License / مجوز

**English:** This project is released under the MIT License. You are free to use, modify, and
distribute the software, provided that the original copyright notice and permission notice are
included in all copies or substantial portions of the software. For full details, refer to the
`LICENSE` file bundled with the repository.

**فارسی:** این پروژه تحت مجوز MIT منتشر شده است. شما می‌توانید نرم‌افزار را استفاده، ویرایش و
توزیع کنید؛ به شرطی که اعلان حق‌کپی و متن مجوز در تمام نسخه‌ها یا بخش‌های قابل توجه نرم‌افزار
گنجانده شود. برای جزئیات کامل، به فایل «LICENSE» موجود در مخزن مراجعه کنید.
