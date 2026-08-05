---
title: "Disaster Recovery Framework"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2024-2026"
summary: "A tested recovery program for a prescription system of record, spanning infrastructure, data, deployment, and observability failure domains."
description: "Authored eight recovery runbooks and facilitated a live gameday that exercised four failure scenarios and validated a 30-minute recovery time."
techStack: ["AWS Aurora", "EKS", "Kubernetes", "Kinesis", "Firehose", "New Relic", "GitHub Actions", "Runbooks"]
metrics:
  - value: "8"
    label: "Recovery runbooks authored"
  - value: "4"
    label: "Live scenarios exercised"
  - value: "30 min"
    label: "Validated recovery time"
areas: ["Reliability", "AWS", "Healthcare", "Operations", "Distributed Systems"]
featured: true
order: 6
confidentialityReviewed: true
draft: false
---

## Overview

As the prescription platform became a system of record, recovery knowledge remained distributed across infrastructure and application owners. A serious failure could stop prescription processing without a shared, tested response path.

## What I Did

I defined the recovery framework, authored eight runbooks across the service's major failure domains, and designed and facilitated a staging gameday with engineers operating the procedures live.

- Documented recovery responsibilities for application, database, cluster, network, stream, secret, delivery, and monitoring failures.
- Defined recovery and data-loss objectives appropriate for a critical pharmacy workflow.
- Exercised restart, failover, point-in-time recovery, and snapshot-restore scenarios.
- Captured timestamped validation evidence and revised the runbooks around gaps discovered during execution.
- Made recovery procedures searchable for faster use during incidents.

## Engineering Decisions

A recovery plan is only a hypothesis until someone follows it under realistic conditions. The gameday measured the procedure, exposed ambiguity, and gave the team a concrete basis for improving readiness.

## Outcome

The gameday executed four real recovery scenarios and validated a 30-minute recovery time. The resulting runbook set turned service recovery from undocumented team knowledge into a repeatable operational capability.
