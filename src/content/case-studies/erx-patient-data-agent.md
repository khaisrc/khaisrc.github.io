---
title: "eRx AI Agents"
company: "BlinkRx"
companyUrl: "https://www.blinkrx.com/"
role: "Senior Software Engineer"
period: "2026"
summary: "Two AI agents that extract patient information and classify Nurtec ODT prescriptions from unstructured electronic-prescription notes."
description: "Built and integrated two bounded AI workflows: one extracts patient phone numbers and preferred languages, while the other classifies Nurtec ODT prescriptions as acute or preventive treatment."
techStack: ["Python", "Django", "LangGraph", "LLM integration", "Structured extraction", "eRx workflows", "REST APIs"]
metrics: []
areas: ["AI", "Backend", "Healthcare", "Integrations"]
diagram:
  title: "From prescription to shipment"
  description: "A high-level journey from the doctor's office through pharmacy intake and fulfillment. The highlighted paths show where the two AI workflows contribute."
  src: "/diagrams/erx-journey.svg"
featured: true
order: 7
confidentialityReviewed: true
draft: false
---

## Overview

Electronic prescriptions can contain important workflow information only in free-form notes. Staff had to interpret those notes to find patient contact preferences and, for [Nurtec ODT](https://www.nurtec.com/) prescriptions, determine whether the medication was intended for acute migraine treatment or preventive treatment.

## What I Did

I built two AI agents for the prescription-entry workflow. The first extracts a patient's phone number and preferred language from incoming eRx notes. The second determines whether a Nurtec ODT prescription is intended for acute treatment or preventive treatment.

- Defined bounded tasks with structured outputs instead of building general-purpose assistants.
- Integrated the patient-information agent into the prescription-entry workflow with validation and controlled patient-service updates.
- Partnered with the Data Engineering team, who reviewed MDO notes and provided the regex patterns and AI system instructions; I integrated those artifacts into the Prescription Service and LangGraph workflow.
- Implemented the Nurtec workflow's deterministic first pass as Python regex matching in Prescription Service, then routed notes it could not classify to a LangGraph AI-agent fallback.
- Added staged shadow, assist, and production modes so behavior could be evaluated before downstream writes were enabled.

## Engineering Decisions

The useful unit of AI adoption was a bounded workflow step with a clear input and output. For the Nurtec classifier, matching explicit signals with Python regexes in Prescription Service and reserving the model for ambiguous notes reduced unnecessary AI calls while keeping the integration easier to test and reason about.

## Outcome

The agents introduced structured interpretation of unstructured eRx notes into an established prescription process. One turns patient contact preferences into usable workflow data; the other produces a consistent acute-versus-preventive Nurtec classification for downstream workflows. Accuracy and time-saved measurements were not retained in the available source material, so no quantitative claim is presented here.
