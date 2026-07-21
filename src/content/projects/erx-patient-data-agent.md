---
title: "eRx Patient Data Extraction Agent"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2026"
summary: "A production AI agent that converts relevant details from unstructured electronic-prescription notes into structured workflow data."
description: "Built and integrated the first production AI agent in BlinkRx's pharmacy-workflow domain, reducing reliance on manual interpretation of free-form notes."
techStack: ["Python", "Django", "LLM integration", "Structured extraction", "eRx workflows", "REST APIs"]
metrics: []
areas: ["AI", "Backend", "Healthcare", "Integrations"]
featured: true
order: 7
confidentialityReviewed: true
draft: false
---

## Problem

Electronic prescriptions can arrive with useful patient details embedded in free-form notes. Staff had to find and interpret that text while completing an already time-sensitive data-entry workflow.

## Contribution

I built and deployed an AI agent that extracts relevant patient details from unstructured notes and integrated its structured output into the prescription-entry workflow.

## Technical approach

- Defined a narrow extraction task around specific workflow fields instead of a general-purpose assistant.
- Connected the agent to the existing prescription intake path through an explicit service boundary.
- Returned structured data that the surrounding application could validate and use.
- Kept the operational workflow responsible for final handling rather than treating model output as an independent source of truth.

## Outcome

The agent became the first production AI capability in BlinkRx's pharmacy-workflow domain and introduced structured extraction into an established prescription process. Accuracy and time-saved measurements were not retained in the available source material, so no quantitative claim is presented here.

## Engineering judgment

The useful unit of AI adoption was a bounded workflow step with a clear input and output. That made the integration testable and easier to reason about than an open-ended agent with broad operational authority.
