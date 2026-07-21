---
title: "State-Specific Dispense Labels"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2025"
summary: "A configurable label-generation system that handles differing pharmacy requirements across all 50 states."
description: "Built preview and print APIs, state-aware templates, and self-service administration while reducing generation time from more than five seconds to under one second."
techStack: ["Python", "Django", "React", "PostgreSQL", "API Gateway", "PDF generation", "AWS"]
metrics:
  - value: "50"
    label: "States covered"
  - value: "27K-39K"
    label: "Label operations per month"
  - value: "<1 sec"
    label: "Generation time"
    context: "Reduced from more than five seconds"
  - value: "0"
    label: "Engineering changes for template updates"
areas: ["Backend", "Full Stack", "Healthcare", "Compliance", "Performance"]
featured: true
order: 4
confidentialityReviewed: true
draft: false
---

## Problem

Medication-label requirements differ by state, but the existing format was rigid. Each regulatory change could require an engineering release, and label generation took long enough to interrupt a pharmacist's workflow.

## Contribution

I built a configurable label platform with separate preview and print paths, grouped state rules, and administrative tools that let operations teams maintain templates directly.

## Technical approach

- Modeled state-specific fields and grouped compatible states into ten reusable template families.
- Built preview and print APIs so pharmacists could validate a label before producing it.
- Added controls for text limits, auxiliary information, substitution text, and pharmacy formatting.
- Exposed template management through Django administration instead of source-code changes.
- Optimized rendering and font handling to produce labels in under one second.

## Outcome

The system supports requirements across all 50 states and processes approximately 27,000 to 39,000 preview, print, and update operations per month. Template changes no longer require an engineering deployment.

## Engineering judgment

The durable solution was not a larger set of conditionals. Treating regulation as configuration created a controlled way to absorb future state changes while keeping validation and rendering behavior consistent.
