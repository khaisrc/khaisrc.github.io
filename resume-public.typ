#set page(
  paper: "us-letter",
  margin: (x: 0.62in, y: 0.5in),
  footer: context [
    #align(center)[#text(size: 6.5pt, fill: rgb("#ffffff"))[public-web-resume]]
  ],
)
#set text(font: ("Avenir Next", "Arial"), size: 8.6pt, fill: rgb("#171717"))
#set par(justify: false, leading: 0.52em)
#set list(indent: 10pt, body-indent: 4pt, spacing: 3.2pt, marker: [•])
#show link: set text(fill: rgb("#1455d9"))

#let blue = rgb("#1455d9")
#let muted = rgb("#5e5e59")
#let line-color = rgb("#c9c9c1")

#let section(title) = [
  #v(6pt)
  #text(size: 9.5pt, weight: "bold", fill: blue)[#upper(title)]
  #v(2pt)
  #line(length: 100%, stroke: 0.65pt + line-color)
  #v(3pt)
]

#let role(title, company, dates) = [
  #grid(
    columns: (1fr, auto),
    gutter: 12pt,
    [#text(weight: "bold")[#title] #text(fill: muted)[· #company]],
    [#text(fill: muted)[#dates]],
  )
  #v(2pt)
]

#align(center)[
  #text(size: 17pt, weight: "bold")[Khai Nguyen]
  #v(2pt)
  #text(size: 9pt, fill: muted)[Staff-Level Software Engineer · California, US]
  #v(4pt)
  #link("https://www.linkedin.com/in/khainguyen/")[linkedin.com/in/khainguyen] #h(10pt) · #h(10pt) #link("https://github.com/khaister")[github.com/khaister]
]

#section("Summary")
Staff-level software engineer with 10+ years building reliable backend platforms, integrations, and full-stack products across healthcare, real estate, and lending. Experienced across Python/Django, C\#/.NET, TypeScript/React, AWS, PostgreSQL, event-driven systems, architecture, mentoring, and production operations.

#section("Experience")
#role("Senior Software Engineer", "BlinkRx", "Mar 2022 - Jul 2026")
- Built a Python/Django prescription system of record handling approximately 59.5M API requests/month at a 0.0034% 5xx error rate and 101 ms average latency; designed shadow comparisons and feature-flagged migration for incremental cutover from a legacy monolith.
- Designed an asynchronous SQS pharmacy-transfer pipeline with idempotent orchestration, throttling, progress tracking, and operator controls; imported 10,700+ prescriptions across three partner onboardings and replaced 14+ manual steps.
- Led prescription deduplication through three iterations spanning exact, transfer-back, and therapeutic matching; identified 21,627+ duplicates in the latest measured three-month window.
- Built a configurable medication-label platform covering all 50 states and approximately 27K-39K monthly label operations while reducing generation time from over five seconds to under one second.
- Integrated two insurance partners into submission, reversal, webhook, retry, and throttling workflows, adding approximately 323K claims/month.
- Authored eight disaster-recovery runbooks and facilitated four live recovery scenarios, validating a 30-minute recovery time; built and deployed the first production AI agent in BlinkRx's pharmacy-workflow domain.

#v(3pt)
#role("Senior Software Engineer", "Apartments.com · CoStar Group", "Aug 2019 - Mar 2022")
- Designed REST APIs and background services for resident and community messaging workflows deployed in an AWS-hosted VPC, with Kafka-based pub/sub exposure for asynchronous service communication.
- Built a backend service from scratch for online tour scheduling, integrating third-party APIs into production apartment-community workflows.
- Mentored associate developers, onboarded engineers across the Apartments.com codebase, and conducted technical interviews.

#v(3pt)
#role("Software Development Engineer", "QuickBridge", "Oct 2018 - Jul 2019")
- Delivered bidirectional SMS messaging for a loan-processing CRM within three months using Twilio, AngularJS, ASP.NET Core, and SQL Server; led migration from .NET Framework to .NET Core for Linux container hosting.

#v(3pt)
#role("Software Engineer", "CU Direct", "Jun 2015 - Sep 2018")
- Built loan-origination features and NServiceBus publisher/consumer services connecting lending and dealership systems using C\#/.NET, ASP.NET, WPF, and SQL Server; led a TFVC-to-Git migration and trained developers across 4-5 teams.

#section("Skills")
#grid(
  columns: (92pt, 1fr),
  row-gutter: 3pt,
  [#text(weight: "bold")[Backend]], [Python, Django, C\#/.NET, REST APIs, PostgreSQL, SQL Server],
  [#text(weight: "bold")[Cloud & systems]], [AWS, EKS, Kubernetes, SQS, SNS, Kafka pub/sub exposure, NServiceBus, Docker],
  [#text(weight: "bold")[Product & operations]], [TypeScript, React, third-party and AI/LLM integrations, CI/CD, observability, incident response, disaster recovery],
)

#section("Education")
#grid(
  columns: (1fr, auto),
  [#text(weight: "bold")[B.Sc. cum laude, Biochemistry with Computer Science]],
  [California State University, Long Beach],
)
