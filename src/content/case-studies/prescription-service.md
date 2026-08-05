---
title: "Prescription Service"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2023-2026"
summary: "A greenfield prescription system of record designed to replace fragile legacy workflows without interrupting a regulated pharmacy operation."
description: "Built a Python/Django service and migration framework that moved prescription workflows out of a stored-procedure-heavy monolith through shadow comparisons, incremental flags, and rollback-ready releases."
techStack: ["Python", "Django", "PostgreSQL", "AWS Aurora", "EKS", "Kubernetes", "API Gateway", "GitHub Actions", "New Relic"]
metrics:
  - value: "59.5M"
    label: "API requests per month"
    context: "Approximately, at the latest measurement"
  - value: "0.0034%"
    label: "5xx error rate"
    context: "Measured over six months"
  - value: "101 ms"
    label: "Average API latency"
  - value: "2-3 days"
    label: "Typical feature delivery"
    context: "Previously 1-2 weeks for comparable work"
areas: ["Backend", "Distributed Systems", "Healthcare", "Reliability", "AWS"]
featured: true
order: 1
confidentialityReviewed: true
draft: false
---

## Overview

Prescription workflows depended on a legacy monolith backed by a large body of stored procedures. The system made changes difficult to test, slowed product delivery, and concentrated operational risk in a critical part of the pharmacy lifecycle.

## What I Did

I built the replacement service from its initial foundation through production adoption. My work covered domain models, APIs, infrastructure, observability, and the migration path needed to make a new service the system of record while the existing operation continued to run.

- Established a Python/Django service backed by PostgreSQL on AWS Aurora and deployed to EKS.
- Built APIs for prescription intake, maintenance, fill and dispense lifecycle actions, and supporting pharmacy workflows.
- Ran old and new read paths in parallel, compared outputs, and used granular feature flags for incremental cutover.
- Added API Gateway routing, GitHub Actions delivery pipelines, and New Relic monitoring from the start.
- Kept releases reversible so discrepancies could be isolated without a broad rollback.

## Engineering Decisions

The central challenge was not creating another API. It was changing the source of truth without introducing a risky one-time migration. Parallel evaluation, narrow release controls, and production observability made correctness measurable and allowed the team to move one workflow at a time.

## Outcome

The service became a high-throughput system of record handling approximately 59.5 million requests per month with a 0.0034% server-error rate over the measured six-month period. Moving logic into testable service modules also reduced typical delivery time for new prescription features from one or two weeks to two or three days.
