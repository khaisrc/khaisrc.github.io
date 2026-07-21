---
title: "Resident and Community Messaging"
company: "Apartments.com · CoStar Group"
companyUrl: "https://www.apartments.com/"
role: "Senior Software Engineer"
period: "2019-2022"
summary: "Backend messaging workflows supporting communication between apartment communities and residents."
description: "Designed REST APIs and background services deployed to an AWS-hosted VPC, with exposure to Kafka-based publish/subscribe patterns for asynchronous service communication."
techStack: ["REST APIs", "Background services", "AWS VPC", "Kafka pub/sub exposure", "Service-oriented architecture"]
metrics: []
areas: ["Backend", "Distributed Systems", "Real Estate", "AWS"]
featured: false
order: 9
confidentialityReviewed: true
draft: false
---

## Problem

Resident and community communication required backend workflows that could accept requests through stable APIs and continue processing work asynchronously across services.

## Contribution

I designed and implemented the REST API and background-service components supporting those messaging workflows within the Apartments.com product environment.

## Technical approach

- Separated request-facing API behavior from background processing.
- Deployed the service components within an AWS-hosted VPC.
- Worked with publish/subscribe patterns on Kafka-based infrastructure for asynchronous communication between services.
- Supported the service as part of a larger marketplace product and engineering organization.

## Outcome

The system enabled resident and community messaging workflows within Apartments.com. Message volume and user-impact metrics are not available in the retained source material, so the result is presented qualitatively.

## Engineering judgment

My Kafka experience in this project was at the application and pub/sub pattern level. I do not present it as deep ownership of Kafka operations, partitioning, or cluster design.
