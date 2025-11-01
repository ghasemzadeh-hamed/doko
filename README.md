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

## Backend (Django) quick start

1. **Create and activate a virtual environment** using your preferred tool (e.g. `python -m venv .venv`).
2. **Install dependencies:** `pip install -r requirements.txt`.
3. **Run database migrations:** `python manage.py migrate` (SQLite is used by default).
4. **Create a superuser (optional):** `python manage.py createsuperuser`.
5. **Start the development server:** `python manage.py runserver`.

The backend enables Django Channels and REST Framework, so make sure Redis or other channel layers
are configured before deploying to production.

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

The Django settings currently include hard-coded development values. Before deploying, set the
following environment variables (at a minimum):

- `SECRET_KEY`
- `DEBUG` (set to `False` in production)
- `ALLOWED_HOSTS`
- Database connection settings if you are not using SQLite

For FastAPI/Next.js services, create `.env` files as needed with the credentials required for
external integrations.

## Running linting and formatting

- Python: integrate tools such as `flake8`, `black`, or `isort` as desired (not yet configured).
- Frontend: `npm run lint` and `npm run format` leverage ESLint and Prettier configurations
  included with the template.

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes with appropriate tests.
3. Run the backend migrations and frontend builds where applicable.
4. Submit a pull request describing your changes.

Please ensure sensitive credentials are never committed to version control and review the security
settings before going live.

## License and Copyright / مجوز و حق‌کپی

**English:** This project is released under the MIT License. You are free to use, modify, and
distribute the software, provided that the original copyright notice and permission notice are
included in all copies or substantial portions of the software. For full details, refer to the
`LICENSE` file bundled with the repository.

**فارسی:** این پروژه تحت مجوز MIT منتشر شده است. شما می‌توانید نرم‌افزار را استفاده، ویرایش و
توزیع کنید؛ به شرطی که اعلان حق‌کپی و متن مجوز در تمام نسخه‌ها یا بخش‌های قابل توجه نرم‌افزار
گنجانده شود. برای جزئیات کامل، به فایل «LICENSE» موجود در مخزن مراجعه کنید.
