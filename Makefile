.PHONY: install-backend install-frontend migrate runserver fastapi fmt lint-backend lint-frontend lint test

install-backend:
	pip install -r requirements.txt

install-frontend:
	npm install

migrate:
	python manage.py migrate

runserver:
	python manage.py runserver

fastapi:
	uvicorn fastapi_app.main:app --reload

fmt:
	pre-commit run --all-files

lint-backend:
	black --check .
	isort --check-only --profile=black .
	flake8

lint-frontend:
	npm run lint

lint: lint-backend lint-frontend

test:
	python manage.py test
