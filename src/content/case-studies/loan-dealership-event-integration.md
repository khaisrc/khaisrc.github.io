---
title: "Loan and Dealership Event Integration"
company: "CU Direct"
companyUrl: "https://www.cudirect.com/"
role: "Software Engineer"
period: "2015-2018"
summary: "Publisher and consumer services connecting a loan-origination platform with dealership-system workflows."
description: "Built NServiceBus microservices for asynchronous communication between lending and dealership systems within a C#/.NET and SQL Server environment."
techStack: ["C#", ".NET", "ASP.NET", "NServiceBus", "SQL Server", "WPF"]
metrics: []
areas: ["Backend", "Distributed Systems", "Integrations", "Lending"]
featured: false
order: 12
confidentialityReviewed: true
draft: false
---

## Overview

Loan-origination and dealership applications needed to exchange workflow events without creating tightly coupled, synchronous dependencies between two enterprise systems.

## What I Did

I built NServiceBus publisher and consumer services that connected the lending platform with dealership workflows as part of a broader C#/.NET product environment.

- Modeled business events around publisher and consumer responsibilities.
- Used asynchronous NServiceBus messaging between the two system contexts.
- Integrated the services with the surrounding ASP.NET and SQL Server application environment.
- Supported related loan-origination functionality in the desktop and web product stack.

## Engineering Decisions

Messaging created a cleaner ownership boundary than direct synchronous coupling. Each application could publish or react to workflow changes while retaining control of its own domain behavior.

## Outcome

The services established asynchronous communication between the loan and dealership systems. The retained material does not contain transaction-volume or time-saved measurements, so the impact is described qualitatively.
