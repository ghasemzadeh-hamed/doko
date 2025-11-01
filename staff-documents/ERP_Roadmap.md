# ERP Capability Roadmap for Doko

This document summarizes the functional gaps identified across the platform and lays out a staged implementation plan. The goal is to deliver an ERP experience competitive with Odoo while balancing scope, time, and resource constraints.

## Current Capability Assessment

The existing repository provides Django models for core entities (customers, orders, simple finance records, HR timesheets) and a Materio-based administrative UI. However, comprehensive ERP suites such as CRM pipelines, WMS, Accounting, Purchase, POS, Helpdesk, HR/Payroll, and Marketing are either missing or implemented only as skeletal placeholders.

Key observations:

- **CRM** lacks visual pipelines, automatic lead scoring/routing, communication logging, and mobile enablement.
- **Website Builder & eCommerce** features (drag-and-drop pages, SEO tooling, catalog storefront, checkout) are absent from the Next.js frontend.
- **Warehouse Management (WMS)** has no multi-warehouse/location logic, routing rules, barcode/lots/serial tracking, or advanced inventory flows.
- **Purchase/Sourcing** workflows for RFQ → PO, supplier preferences, blanket orders, and dropshipping are not present.
- **Accounting/Finance** is limited to expenses and commissions; journals, multi-currency, invoicing, assets, budgets, and tax localization are missing.
- **Point of Sale (POS)** modules are not implemented.
- **Helpdesk**, **HR/Payroll**, **Manufacturing**, **Project/Tasks**, **Marketing**, **Documents/Knowledge**, and vertical solutions (Subscriptions, Rental, Field Service, Fleet, etc.) require full design.
- **DevOps** posture needs secrets management, production-grade databases (PostgreSQL/Redis), CI, and automated testing.

## Strategic Paths

### Path 1 – Integrate with Odoo (fastest to market)

- Treat Doko as the omni-channel/front-office (Next.js + AI) while relying on Odoo for ERP depth.
- Build bidirectional synchronization via the FastAPI connector covering:
  - Products, variants, price lists, and stock levels.
  - Partners (customers & vendors) with segmentation metadata.
  - Sales orders, invoices, payments, delivery status updates.
  - Tickets/helpdesk records for support workflows.
- Surface near real-time updates through webhooks or scheduled sync workers.
- Advantages: leverage Odoo’s mature modules for warehouse, accounting, HR, POS; focus internal effort on differentiating UX and AI capabilities.

### Path 2 – Develop native lightweight cores (mid-term)

- If legal/compliance constraints prevent Odoo usage, prioritize compact Django apps for:
  - **CRM**: pipeline stages, activities, lead import/enrichment.
  - **WMS**: warehouses, locations, stock moves, reorder points, lot/serial support.
  - **Sales & Invoicing**: order lifecycle, basic invoicing, payment capture hooks.
  - **Purchase**: RFQ → PO, vendor lead times, simple 3-way matching.
  - **POS**: minimal register UI tied to orders/inventory.
  - **Accounting**: journals, general ledger, taxes, multi-currency ledgers.
  - **Helpdesk**: ticket pipelines with SLA timers and email automation.
  - **HR/Payroll**: employees, contracts, attendance, leave, payroll rules.
- Introduce modular Django apps with DRF serializers, viewsets, Celery tasks, and comprehensive tests. Standardize Postgres schemas and migrations.
- Implement CI pipelines (lint, unit tests) and enforce secret management (dotenv files excluded from git, use Vault/KMS in production).

### Path 3 – AI-first differentiation (long-term)

- Layer intent-to-order assistants, conversational ordering, predictive replenishment, dynamic pricing, and recommendation engines on top of Path 1 or Path 2 foundations.
- Embed AI agents across CRM, WMS, and Support to automate routine decisions.

## Execution Backlog

### P0 – Operational foundation

1. Launch CRM pipeline, activity tracking, and lead import with scoring hooks.
2. Ship baseline WMS (warehouse/location/move, lot/serial tracking, reorder rules).
3. Deliver Sales + simple invoicing; integrate with payment processors.
4. Provide Purchase RFQ → PO workflow and supplier performance metrics.
5. Release minimal POS or connect to existing POS ecosystem.
6. Harden DevOps: externalize secrets, adopt PostgreSQL/Redis, configure CI with automated tests.

### P1 – Close primary loops

1. Implement Helpdesk with SLA monitoring, email/SMS automation, live chat integration.
2. Expand HR to cover employees, time-off, attendance, expenses, timesheets, approvals, and payroll (localized rules where necessary).
3. Introduce reporting/analytics dashboards (sales, inventory, receivables/payables).

### P2 – Vertical expansion

1. Add manufacturing (BOM, work orders, quality, maintenance) where required.
2. Launch marketing suite (email/SMS automation, social, events, surveys, appointments).
3. Provide documents management, knowledge base/wiki, e-signature, and advanced customization tooling.
4. Explore verticals: subscriptions, rentals, field service, fleet, eLearning, IoT, PLM.

## Immediate Next Steps

1. Decide between Path 1 (Odoo integration) and Path 2 (native build) based on market, compliance, and resource constraints.
2. Appoint module leads and create detailed specifications for the highest-priority P0 backlog items.
3. Establish infrastructure standards (Postgres, Redis, CI/CD, secret management) before scaling features.
4. Schedule discovery workshops with stakeholders to define acceptance criteria for CRM, WMS, Sales, Purchase, POS, and Accounting modules.
5. Implement instrumentation and monitoring to measure adoption and performance as modules roll out.

---

Maintaining this roadmap as modules evolve will help stakeholders track progress and prioritize investments effectively.
