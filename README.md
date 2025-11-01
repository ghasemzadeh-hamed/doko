# Doko Platform

Doko is a modular operations platform that combines e-commerce, logistics, CRM, HR, and finance
components. The repository contains a Django monolith that exposes REST APIs, a FastAPI service
for lightweight integrations, and a Next.js admin interface based on the Materio template.

## Repository layout

| Path | Description |
| --- | --- |
| `dokoplatform/` | Django project configuration (settings, URLs, Channels, dashboards). |
| `backend/` | Core Django app with domain modules for users, orders, finance, logistics, HR, CRM, and more. |
| `fastapi_app/` | Stand-alone FastAPI microservice (`main.py`). |
| `frontend/` | Next.js admin dashboard (`materio-mui-react-nextjs-admin-template`). |
| `templates/`, `static/` | Server-rendered templates and static assets for the Django admin/apps. |
| `manage.py` | Django management entry point. |
| `requirements.txt` | Python backend dependencies. |
| `package.json` | Root-level JavaScript dependencies shared across tooling. |

## Secure quick start

1. Copy the provided example environment file and tailor it to your deployment:

   ```bash
   cp .env.example .env
   ```

   Populate `DJANGO_SECRET_KEY`, configure `DJANGO_ALLOWED_HOSTS`, and set your PostgreSQL, Redis,
   and frontend variables before running in production. For local development you can keep the
   defaults or point the settings at a SQLite database by exporting `DJANGO_DB_ENGINE=django.db.backends.sqlite3`.
2. Create and activate a Python virtual environment and install dependencies via the provided
   `Makefile` helpers:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   make install-backend
   ```
3. Apply migrations and launch the backend services:

   ```bash
   make migrate
   make runserver
   ```

4. (Optional) Start the FastAPI integration service and the Next.js dashboard in separate shells:

   ```bash
   make fastapi
   cd frontend && npm run dev
   ```

Redis is required when enabling Django Channels or background workers. Provision an instance (for
example, via Docker or a managed cloud service) and surface its connection string through
`REDIS_URL`.

## Backend (Django) quick start

The backend now defaults to PostgreSQL credentials sourced from environment variables. Production
deployments **must** set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, and the `POSTGRES_*` values.
For development, the `dev` settings module gracefully falls back to SQLite if PostgreSQL variables
are absent. Use `DJANGO_SETTINGS_MODULE=dokoplatform.settings.prod` when running collectstatic or
deploying.

## FastAPI service

The `fastapi_app/main.py` module exposes an auxiliary API. Run it locally with:

```bash
uvicorn fastapi_app.main:app --reload
```

You can proxy this service behind the primary Django app or deploy it independently.

## Frontend (Next.js) dashboard

The `frontend` directory contains the Materio-based admin interface.

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on port 3000 by default. Update the API base URLs in the frontend source to
point at your running Django/FastAPI instances.

## Environment variables

The `.env.example` file documents all supported keys. Key values required for production are:

- `DJANGO_SECRET_KEY`
- `DJANGO_ALLOWED_HOSTS`
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`
- `REDIS_URL` when enabling Channels or task queues
- `NEXT_PUBLIC_API_BASE_URL` for the frontend build pipeline

Set `DJANGO_SETTINGS_MODULE` to `dokoplatform.settings.prod` in production environments so that the
hardening checks (e.g. `DEBUG=False`, secure cookies, PostgreSQL enforcement) take effect.

## Running linting and formatting

- **Backend:** `make fmt` runs the configured `pre-commit` hooks locally, while `make lint-backend`
  performs `black --check`, `isort`, and `flake8` validation.
- **Frontend:** `npm run lint` (also exposed via `make lint-frontend`) executes the ESLint rules and
  Prettier formatting checks used by CI.

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes with appropriate tests.
3. Run the backend migrations and frontend builds where applicable.
4. Submit a pull request describing your changes.

Please ensure sensitive credentials are never committed to version control and review the security
settings before going live.

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

## License and Copyright / مجوز و حق‌کپی

**English:** This project is released under the MIT License. You are free to use, modify, and
distribute the software, provided that the original copyright notice and permission notice are
included in all copies or substantial portions of the software. For full details, refer to the
`LICENSE` file bundled with the repository.

**فارسی:** این پروژه تحت مجوز MIT منتشر شده است. شما می‌توانید نرم‌افزار را استفاده، ویرایش و
توزیع کنید؛ به شرطی که اعلان حق‌کپی و متن مجوز در تمام نسخه‌ها یا بخش‌های قابل توجه نرم‌افزار
گنجانده شود. برای جزئیات کامل، به فایل «LICENSE» موجود در مخزن مراجعه کنید.
