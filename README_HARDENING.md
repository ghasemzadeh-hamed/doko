# Repository hardening & secret hygiene

This change introduces a baseline hardening pass to keep secrets, local build
artifacts and vendor directories out of version control while also providing a
repeatable developer experience and lightweight CI coverage.

## Highlights

- **Comprehensive `.gitignore`** – prevents accidental commits of virtual
  environments, SQLite databases, `.env` files, SSL material and Node artefacts.
- **Environment templates** – sample configuration files for the Django/Channels
  backend, the FastAPI sidecar and the Next.js frontend live in:
  - `.env.example`
  - `fastapi_app/.env.example`
  - `frontend/.env.example`
- **Editor & tooling defaults** – consistent whitespace/line-ending rules via
  `.editorconfig`, and a refreshed `.pre-commit-config.yaml` that checks for
  secrets, code style and formatting across Python and TypeScript sources.
- **Developer automation** – a new `Makefile` exposes `init`, `lint`, `fmt`,
  `test`, `backend` and `frontend` targets to bootstrap the project, run
  linters/formatters and start dev servers from one place.
- **CI coverage** – GitHub Actions pipelines lint & compile-check the Python
  code on Python 3.11 and lint/build the Next.js frontend with Node 20.
- **Secret clean-up helper** – `scripts/hardening_cleanup.sh` removes tracked
  secrets/databases and (optionally) uses `git-filter-repo` to purge them from
  history.

## Follow-up actions

1. Run `bash scripts/hardening_cleanup.sh` to untrack lingering secrets or
   SQLite databases. If `git-filter-repo` is installed you can opt-in to rewrite
   history to remove the files entirely.
2. Install the updated tooling:

   ```bash
   make init
   ```

3. Configure production-ready environment values:
   - `DJANGO_DEBUG=False`
   - `DJANGO_ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` should list your public
     hostnames.
   - Prefer PostgreSQL via `DATABASE_URL` / `DJANGO_DB_*` instead of SQLite.
   - Provide `REDIS_URL` if you plan to run Channels or background workers.
   - Point `NEXT_PUBLIC_API_BASE_URL` at the deployed backend (`https://YOUR_DOMAIN/api`).
4. Review `dokoplatform/settings` and split settings into dedicated
   `base.py` / `dev.py` / `prod.py` modules if further separation is required.

