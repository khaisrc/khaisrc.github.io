---
title: "Loan Agent SMS Messaging"
company: "QuickBridge"
companyUrl: "https://www.quickbridge.com/"
role: "Software Development Engineer"
period: "2018-2019"
summary: "Bidirectional SMS messaging embedded in an internal loan-processing CRM for communication between agents and applicants."
description: "Delivered the workflow in three months using Twilio, AngularJS, ASP.NET Core, and SQL Server, spanning the messaging API, CRM experience, and deployment."
techStack: ["C#", "ASP.NET Core", "AngularJS", "Twilio", "SQL Server", "REST APIs"]
metrics:
  - value: "3 months"
    label: "Delivery timeframe"
areas: ["Full Stack", "Integrations", "Lending", "Product"]
featured: false
order: 11
confidentialityReviewed: true
draft: false
---

## Overview

Loan-processing agents worked in an internal CRM while applicants primarily responded from their phones. Communication needed to fit both contexts without forcing agents into a separate tool.

## What I Did

I developed and deployed the bidirectional SMS workflow within a three-month delivery window, covering the middle-tier API and CRM integration.

- Integrated Twilio's SMS API with ASP.NET Core services.
- Added AngularJS CRM workflows for conversation-style agent messaging.
- Stored communication state in SQL Server and connected inbound replies to the correct workflow.
- Delivered the feature as part of the existing internal application rather than a separate messaging product.

## Engineering Decisions

The main product decision was to meet each user in the interface they already used. The integration joined those two contexts while keeping conversation state inside the operational CRM.

## Outcome

Agents could send and receive applicant messages from the CRM while applicants continued using standard SMS. Historical monthly volume notes contain inconsistent totals, so they are intentionally omitted.
