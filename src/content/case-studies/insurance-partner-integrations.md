---
title: "Insurance Partner Integrations"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2023"
summary: "Partner-specific insurance APIs integrated behind consistent claim submission, reversal, retry, and monitoring workflows."
description: "Built synchronous and webhook-based integration paths, normalized partner responses, and added retry and throttling controls for production claim processing."
techStack: ["Python", "Django", "REST APIs", "Webhooks", "SQS", "Camunda", "New Relic", "AWS"]
metrics:
  - value: "~323K"
    label: "Claims per month added"
  - value: "2"
    label: "New partner integrations"
areas: ["Backend", "Healthcare", "Integrations", "Distributed Systems", "AWS"]
featured: true
order: 5
confidentialityReviewed: true
draft: false
---

## Problem

New pharmacy-benefit partners exposed different request models, response formats, and asynchronous behaviors. The existing claim path was not designed to absorb those differences cleanly, and failure recovery often required manual attention.

## Contribution

I implemented two production partner integrations and the supporting claim submission, reversal, retry, and observability workflows needed to operate them reliably.

## Technical approach

- Isolated partner-specific request translation and response mapping behind stable internal contracts.
- Supported both immediate API responses and asynchronous webhook completion.
- Added automated retry state and workflow integration for recoverable failures.
- Applied partner-level throttling to protect external APIs and internal workers.
- Built monitoring for claim outcomes and operational investigation.

## Outcome

The integrations added approximately 323,000 insurance claims per month across two new partners while preserving a consistent operating model for submission, reversal, and failure handling.

## Engineering judgment

External integrations should not leak every partner variation into the product. A translation boundary kept the internal workflow stable while explicit retry and rate controls handled the realities of third-party systems.
