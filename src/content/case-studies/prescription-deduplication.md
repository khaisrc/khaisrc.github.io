---
title: "Prescription Deduplication"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer · Project Lead"
period: "2024-2026"
summary: "A compliance system that detects duplicate prescription risk across intake, pharmacy transfers, and therapeutic classes."
description: "Led three product and architecture iterations spanning backend detection, user warnings, permissions, event publication, attestations, and operational monitoring."
techStack: ["Python", "Django", "React", "TypeScript", "PostgreSQL", "Event streaming", "Okta", "New Relic"]
metrics:
  - value: "21,627+"
    label: "Duplicates identified"
    context: "Latest measured three-month window"
  - value: "3"
    label: "Major product iterations"
areas: ["Backend", "Full Stack", "Distributed Systems", "Healthcare", "Compliance"]
featured: true
order: 3
confidentialityReviewed: true
draft: false
---

## Overview

Prescription transfers can leave clinically equivalent records active at more than one pharmacy. That creates compliance risk, duplicate operational work, and the possibility of processing the same therapy twice.

## What I Did

I led the project through three iterations and paired with another engineer across design and implementation. The work expanded from exact prescription matching to transfer-back scenarios and, later, therapeutic duplicates across different medications.

- Implemented matching rules across prescription, patient, prescriber, drug, quantity, and transfer context.
- Added API and React workflows for warnings, review, deactivation, and permission-controlled actions.
- Published events for downstream visibility and built monitoring around detection outcomes.
- Introduced explicit record links and attestations so users could resolve ambiguous cases without discarding audit context.
- Rolled out each capability as a bounded iteration instead of combining every compliance rule into one release.

## Engineering Decisions

Deduplication in a regulated domain is not just a matching algorithm. The design had to expose why a record matched, preserve human review for ambiguous cases, and record the decision path for later investigation.

## Outcome

The system identified more than 21,627 duplicate prescriptions in the latest measured three-month window. The product gave pharmacy teams a consistent way to detect, review, and resolve duplicate risk before it became downstream operational work.
