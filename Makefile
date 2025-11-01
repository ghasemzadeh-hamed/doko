PYTHON ?= python
PIP ?= pip
FRONTEND_DIR := frontend

.PHONY: init precommit lint fmt lint-backend lint-frontend fmt-backend fmt-frontend test backend frontend clean

init:
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt
	npm install --prefix $(FRONTEND_DIR)
	pre-commit install

precommit:
	pre-commit run --all-files

lint: lint-backend lint-frontend

fmt: fmt-backend fmt-frontend

lint-backend:
	black --check .
	isort --check-only --profile=black .
	flake8

fmt-backend:
	black .
	isort --profile=black .

lint-frontend:
	npm run lint --prefix $(FRONTEND_DIR) -- --fix=false

fmt-frontend:
	npm run lint --prefix $(FRONTEND_DIR)
	npm run format --prefix $(FRONTEND_DIR)

test:
	$(PYTHON) manage.py test

backend:
	$(PYTHON) manage.py runserver 0.0.0.0:8000

frontend:
	npm run dev --prefix $(FRONTEND_DIR)

clean:
	rm -rf __pycache__ */__pycache__
	rm -rf $(FRONTEND_DIR)/.next $(FRONTEND_DIR)/node_modules
