---
title: "Pharmacy Transfer Pipeline"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2024-2026"
summary: "An asynchronous import and export workflow for moving large prescription portfolios between pharmacy partners."
description: "Designed an SQS-based orchestration pipeline with idempotent steps, throttling, progress tracking, and administrative controls for reliable pharmacy onboarding."
techStack: ["Python", "Django", "SQS", "PostgreSQL", "Pillow", "AWS", "Async workers"]
metrics:
  - value: "10,700+"
    label: "Prescriptions imported"
  - value: "3"
    label: "Pharmacy partners supported"
  - value: "14+"
    label: "Manual steps replaced"
areas: ["Backend", "Distributed Systems", "Healthcare", "Integrations", "AWS"]
featured: true
order: 2
confidentialityReviewed: true
draft: false
---

## Problem

Onboarding a pharmacy partner required moving thousands of existing prescriptions into a new operating system. The prior process depended on a long sequence of manual steps, making large transfers difficult to monitor, pause, recover, or repeat safely.

## Contribution

I designed and built the end-to-end transfer workflow, then evolved it from an initial import path into a production pipeline with administrative controls and an accompanying export capability.

## Technical approach

- Decomposed each prescription import into independently retryable subtasks.
- Used SQS workers for asynchronous execution and idempotency controls to make retries safe.
- Added throttling, batch selection, pause and resume controls, and step-level progress reporting.
- Built file validation, conversion, and prescription-image rendering tools.
- Replaced operator scripts with a guided Django administration workflow.

## Outcome

The pipeline imported more than 10,700 prescriptions across three partner onboardings. It replaced more than 14 manual steps with a workflow that operators could start, observe, pause, and resume without direct database or host access.

## Engineering judgment

Large batch work rarely fails as one clean unit. Designing around resumable, idempotent steps made partial failure a routine operating condition instead of an exceptional recovery project.
