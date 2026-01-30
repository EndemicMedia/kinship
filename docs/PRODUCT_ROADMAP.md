# Kinship Technical Feature Specification

*Complete Platform Implementation Requirements*

---

## Table of Contents

1. [Overview](#overview)
2. [Core Platform Features](#core-platform-features)
3. [Alignment & Communication Features](#alignment--communication-features)
4. [Legal & Documentation Features](#legal--documentation-features)
5. [Safety & Trust Features](#safety--trust-features)
6. [Growth & Monetization Features](#growth--monetization-features)
7. [Mobile & Platform Features](#mobile--platform-features)
8. [Expansion & Scale Features](#expansion--scale-features)
9. [Child & Family Features](#child--family-features)
10. [Research & Advocacy Features](#research--advocacy-features)
11. [Technical Architecture](#technical-architecture)
12. [Integration Requirements](#integration-requirements)

---

## Overview

This document specifies all technical features required to build the Kinship platform. Features are organized by functional area and prioritized as:

- **P0 (Critical):** Core functionality, platform cannot operate without these
- **P1 (Important):** Significant value-add, enhances core experience
- **P2 (Nice to Have):** Polish and convenience features
- **P3 (Future):** Long-term vision features

**Total Features:** 250 across 10 functional areas

---

## Core Platform Features

### 1. User Authentication & Identity (6 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F1.1 | Email/password registration | P0 | Basic account creation | bcrypt password hashing, email validation, min 12 chars |
| F1.2 | Email verification | P0 | Verify email ownership | Token-based email verification flow, expiring links |
| F1.3 | Identity verification integration | P0 | Third-party ID verification | Onfido/Jumio API integration, government ID scan, liveness check |
| F1.4 | Profile photo upload | P1 | Optional profile imagery | Image upload, compression (WebP), CDN storage, face detection |
| F1.5 | Two-factor authentication | P1 | Enhanced security option | TOTP/SMS 2FA implementation, backup codes |
| F1.6 | Social login | P2 | Google/Apple OAuth | OAuth 2.0 implementation, account linking |

**Acceptance Criteria:**
- Users cannot browse or match without verified identity
- Identity verification completes in <5 minutes for 90% of users
- All personal data encrypted at rest (AES-256) and in transit (TLS 1.3+)
- Password minimum 12 characters with complexity requirements

---

### 2. Crew Resume (Profile System) (10 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F2.1 | Parenting philosophy statement | P0 | 2-3 sentence core philosophy | Text field, 500 char limit, required, profanity filter |
| F2.2 | Role selection | P0 | Captain/First Mate/Navigator/Deckhand | Enum dropdown, single selection, required |
| F2.3 | Availability signal | P0 | Ready to Sail/Preparing/Exploring | Status indicator, user-selectable, defaults to Exploring |
| F2.4 | Values questionnaire | P0 | 20-30 core values questions | Multi-page form, progress saving, JSONB storage, 5 categories |
| F2.5 | Top values badges | P0 | Auto-generated from questionnaire | Algorithm to extract top 3-5 values, weighted scoring |
| F2.6 | Profile prompts | P1 | 3-5 conversation starter prompts | Text fields, 200 char limits, optional |
| F2.7 | Location & flexibility | P1 | Geographic preferences and mobility | Location autocomplete (Google Places), radius selector, mobility scale 1-5 |
| F2.8 | Timeline expectations | P1 | When user wants to begin | Timeline selector (Now/6mo/1yr/2yr/Exploring), affects matching |
| F2.9 | Photo gallery | P2 | Up to 6 optional photos | Multi-image upload, ordering drag-drop, AI content moderation |
| F2.10 | Video introduction | P2 | 60-second optional video | Video upload, 60s hard limit, transcoding to WebM/MP4, subtitles |

**Values Questionnaire Categories:**

```
1. PARENTING PHILOSOPHY (6 questions)
   - Discipline approach spectrum
   - Education priorities weighting
   - Screen time philosophy
   - Independence vs. protection balance
   
2. LIFESTYLE & LOGISTICS (6 questions)
   - Geographic flexibility rating
   - Work-life balance expectations
   - Financial contribution capacity range
   - Time availability (hours/week)
   
3. CULTURAL & IDENTITY (6 questions)
   - Religious/spiritual approach
   - Cultural traditions importance
   - Language priorities
   - Extended family involvement level
   
4. CONFLICT & COMMUNICATION (6 questions)
   - Conflict resolution style assessment
   - Decision-making approach preference
   - Communication frequency needs
   - Disagreement comfort level
   
5. LONG-TERM VISION (6 questions)
   - 20-year outlook for child
   - Exit/change flexibility rating
   - Relationship evolution openness
   - Success definition (custom text)
```

---

### 3. Project (Crew) System (10 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F3.1 | Project creation wizard | P0 | Guided project setup flow | Multi-step wizard, progress persistence, validation at each step |
| F3.2 | Project name & description | P0 | Identity for the family project | Name 50 char max, description 500 char, required, profanity filter |
| F3.3 | Structure selection | P0 | 2-parent, 3-parent, 1+support, custom | Predefined templates with customization, visual structure diagram |
| F3.4 | Role definitions | P0 | What each role entails in this project | Custom role names, responsibility % per role, editable |
| F3.5 | Open roles listing | P0 | What positions need filling | Role templates, requirements per role, visibility controls |
| F3.6 | Timeline setting | P0 | Exploring → Preparing → Active → Parenting | Phase enum with requirements to progress, automatic & manual transitions |
| F3.6a | Pregnancy activation trigger | P0 | Auto-prompt agreement review on pregnancy | Detect pregnancy announcement → Prompt agreement review → Transition to Active phase |
| F3.6b | Birth registration trigger | P0 | Contract activation at birth | Birth notification → Activate all agreements → Generate final responsibility contracts |
| F3.6c | Milestone-based check-ins | P1 | Automatic reviews at life stages | Trigger alignment reviews at: pregnancy, birth, 1yr, 5yr, school age, adolescence |
| F3.7 | Location specification | P1 | Where the family will be based | Primary location, secondary locations, relocation flexibility |
| F3.8 | Values summary | P1 | Project-level values commitments | Top 10 agreed values, must align with all member values 70%+ |
| F3.9 | Conception path options | P1 | Natural/IVF/Donor/Surrogate/Adoption | Multiple selection allowed, affects legal templates |
| F3.10 | Project visibility controls | P1 | Public/Private/Invite-only | Visibility enum, affects discovery, invitation system for private |
| F3.11 | Extended family circle | P1 | Invite grandparents/aunts/godparents | Dedicated lighter-touch roles, support-only agreements, flexible involvement levels |
| F3.12 | Circle of care visualization | P2 | Visual representation of all contributors | Interactive diagram showing all participants, responsibility percentages, support network |

**Project Structures (Technical Definitions):**

```
STRUCTURE TYPES:
├── TWO_EQUAL
│   └── 2 roles × 50% responsibility each
├── TWO_PRIMARY_SECONDARY
│   └── Primary 70% + Secondary 30% (customizable)
├── THREE_EQUAL
│   └── 3 roles × 33.3% responsibility each
├── THREE_TWO_PLUS_ONE
│   └── 2 × 40% + 1 × 20% (customizable)
├── ONE_PRIMARY_MULTI_SUPPORT
│   └── 1 × 60% + n supporters × remaining % split
├── ROTATING_PRIMARY
│   └── Scheduled rotation with periods defined
└── CUSTOM
    └── User-defined structure, must total 100%
```

---

### 4. Discovery & Matching System (15 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F4.1 | Compass home screen | P0 | Navigation hub for discovery | Quadrant layout: N=Projects seeking, S=People seeking, E=Explorers, W=Your crews |
| F4.2 | Profile card display | P0 | Values-first card layout | Philosophy first, then values badges, photos secondary, swipeable |
| F4.3 | Basic filtering | P0 | Location, role, timeline filters | Multi-select filters, saved filter sets, affects algorithm |
| F4.4 | Save for later (Spyglass) | P0 | Bookmark profiles for review | Unlimited saved profiles, organized by tags, expiry after 90 days |
| F4.5 | Pass functionality | P0 | Skip profiles not matching | Soft pass (resurface after 30 days), hard pass (never show again) |
| F4.6 | Anchor (express interest) | P0 | Structured interest expression | Structured form: proposed roles, reasoning, topic suggestion, 48hr delay |
| F4.7 | Daily anchor limits | P0 | Max 10 anchors per day (free tier) | Rate limiting by tier, resets at midnight UTC, shows remaining |
| F4.8 | Project discovery | P0 | Browse open projects | Project cards, filter by structure/location/timeline, apply to join |
| F4.9 | Compatibility algorithm | P0 | Multi-dimensional matching | 6 dimensions weighted, see spec below |
| F4.10 | Compatibility map display | P0 | Visual alignment visualization | Bar chart by dimension, traffic light colors, highlight discussion topics |
| F4.11 | Mutual interest notification | P0 | Both-anchored alerts | Real-time notification, initiate Docking phase automatically |
| F4.12 | Docking phase flow | P0 | 3 guided topics before free chat | Select topics based on lowest compatibility, must complete all 3 |
| F4.13 | Profile resurfacing | P1 | Passed profiles return after 30 days | Automatic reintroduction, "You passed them before" indicator |
| F4.14 | Advanced filtering | P1 | Multi-dimensional filter options | Filter by compatibility score, values badges, conception path, etc. |
| F4.15 | Compatibility trend analysis | P2 | Show how compatibility might evolve | ML prediction based on similar user journeys |

**Compatibility Algorithm (6 Dimensions):**

| Dimension | Weight | Calculation Method |
|-----------|--------|-------------------|
| Values Alignment | 30% | Cosine similarity on values questionnaire vectors |
| Logistical Fit | 25% | Distance, timeline overlap, availability hours match |
| Communication Style | 15% | Conflict style compatibility matrix |
| Role Complementarity | 15% | Desired role vs. needed role matching |
| Flexibility Match | 10% | Flexibility ratings correlation |
| Long-term Vision | 5% | Text similarity (NLP) on success definitions |

**Compatibility Display (Visual Format):**

```
┌─────────────────────────────────────────┐
│         CREW COMPATIBILITY              │
├─────────────────────────────────────────┤
│ Values          ████████████░░ 85%      │
│ Logistics       ██████████████ 95%      │
│ Communication   ████████░░░░░░ 60%      │ ⚠️ Discuss this
│ Role Fit        ██████████████ 92%      │
│ Flexibility     ██████████░░░░ 75%      │
│ Long-term       ████████████░░ 80%      │
├─────────────────────────────────────────┤
│ 🧭 OVERALL: Strong potential crew       │
│    2 areas need early discussion        │
└─────────────────────────────────────────┘
```

---

## Alignment & Communication Features

### 5. Alignment Framework (12 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F5.1 | Guided conversation topics | P0 | 20 structured discussion prompts | 3-tier system: Required (8), Recommended (7), Advanced (5) |
| F5.2 | Progress tracking | P0 | Visual completion status | Progress bar per tier, unlock next tier when previous complete |
| F5.3 | Answer comparison view | P0 | Side-by-side response display | Diff highlighting for disagreements, "Discuss this" button |
| F5.4 | Conflict flagging | P0 | Automatic disagreement detection | Keyword analysis + sentiment scoring, flag responses >40% divergence |
| F5.5 | Response storage | P0 | Save all alignment answers | JSONB storage, versioned, exportable, timestamped |
| F5.6 | Compatibility scoring per topic | P0 | Algorithm-generated scores | Per-topic compatibility 0-100%, affects overall map |
| F5.7 | Re-discussion prompts | P1 | Revisit topics as views evolve | Automatic prompts every 6 months, or when values drift detected |
| F5.8 | Alignment document export | P1 | PDF/DOCX export of all responses | Formatted export with all Q&A, signatures, timestamps |
| F5.9 | Values evolution tracking | P2 | See how answers change over time | Timeline view of answer history, change highlights |
| F5.10 | Topic customization | P2 | Add custom discussion topics | User-generated topics, shared with project, moderation for public |
| F5.11 | External facilitator mode | P2 | Share alignment with therapist | Temporary read-only access with expiry, audit logged |
| F5.12 | Alignment health score | P2 | Overall alignment wellness metric | Aggregate score accounting for completion, conflicts, staleness |

**Alignment Topics (20 Total):**

```
TIER 1: REQUIRED (Must complete before crew formation)
1. Parenting philosophy & discipline approach
2. Financial contributions & expectations  
3. Authority & decision-making distribution
4. Conflict resolution methods
5. Education & schooling priorities
6. Cultural identity & traditions
7. Religious/spiritual approach
8. Healthcare & medical decisions

TIER 2: RECOMMENDED (Strongly encouraged before formation)
9. Breakup & exit scenarios
10. Death or incapacity planning
11. New romantic partners entering lives
12. Geographic moves & relocation
13. Extended family involvement levels
14. Work-life balance expectations
15. Communication frequency & methods

TIER 3: ADVANCED (Can complete after formation, revisited regularly)
16. Screen time & technology philosophy
17. Discipline escalation procedures
18. Mental health approach & therapy
19. Financial education for child
20. Independence milestones & timeline
```

---

### 6. Messaging & Communication (8 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F6.1 | Guided topic messaging | P0 | Respond to structured prompts | Topic-locked threads, both parties must respond before discussion |
| F6.2 | Free text messaging | P0 | Unlocks after guided completion | Real-time WebSocket messages, encrypted E2E, typing indicators |
| F6.3 | Message notifications | P0 | Email + push for new messages | Batched digest option, per-conversation muting, DND schedule |
| F6.4 | Read status (private) | P1 | User sees own read status, not shared | No read receipts shown to others, reduces pressure |
| F6.5 | Message threading | P1 | Reply to specific messages | Thread view, collapse/expand, quote original message |
| F6.6 | Rich media sharing | P1 | Photos, documents in chat | File upload, preview generation, virus scanning, 10MB limit |
| F6.7 | Message search | P2 | Find past conversations | Full-text search, filter by date/sender/project, export |
| F6.8 | Scheduled messages | P2 | Compose now, send later | Scheduling UI, timezone handling, edit before send |

---

### 7. Ongoing Support System (12 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F7.1 | Regular check-in prompts | P0 | Scheduled alignment reviews | Automated prompts: weekly pulse, monthly review, quarterly deep-dive |
| F7.2 | Milestone tracking | P0 | Project phase progress | Track transitions between phases, celebration moments, requirements met |
| F7.3 | Activity log | P0 | Track all project changes | Immutable audit log, all actions timestamped, filterable by type |
| F7.4 | Conflict early warning | P1 | Detect alignment drift | ML model flags decreased communication, missed check-ins, negative sentiment |
| F7.5 | Re-alignment sessions | P1 | Guided reconciliation flows | Step-by-step conflict resolution wizard, option to involve mediator |
| F7.6 | Role renegotiation tools | P1 | Formal adjustment process | Request change → Discussion → Vote → Update agreements |
| F7.7 | Annual review prompts | P1 | Yearly agreement reviews | Full alignment questionnaire repeated, diff with original, update docs |
| F7.8 | Crew health score | P2 | Overall project wellness metric | Composite score: communication frequency, check-in completion, sentiment |
| F7.9 | Celebration moments | P2 | Mark and celebrate progress | Unlock badges, send congratulations, opt-in sharing with community |
| F7.10 | Resource library per phase | P2 | Phase-appropriate guidance | Curated articles, videos, checklists based on current project phase |
| F7.11 | Life event triggers | P2 | Check-ins after major changes | Detect job change, move, relationship change → prompt alignment review |
| F7.12 | External check-in support | P2 | Therapist/mediator facilitated | Schedule recurring sessions with pro, integrated notes |

**Check-in Schedule (Automated):**

```
FREQUENCY             TYPE                  QUESTIONS       TRIGGERS ACTION
─────────────────────────────────────────────────────────────────────────────
Weekly                Pulse                 1 (rating 1-5)  Low scores → escalate
Monthly               Short Review          3 questions     Track sentiment trends
Quarterly             Alignment Check       Top 5 topics    Compare to baseline
Annually              Full Review           All 20 topics   Update legal docs
Event-triggered       Life Change Review    Relevant topics Based on notification
```

---

## Legal & Documentation Features

### 8. Legal Template System (10 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F8.1 | Co-parenting agreement template | P0 | Customizable legal-ready document | Jurisdiction-specific templates, fillable fields, 7 sections |
| F8.2 | Financial commitment template | P0 | Contribution documentation | Monthly amounts, split formulas, escalation clauses, review schedule |
| F8.3 | Guardianship template | P0 | Backup guardian designation | Primary + secondary guardians, activation conditions, preferences |
| F8.4 | Jurisdiction selector | P0 | Location-specific templates | Multi-jurisdiction support, legal requirement differences, warnings |
| F8.5 | Template customization | P1 | Modify templates for specific needs | Rich text editor, legal field markers, version control |
| F8.6 | Lawyer finder integration | P1 | Connect with family law attorneys | Directory of vetted lawyers, filter by location/specialty, booking |
| F8.7 | Document versioning | P1 | Track changes to agreements | Git-like versioning, diff view, restore previous versions |
| F8.8 | E-signature integration | P2 | DocuSign/HelloSign integration | Multi-party signing, witness requirements, notarization where needed |
| F8.9 | Document expiry/renewal | P2 | Automatic renewal reminders | Set review dates, expiry warnings, renewal workflow |
| F8.10 | Multi-language templates | P2 | Templates in multiple languages | Professional translations, jurisdictional accuracy, sync with English |
| F8.11 | Legal filing pathways | P1 | Direct submission to family courts | Jurisdiction-specific filing workflows, court system integration, submission tracking |
| F8.12 | Court recognition tracking | P1 | Monitor legal status of agreements | Track filing status, court approval, legal enforceability by jurisdiction |
| F8.13 | Automated legal updates | P2 | Sync with jurisdiction law changes | Monitor family law changes, prompt agreement updates, versioning for legal compliance |
| F8.14 | Legal professional network | P1 | Vetted family law attorney directory | Filter by jurisdiction/specialty, booking integration, fee transparency, client reviews |

**Template Jurisdictions (Launch):**

```
TIER 1: LAUNCH
├── California, USA
├── New York, USA
├── Ontario, Canada
├── British Columbia, Canada
└── England & Wales, UK

TIER 2: EXPANSION
├── Netherlands
├── Australia (NSW, Victoria)
├── Germany (Berlin, Munich)
└── Additional US states
```

---

### 9. Exit Management System (12 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F9.1 | Exit type selection | P0 | 7 exit types available | Wizard to select: downgrade, transfer, financial-only, emotional-only, legal exit, full replacement, emergency |
| F9.2 | Notice period management | P0 | Track required notice timeline | Notice period based on role: Captain 12mo, First Mate 9mo, Navigator 6mo, Deckhand 3mo |
| F9.3 | Transition plan builder | P0 | Structured handover documentation | Multi-section form: responsibilities handover, schedule transition, financial transition, communication plan |
| F9.4 | Child continuity plan updates | P0 | Required stability documentation | Template: who stays, routines unchanged, explanation narrative, contact arrangements |
| F9.5 | Mediation integration | P1 | Required pre-exit mediation | Book mediator, video call integration, session notes, all parties attend |
| F9.6 | Replacement member onboarding | P1 | Integrate new crew during transition | Parallel onboarding while exit in progress, overlap period, knowledge transfer |
| F9.7 | Exit documentation archive | P1 | Permanent records | Immutable record, all parties receive copy, stored encrypted indefinitely |
| F9.8 | Post-exit check-ins | P2 | Follow-up with remaining crew | Automated check-ins 1mo, 3mo, 6mo, 12mo post-exit, wellness scoring |
| F9.9 | Exit impact analysis | P2 | Preview of exit effects | Show responsibility redistribution, financial impact, child continuity changes |
| F9.10 | Emergency exit procedures | P2 | Expedited exit for safety | Shortened timeline, automatic mediation bypass, immediate role suspension |
| F9.11 | Exit reversal | P2 | Undo exit before completion | Allow reversal during notice/reflection phases, all parties must agree |
| F9.12 | Exit statistics dashboard | P2 | Anonymized exit data | Show exit reasons, success of mediation, typical notice periods (for research) |

**Exit Process Workflow:**

```
1. EXIT INITIATION
   └── Select exit type → System calculates notice period → All parties notified

2. NOTICE PERIOD (3-12 months based on role)
   └── Countdown timer visible → Regular check-ins → Mediation required

3. REFLECTION PHASE (30 days)
   └── Guided conversations → Optional counseling → Cooling-off period

4. TRANSITION PLANNING (varies)
   └── Handover documentation → Schedule changes → Financial adjustments

5. CHILD CONTINUITY UPDATE (required for any exit)
   └── Stability plan → Age-appropriate narrative → Ongoing contact defined

6. DOCUMENTATION & COMPLETION
   └── All parties sign → Legal docs updated → Archive created → Exit complete
```

---

## Safety & Trust Features

### 10. Safety & Moderation (8 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F10.1 | Report functionality | P0 | Flag concerning behavior | Report reasons: harassment, safety concern, fraud, inappropriate content, other |
| F10.2 | Block functionality | P0 | Prevent contact from user | Hard block: no messages, no discovery, mutual, permanent unless appealed |
| F10.3 | Behavioral flag system | P0 | Automatic concerning pattern detection | Flags: too many anchors (spam), no responses (ghosting), rapid role changes, negative sentiment |
| F10.4 | Moderation queue | P0 | Staff review of reports | Dashboard for moderators, priority scoring, response time SLA, escalation paths |
| F10.5 | Community guidelines | P0 | Clear behavior expectations | Published guidelines, acknowledgment required, regular updates, multilingual |
| F10.6 | Appeal process | P1 | Contest moderation decisions | Structured appeal form, different reviewer, 7-day response SLA, transparent outcomes |
| F10.7 | Crew verification | P2 | Members verify new member experience | Post-integration survey, rating system, public verified badge |
| F10.8 | Safety resources | P2 | Help for users in danger | Links to DV resources, crisis hotlines, legal aid by region, emergency contacts |

---

### 11. Privacy & Verification (10 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F11.1 | Identity verification required | P0 | No access without verified ID | Government ID scan, liveness check, under-13 restriction, verification expires yearly |
| F11.2 | Background check integration | P1 | Optional criminal record check | Third-party service, user-initiated, results shared with project only if consented |
| F11.3 | Profile visibility controls | P1 | Control who can see profile | Options: Everyone, Same role seekers, Invited only, Complete profile first |
| F11.4 | Photo moderation (AI) | P1 | Automatic inappropriate content filtering | NSFW detection, face detection, watermark detection, human review for borderline |
| F11.5 | Data export | P1 | GDPR-compliant data export | Download all personal data in JSON/PDF, includes messages, documents, history |
| F11.6 | Account deletion | P1 | Right to be forgotten | Soft delete (30-day recovery), hard delete (anonymization), legal docs retained |
| F11.7 | Audit log access | P2 | Users see who accessed their data | Log of all views, exports, reports, moderation actions on their account |
| F11.8 | Two-party consent recording | P2 | Optional call recording | Video call recording with all-party consent, stored encrypted, auto-delete 90 days |
| F11.9 | Anonymous feedback | P2 | Report concerns without revealing identity | Anonymous reporting option, limits: 1 per user per project, moderation review |
| F11.10 | Trust score | P2 | Reputation based on behavior | Score based on: verified identity, completed projects, positive verifications, no flags |

---

## Growth & Monetization Features

### 12. Subscription & Monetization (8 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F12.1 | Subscription tiers | P0 | 4 tiers: Explorer (Free), Voyager ($29/mo), Captain ($79/mo), Fleet ($149/project) | Stripe subscription management, proration, billing cycles |
| F12.2 | Payment processing | P0 | Credit card, Apple Pay, Google Pay | Stripe integration, PCI compliance, invoice generation, failed payment recovery |
| F12.3 | Premium matching features | P1 | See who anchored you first (Voyager+) | Feature gating, upgrade prompts, comparison table |
| F12.4 | Advanced compatibility insights | P1 | Detailed dimension analysis (Captain) | Deeper breakdowns, ML insights, compatibility forecasting |
| F12.5 | Legal document customization | P1 | Premium templates (Voyager+) | Extended template library, lawyer-reviewed documents, expedited support |
| F12.6 | Priority support | P1 | Faster response times (Captain) | Separate support queue, <4hr response target, dedicated slack channel option |
| F12.7 | Family plan pricing | P2 | Discount for full project crew (Fleet) | One payment covers all crew members, team billing, usage analytics |
| F12.8 | Referral rewards | P2 | Credits for successful referrals | $10 credit per verified referral, max $100/year, fraud detection |

**Subscription Features Matrix:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            KINSHIP PLANS                                     │
├──────────────────┬──────────────────┬──────────────────┬──────────────────────┤
│   EXPLORER       │   VOYAGER        │   CAPTAIN        │   FLEET              │
│   (Free)         │ ($29/month)      │ ($79/month)      │ ($149/project)       │
├──────────────────┼──────────────────┼──────────────────┼──────────────────────┤
│ • 3 Anchors/day  │ • 10 Anchors/day │ • Unlimited      │ • Whole crew covered │
│ • Basic profile  │ • Full profile   │ • Video profile  │ • All features       │
│ • 5 saved        │ • 50 saved       │ • Unlimited      │ • Legal templates    │
│ • Basic matching │ • See who liked  │ • Priority queue │ • Mediation access   │
│ • Basic legal    │ • Full templates │ • Custom legal   │ • Check-in tools     │
│ • Community      │ • Email support  │ • Priority supp. │ • Dedicated rep      │
│                  │ • Ad-free        │ • Early features │ • Analytics dash     │
└──────────────────┴──────────────────┴──────────────────┴──────────────────────┘
```

---

### 13. Waitlist & Growth (6 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F13.1 | Waitlist system | P0 | Controlled growth management | Registration with email, position tracking, batch invitations |
| F13.2 | Priority access tiers | P0 | Early adopters, referrals prioritized | Scoring system: referrals +10, target audience +5, location +3, early signup +1 |
| F13.3 | Referral tracking | P1 | Track invite sources | Unique referral codes, conversion tracking, reward automation |
| F13.4 | Onboarding cohorts | P1 | Group new users for community | Batch activation, cohort chat rooms, shared onboarding timeline |
| F13.5 | Graduated access | P2 | Slowly unlock features | Unlock schedule based on profile completion, time active, engagement |
| F13.6 | Viral loops | P2 | Encourage organic sharing | Share profile prompt, project announcement feature, success story sharing |

---

## Mobile & Platform Features

### 14. Mobile Applications (16 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F14.1 | iOS native app | P0 | Full-featured iPhone app | Swift/SwiftUI, iOS 15+, iPhone + iPad support, universal binary |
| F14.2 | Android native app | P0 | Full-featured Android app | Kotlin, Android 10+, Material Design 3, phone + tablet layouts |
| F14.3 | Push notifications | P0 | Real-time alerts | FCM/APNs, rich notifications, images, actions, notification grouping |
| F14.4 | Biometric authentication | P0 | Face ID/Touch ID/fingerprint | Native biometric APIs, fallback to PIN, re-auth for sensitive actions |
| F14.5 | Mobile-optimized UI | P0 | Touch-first interface | Large touch targets, swipe gestures, bottom-sheet modals, haptic feedback |
| F14.6 | Offline profile viewing | P1 | Cache saved profiles | Local database sync, read-only when offline, sync on reconnect |
| F14.7 | Background sync | P1 | Keep data current | Background fetch, efficient sync, battery-conscious |
| F14.8 | Image caching | P1 | Fast image loading | Progressive loading, CDN integration, disk cache management |
| F14.9 | Widget support | P2 | Home screen project status | iOS widgets, Android widgets, live activity (iOS 16+), glanceable info |
| F14.10 | Share sheet integration | P2 | Share profiles, projects | Native share functionality, generate preview cards, privacy controls |
| F14.11 | Deep linking | P2 | Direct links to content | Universal links (iOS), App links (Android), deferred deep linking |
| F14.12 | In-app browser | P2 | View external links in-app | WebView with progress, reader mode, open in Safari/Chrome option |
| F14.13 | Photo picker integration | P2 | Native photo selection | PHPicker (iOS), Photo Picker (Android), multiple selection, permissions |
| F14.14 | Video chat integration | P2 | In-app video calls | WebRTC, screen sharing, recording (with consent), call quality metrics |
| F14.15 | Accessibility features | P1 | Full VoiceOver/TalkBack support | Screen reader labels, dynamic type, high contrast, reduce motion |
| F14.16 | App Store optimization | P1 | Metadata, screenshots, ASO | Localized metadata, A/B tested screenshots, keyword optimization |

**Mobile-Specific Gestures:**

```
INTERACTION          ACTION                      FEEDBACK
──────────────────────────────────────────────────────────────
Swipe Up             Save for later              Haptic + visual "Saved to Spyglass"
Swipe Down           Pass                        Haptic + fade out
Swipe Right          Anchor (interest)           Haptic + anchor icon + 48hr message
Swipe Left           View full profile           Slide in full profile modal
Long Press           Quick actions menu          Haptic + context menu
Double Tap           Highlight value             Haptic + highlight animation
Pull Down            Refresh discovery           Loading spinner + haptic
Pinch                Zoom photos                 Standard photo viewer
3D Touch/Haptic      Peek profile                Profile preview popup
```

---

## Expansion & Scale Features

### 15. Multi-Jurisdiction Support (8 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F15.1 | Jurisdiction detection | P0 | Auto-detect user location | IP geolocation + manual override, affects templates shown |
| F15.2 | Legal template library | P0 | 5+ jurisdictions at launch | Separate templates per jurisdiction, lawyer-reviewed, version controlled |
| F15.3 | Jurisdiction-specific warnings | P0 | Compliance notes per region | Database of legal requirements, warnings when feature unavailable in region |
| F15.4 | Multi-currency support | P1 | USD, CAD, GBP, EUR, AUD | Stripe multi-currency, exchange rate display, localized pricing |
| F15.5 | Local lawyer networks | P1 | Vetted attorneys per region | Directory per region, verification process, user ratings, booking integration |
| F15.6 | Regional community managers | P2 | Local support presence | Hire per major market, timezone coverage, local events |
| F15.7 | Jurisdiction migration | P2 | Handle moves between regions | Transfer projects to new jurisdiction, update legal docs, re-verification |
| F15.8 | Cross-border projects | P2 | Support international crews | Multi-jurisdiction legal complexity warnings, recommend international lawyer |

---

### 16. Localization & Internationalization (6 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F16.1 | i18n framework | P0 | Internationalization infrastructure | i18next or similar, string externalization, pluralization, date/number formatting |
| F16.2 | Language translations | P1 | 5+ languages | English (primary), Spanish, French, German, Dutch, professional translation |
| F16.3 | RTL language support | P2 | Right-to-left languages | Arabic, Hebrew support, mirrored layouts, RTL-aware components |
| F16.4 | Localized content | P2 | Region-specific content | Articles, resources, success stories localized by region |
| F16.5 | Cultural customization | P2 | Adapt to cultural norms | Family structure preferences, naming conventions, date formats |
| F16.6 | Translation crowdsourcing | P2 | Community translation platform | Allow user contributions, verification process, translator credits |

---

### 17. Partnership Integrations (12 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F17.1 | Fertility clinic directory | P1 | Partner clinic listings | Database of partner clinics, search/filter, booking integration, commission tracking |
| F17.2 | Family lawyer marketplace | P1 | Vetted attorney connections | Directory with specializations, availability calendar, secure messaging |
| F17.3 | Therapist referral network | P1 | Mental health professionals | Filter by specialty (family, child, trauma), insurance accepted, teletherapy support |
| F17.4 | Mediation service integration | P1 | In-app mediation booking | Partner with 3-5 mediation services, schedule integration, video call room |
| F17.5 | Financial advisor connections | P2 | Family finance planning | Directory of financial planners, specialization in non-trad families, free consultation |
| F17.6 | Parenting class providers | P2 | Education resource partnerships | Online + in-person classes, certification tracking, group discounts |
| F17.7 | Insurance broker partnerships | P2 | Family insurance guidance | Partners who understand multi-parent structures, quote comparison |
| F17.8 | Sperm/egg bank integration | P2 | Known donor coordination | Partner banks, search, legal coordination, shipping tracking |
| F17.9 | Surrogacy agency links | P2 | Vetted surrogacy services | Directory, transparency ratings, cost breakdowns, legal support |
| F17.10 | Adoption agency network | P2 | Adoption pathway support | Partner agencies, process guidance, document management |
| F17.11 | Healthcare provider directory | P2 | Family-friendly doctors | OB/GYNs, pediatricians comfortable with non-trad families, ratings |
| F17.12 | Legal document services | P2 | Automated document filing | Partner with services to file legal docs electronically, status tracking |

---

## Child & Family Features

### 18. Child Development & Tracking (8 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F18.1 | Milestone tracking | P0 | Age-appropriate development markers | Database of milestones by age, check-off system, photos, notes, developmental delay flags |
| F18.2 | Shared care log | P0 | Daily notes accessible to all crew | Daily entries: meals, naps, activities, moods, health, synced real-time |
| F18.3 | Medical record storage | P1 | Secure health information | Vaccination records, allergies, medications, doctor visits, HIPAA-compliant encryption |
| F18.4 | Education tracking | P1 | School information, progress | School contacts, report cards, IEPs, teacher notes, calendar integration |
| F18.5 | Photo/memory sharing | P1 | Private family gallery | Unlimited photo storage, albums, tagging, comments, privacy controls, face recognition |
| F18.6 | Development resources | P2 | Age-appropriate guidance | Articles, videos, checklists based on child's age, expert Q&A |
| F18.7 | Professional consultation booking | P2 | Pediatrician, therapist access | Integrated booking with partner providers, video consultations, shared notes |
| F18.8 | Growth charts | P2 | Height, weight, percentile tracking | Input measurements, auto-generate charts, compare to standards, export PDF |

---

### 19. Family Accountability Framework (14 features)

*Implementing the article's vision: "Those who signed on at the child's birth would be legally tasked with intervening, correcting, and guiding before the state steps in."*

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F19.1 | Behavioral incident logging | P0 | Record concerning child behaviors | Structured incident form: date, behavior, context, severity (1-5), witnesses, immediate response |
| F19.2 | Family intervention protocols | P0 | Required response workflows | Automatic protocol assignment based on severity, escalation timelines, all crew must acknowledge |
| F19.3 | Responsibility activation matrix | P0 | Who responds to what severity | Define crew member roles in intervention: who leads, who supports, decision authority by incident type |
| F19.4 | Intervention tracking | P0 | Log family responses and outcomes | Record: who intervened, what actions taken, timeframe, outcome, follow-up needed |
| F19.5 | Escalation requirements | P0 | When to involve external help | Automatic escalation triggers: repeated incidents, high severity, ineffective intervention |
| F19.6 | Pre-legal intervention proof | P1 | Documentation for potential legal issues | Generate reports showing family intervention attempts, timeline, outcomes (for courts if needed) |
| F19.7 | Professional intervention integration | P1 | Therapist/counselor involvement | Schedule sessions, share incident logs (with consent), track progress, insurance coordination |
| F19.8 | Accountability agreements | P1 | Crew commitments to intervention | Formal document: each member's intervention commitments, response timeframes, accountability measures |
| F19.9 | School/community coordination | P1 | Share appropriate info with institutions | Template communications to schools, incident context sharing (privacy-compliant), coordination protocols |
| F19.10 | Crisis response protocols | P1 | Emergency intervention procedures | 24/7 crew notification system, immediate response assignment, emergency contacts, safety plans |
| F19.11 | Outcome tracking | P2 | Measure intervention effectiveness | Track: behavior change over time, repeat incidents, family cohesion, child well-being indicators |
| F19.12 | State intervention prevention score | P2 | Risk assessment for external involvement | Algorithm: incident severity + frequency + intervention effectiveness = risk level |
| F19.13 | Corrective plan templates | P2 | Structured behavior improvement plans | Age-appropriate templates: goals, crew responsibilities, child involvement, timeline, success metrics |
| F19.14 | Legal system interface | P2 | Court-compliant reporting | Generate court-ready documentation, family intervention history, demonstrate proactive care |

**Accountability Levels (Severity-Based Response):**

```
SEVERITY 1: MINOR ISSUES (Normal childhood challenges)
├── Examples: Occasional defiance, minor property damage, peer conflicts
├── Required Response: Primary parent addresses within 48 hours
├── Documentation: Optional incident log
└── Crew Notification: Awareness only

SEVERITY 2: CONCERNING PATTERNS (Repeated or escalating)
├── Examples: Recurring school issues, persistent lying, bullying behaviors
├── Required Response: Full crew discussion within 1 week
├── Documentation: Required incident log + intervention plan
└── Crew Notification: All members must acknowledge

SEVERITY 3: SERIOUS BEHAVIORS (Potential harm to self/others)
├── Examples: Aggressive violence, stealing, substance experimentation
├── Required Response: Crew meeting within 48 hours + professional consultation
├── Documentation: Detailed log + intervention plan + professional involvement
└── Crew Notification: Immediate alert to all members

SEVERITY 4: CRITICAL INCIDENTS (Immediate safety concerns)
├── Examples: Serious violence, self-harm, illegal activities, endangerment
├── Required Response: Immediate crew mobilization + professional intervention
├── Documentation: Comprehensive report + safety plan + external coordination
└── Crew Notification: Emergency alerts + crisis protocols activated

SEVERITY 5: LEGAL INVOLVEMENT (State already engaged)
├── Examples: Arrests, court orders, CPS investigation, expulsion
├── Required Response: Full crew coordination + legal representation + compliance plan
├── Documentation: All previous interventions + legal coordination + ongoing monitoring
└── Crew Notification: Continuous updates + accountability hearings
```

**Intervention Accountability Contract (Template):**

```
FAMILY ACCOUNTABILITY AGREEMENT
Project: [Family Name]
Child: [Child Name], DOB: [Date]
Crew Members: [All participants with responsibility %]

1. INTERVENTION COMMITMENTS
   Each crew member commits to:
   ☐ Respond to behavioral incidents within assigned timeframes
   ☐ Participate in crew discussions about child well-being
   ☐ Implement agreed-upon interventions consistently
   ☐ Maintain confidentiality except where child safety requires disclosure
   ☐ Coordinate with external professionals as needed
   ☐ Document all significant incidents and responses

2. RESPONSE AUTHORITY BY SEVERITY
   [Matrix showing which crew member has authority at each severity level]

3. ESCALATION PROTOCOLS
   We agree to escalate to professional help when:
   - Repeated interventions show no improvement (3+ similar incidents in 60 days)
   - Severity reaches Level 3 or higher
   - Any crew member expresses concern about handling situation
   - Child requests outside help
   - Legal or institutional involvement begins

4. ACCOUNTABILITY MEASURES
   If a crew member fails to fulfill intervention commitments:
   - First instance: Written reminder + discussion
   - Second instance: Formal mediation
   - Third instance: Responsibility percentage reduction + potential exit discussion

5. CHILD'S RIGHTS
   The child has the right to:
   - Know who is responsible for their well-being
   - Request help from any crew member
   - Participate in age-appropriate intervention planning
   - Request external support (therapist, trusted adult, hotline)
   - Privacy protections (incidents not shared publicly)

Signed: [All crew members with dates]
Review Date: [Annual anniversary]
```

**Pre-Legal Intervention Report (For Courts):**

```
FAMILY INTERVENTION HISTORY
Re: [Child Name], DOB: [Date]
Family Structure: [Project type, crew members, responsibility distribution]
Report Period: [Date range]

DEMONSTRATED FAMILY ACCOUNTABILITY:

1. INCIDENT TRACKING
   Total incidents logged: X
   By severity: Level 1 (X), Level 2 (X), Level 3 (X), Level 4 (X)
   
2. FAMILY INTERVENTIONS
   Crew meetings held: X
   Intervention plans created: X
   Professional consultations: X (therapist, counselor, etc.)
   
3. RESPONSE TIMELINESS
   Average response time: X hours/days
   Adherence to protocols: X%
   All crew participation rate: X%

4. OUTCOMES
   Behavioral improvements: [Description]
   Ongoing challenges: [Description]
   Current interventions: [Description]

5. EXTERNAL COORDINATION
   School involvement: [Details]
   Medical professionals: [Details]
   Community resources: [Details]

CONCLUSION:
This family has demonstrated [strong/moderate/limited] accountability through
documented interventions prior to legal system involvement. [Additional context]

Attachments: Incident logs, intervention plans, professional correspondence
```

---

### 20. Second Generation Features (6 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F20.1 | Child-facing portal | P1 | Age-appropriate family info access | Age-gated views: 6-12, 13-17, 18+, see crew, understand structure, safe content |
| F20.2 | Origin story documentation | P1 | How their family formed | Timeline of family formation, photos, letters from crew, locked until appropriate age |
| F20.3 | Extended family connections | P2 | Manage wider kin relationships | Family tree builder, contact management, event coordination, privacy tiers |
| F20.4 | Alumni network | P2 | Adult children of Kinship families | Forum, events, peer support, advocacy opportunities, research participation |
| F20.5 | Transition to adulthood | P2 | 18+ access and inheritance | Full account access at 18, transfer of records, export all family history |
| F20.6 | Sibling connections | P2 | Connect half-siblings from donors | Opt-in registry, genetic match notifications, supervised introductions |

---

## Research & Advocacy Features

### 21. Analytics & Research (10 features)

| Feature ID | Feature | Priority | Description | Technical Requirements |
|-----------|---------|----------|-------------|----------------------|
| F21.1 | User analytics dashboard | P1 | Platform usage metrics | Engagement tracking, funnel analytics, cohort analysis, real-time dashboard |
| F21.2 | Outcome tracking | P1 | Long-term family success metrics | Projects active, projects dissolved, exit reasons, child well-being surveys |
| F21.3 | A/B testing framework | P1 | Experiment infrastructure | Feature flagging, variant assignment, statistical significance testing, rollout controls |
| F21.4 | Anonymized data export | P2 | Research partnerships | De-identified data exports, IRB compliance, consent management, embargo periods |
| F21.5 | Survey system | P2 | User feedback collection | Periodic surveys, NPS tracking, feature requests, satisfaction scoring |
| F21.6 | Policy brief generation | P2 | Data for advocacy | Automated report generation, anonymized statistics, success stories, export formats |
| F21.7 | Academic API | P2 | Researcher access portal | API for approved researchers, rate limiting, audit logging, ethics compliance |
| F21.8 | Longitudinal studies | P2 | Multi-year tracking | Consent for long-term research, scheduled check-ins, retention incentives |
| F21.9 | Public statistics dashboard | P2 | Transparency reporting | Anonymized public metrics: users, projects, success rates, diversity stats |
| F21.10 | Legislative tracking | P2 | Monitor family law changes | Database of relevant legislation, alerts, advocacy opportunities, impact scoring |

---

## Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KINSHIP ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐                          │
│   │ Web App   │    │ iOS App   │    │Android App│                          │
│   │ (React)   │    │ (Swift)   │    │ (Kotlin)  │                          │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘                          │
│         │                │                │                                  │
│         └────────────────┼────────────────┘                                  │
│                          │                                                   │
│                   ┌──────▼──────┐                                           │
│                   │ API Gateway │                                           │
│                   │ (Kong/AWS)  │                                           │
│                   └──────┬──────┘                                           │
│                          │                                                   │
│         ┌────────────────┼────────────────────────────┐                     │
│         │                │                │           │                     │
│   ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐ ┌───▼────┐                │
│   │  Auth     │   │  Core     │   │  Matching │ │Analytics│                │
│   │  Service  │   │  Service  │   │  Service  │ │Service  │                │
│   └─────┬─────┘   └─────┬─────┘   └─────┬─────┘ └───┬────┘                │
│         │                │                │           │                     │
│   ┌─────▼─────────────────▼────────────────▼───────────▼─────┐             │
│   │              PostgreSQL + Redis                           │             │
│   │         (Primary Database + Cache)                        │             │
│   └──────────────────────┬───────────────────────────────────┘             │
│                          │                                                   │
│   ┌──────────────────────▼───────────────────────┐                          │
│   │              Elasticsearch                    │                          │
│   │           (Search & Analytics)                │                          │
│   └──────────────────────────────────────────────┘                          │
│                                                                              │
│   EXTERNAL INTEGRATIONS:                                                     │
│   ├── Onfido (Identity Verification)                                        │
│   ├── Stripe (Payments)                                                     │
│   ├── SendGrid (Email)                                                      │
│   ├── Twilio (SMS)                                                          │
│   ├── DocuSign (E-signatures)                                               │
│   ├── AWS S3 (Document Storage)                                             │
│   └── Segment (Analytics)                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model (Core Entities)

```
USER
├── id (UUID, PK)
├── email (encrypted, unique)
├── password_hash (bcrypt, cost 12)
├── identity_verified (boolean, default false)
├── verification_expires_at (timestamp, yearly renewal)
├── created_at (timestamp)
├── updated_at (timestamp)
└── deleted_at (timestamp, soft delete)

PROFILE
├── id (UUID, PK)
├── user_id (UUID, FK → User, unique)
├── philosophy_statement (text, 500 char max)
├── sought_role (enum: CAPTAIN|FIRST_MATE|NAVIGATOR|DECKHAND)
├── availability_signal (enum: READY|PREPARING|EXPLORING)
├── values_responses (JSONB, versioned)
├── location (PostGIS geography)
├── location_flexibility_km (integer)
├── timeline_preference (enum)
├── top_values_cache (text[], computed)
├── profile_completeness (integer, 0-100)
└── updated_at (timestamp)

PROJECT
├── id (UUID, PK)
├── name (text, 50 char max)
├── description (text, 500 char max)
├── structure_type (enum)
├── timeline_phase (enum: EXPLORING|PREPARING|ACTIVE|PARENTING)
├── conception_paths (text[], multi-select)
├── location (PostGIS geography)
├── visibility (enum: PUBLIC|PRIVATE|INVITE_ONLY)
├── created_at (timestamp)
└── updated_at (timestamp)

PROJECT_MEMBER
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── user_id (UUID, FK → User)
├── role (text, custom per project)
├── responsibility_percent (integer, 0-100)
├── status (enum: PENDING|ACTIVE|EXITING|EXITED)
├── joined_at (timestamp)
├── exit_initiated_at (timestamp, nullable)
└── exit_completed_at (timestamp, nullable)
└── UNIQUE(project_id, user_id)

ALIGNMENT_DOCUMENT
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── topic_id (integer, FK → Topic)
├── responses (JSONB, {user_id: response})
├── compatibility_scores (JSONB, {user_pair: score})
├── status (enum: PENDING|COMPLETE|NEEDS_REVIEW)

ACCOUNTABILITY_CONTRACT
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── child_id (UUID, FK → Child)
├── intervention_commitments (JSONB, per member)
├── response_authority_matrix (JSONB, by severity)
├── escalation_protocols (JSONB)
├── accountability_measures (JSONB)
├── signed_at (JSONB, {user_id: timestamp})
├── reviewed_at (timestamp, annual)
└── version (integer)

BEHAVIORAL_INCIDENT
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── child_id (UUID, FK → Child)
├── incident_date (timestamp)
├── severity_level (enum: MINOR|CONCERNING|SERIOUS|CRITICAL|LEGAL)
├── behavior_description (text)
├── context (text)
├── witnesses (text[])
├── immediate_response (text)
├── reported_by (UUID, FK → User)
├── crew_notified_at (timestamp)
└── created_at (timestamp)

INTERVENTION_RESPONSE
├── id (UUID, PK)
├── incident_id (UUID, FK → Behavioral_Incident)
├── responding_member (UUID, FK → User)
├── response_type (enum: DISCUSSION|PLAN|PROFESSIONAL|ESCALATION)
├── actions_taken (text)
├── timeline_met (boolean)
├── outcome (text)
├── follow_up_needed (boolean)
├── follow_up_date (date, nullable)
├── professional_involved (text, nullable)
└── created_at (timestamp)

EXTENDED_FAMILY_MEMBER
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── user_id (UUID, FK → User, nullable for external)
├── relationship_type (enum: GRANDPARENT|AUNT_UNCLE|GODPARENT|FRIEND|OTHER)
├── role_description (text)
├── support_type (enum: EMOTIONAL|FINANCIAL|CHILDCARE|EMERGENCY|ADVISORY)
├── commitment_level (integer, 1-5)
├── responsibility_percent (integer, 0-10)
├── availability (text)
├── status (enum: INVITED|ACTIVE|INACTIVE)
└── joined_at (timestamp)
├── last_reviewed_at (timestamp)
└── created_at (timestamp)

ANCHOR
├── id (UUID, PK)
├── from_user_id (UUID, FK → User)
├── to_user_id (UUID, FK → User)
├── to_project_id (UUID, FK → Project, nullable)
├── proposed_roles (JSONB)
├── reason_text (text, 200 char)
├── suggested_topic (text)
├── send_at (timestamp, created_at + 48hrs)
├── status (enum: PENDING|SENT|MUTUAL|DECLINED|EXPIRED)
├── created_at (timestamp)
└── expires_at (timestamp, send_at + 30 days)
└── UNIQUE(from_user_id, to_user_id, to_project_id) WHERE status NOT IN (DECLINED, EXPIRED)

CONVERSATION
├── id (UUID, PK)
├── type (enum: GUIDED|FREE|PROJECT)
├── project_id (UUID, FK → Project, nullable)
├── participants (UUID[], array of user_ids)
├── created_at (timestamp)
└── updated_at (timestamp)

MESSAGE
├── id (UUID, PK)
├── conversation_id (UUID, FK → Conversation)
├── sender_id (UUID, FK → User)
├── content_encrypted (text, E2E encrypted)
├── topic_id (integer, FK → Topic, nullable)
├── attachments (JSONB, file metadata)
├── sent_at (timestamp)
└── edited_at (timestamp, nullable)

EXIT_PROCESS
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── member_id (UUID, FK → User)
├── exit_type (enum: DOWNGRADE|TRANSFER|FINANCIAL_ONLY|EMOTIONAL_ONLY|LEGAL_EXIT|FULL_REPLACEMENT|EMERGENCY)
├── initiated_at (timestamp)
├── notice_period_days (integer, role-dependent)
├── notice_end_date (timestamp, computed)
├── phase (enum: NOTICE|REFLECTION|TRANSITION|COMPLETE)
├── child_continuity_plan (JSONB)
├── mediation_completed (boolean)
├── all_parties_signed (boolean)
├── completed_at (timestamp, nullable)
└── archived (boolean, immutable after completion)

LEGAL_DOCUMENT
├── id (UUID, PK)
├── project_id (UUID, FK → Project)
├── template_type (enum: CO_PARENTING|FINANCIAL|GUARDIANSHIP|CUSTOM)
├── jurisdiction (text)
├── content (JSONB, versioned)
├── version (integer)
├── status (enum: DRAFT|REVIEW|SIGNED|SUPERSEDED)
├── signatures (JSONB, {user_id: {signed_at, ip, signature_id}})
├── docusign_envelope_id (text, nullable)
├── created_at (timestamp)
└── superseded_by (UUID, FK → LEGAL_DOCUMENT, nullable)
```

### Infrastructure Requirements

| Component | Specification | Rationale |
|-----------|---------------|-----------|
| **Hosting** | AWS (primary), GCP (DR) | HIPAA eligible, SOC 2 compliance, global CDN |
| **Compute** | ECS Fargate, Auto-scaling | Serverless containers, cost-effective, easy deploys |
| **Database** | RDS PostgreSQL 15+ | ACID compliance, JSONB support, PostGIS for geo |
| **Cache** | ElastiCache Redis | Session storage, rate limiting, real-time features |
| **Search** | Elasticsearch 8+ | Full-text search, analytics, complex queries |
| **CDN** | CloudFront | Global asset delivery, DDoS protection |
| **File Storage** | S3 + Glacier | Scalable object storage, lifecycle policies |
| **Queue** | SQS + EventBridge | Async processing, event-driven architecture |
| **Monitoring** | DataDog / New Relic | APM, logging, alerting, uptime monitoring |
| **Error Tracking** | Sentry | Real-time error reporting, release tracking |

### Security & Compliance

| Requirement | Implementation | Validation |
|-------------|----------------|------------|
| **Data Encryption at Rest** | AES-256 for all PII, RDS encryption, S3 encryption | Pen test annually |
| **Data Encryption in Transit** | TLS 1.3 minimum, HSTS, certificate pinning (mobile) | SSL Labs A+ rating |
| **Identity Verification** | Onfido integration, government ID + liveness, yearly renewal | 95%+ pass rate |
| **Access Control** | Role-based access, project-scoped permissions, least privilege | Audit quarterly |
| **Audit Logging** | All data access logged, immutable logs, 7-year retention | SOC 2 compliance |
| **Data Retention** | GDPR-compliant, user-controlled, auto-delete options | Legal review annual |
| **Right to Deletion** | Anonymization pipeline, 30-day soft delete, legal docs retained | Test quarterly |
| **Backup & Recovery** | Daily backups, 30-day retention, cross-region replication, <4hr RTO | Test monthly |
| **Penetration Testing** | Annual third-party testing, bug bounty program | Report published |
| **SOC 2 Compliance** | Type 2 certification target, annual audit | By end of year 2 |
| **GDPR Compliance** | Data protection officer, privacy by design, consent management | Legal review ongoing |
| **COPPA Compliance** | Age verification, no users under 18, parental consent | Strict enforcement |

---

## Integration Requirements

### Required Integrations

| Integration | Purpose | Priority | Estimated Cost | Technical Notes |
|-------------|---------|----------|----------------|-----------------|
| **Onfido** | Identity verification | P0 | $2-5/verification | Document + facial verification, 95%+ accuracy |
| **Stripe** | Payment processing | P0 | 2.9% + $0.30/txn | Subscriptions, invoicing, multi-currency |
| **SendGrid** | Transactional email | P0 | $0.10/1K emails | 99.5% deliverability, template engine |
| **AWS S3** | Document storage | P0 | $0.023/GB/month | Encryption, versioning, lifecycle |
| **Sentry** | Error monitoring | P0 | $26/month | Real-time errors, release tracking |
| **DocuSign** | E-signatures | P1 | $25/user/month | Multi-party signing, legal compliance |
| **Twilio** | SMS notifications | P1 | $0.0075/SMS | Global coverage, 2FA codes |
| **Google Places API** | Location autocomplete | P1 | $17/1K requests | Accurate addresses, geocoding |
| **Segment** | Analytics | P1 | $120/month | Event tracking, integrations hub |
| **Intercom** | Customer support | P1 | $74/month | Live chat, help center, bot |
| **Zoom/Daily.co** | Video calls | P2 | $15/host/month | WebRTC, recording, 100 participants |
| **Algolia** | Search | P2 | $1/1K searches | Fast, typo-tolerant, geo-search |
| **Cloudinary** | Image optimization | P2 | $89/month | Transform, compress, CDN |

### Integration Architecture

```
INTEGRATION LAYER (API Gateway + Message Queue)

┌────────────────────────────────────────────────────────────────┐
│                    KINSHIP CORE                                 │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Event Bus (EventBridge / SNS)                                 │
│  ├── user.verified → Send welcome email (SendGrid)             │
│  ├── anchor.mutual → Create conversation + Notify (Twilio/Push)│
│  ├── project.formed → Generate legal docs (DocuSign)           │
│  ├── exit.initiated → Schedule mediation (Calendly)            │
│  └── payment.succeeded → Update subscription (Stripe webhook)  │
│                                                                 │
│  Webhook Handlers (verified with signatures)                   │
│  ├── /webhooks/stripe → Payment events                         │
│  ├── /webhooks/onfido → Verification results                   │
│  ├── /webhooks/docusign → Signature completions                │
│  └── /webhooks/twilio → SMS delivery status                    │
│                                                                 │
│  API Clients (with retry + circuit breaker)                    │
│  ├── Onfido → verify_identity(user_id, document)               │
│  ├── Stripe → create_subscription(user_id, plan)               │
│  ├── SendGrid → send_email(template, recipient, vars)          │
│  ├── Twilio → send_sms(phone, message)                         │
│  ├── DocuSign → create_envelope(doc, signers)                  │
│  └── Google Places → autocomplete(query)                       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### Integration Resilience

| Pattern | Implementation | Purpose |
|---------|----------------|---------|
| **Circuit Breaker** | Hystrix or similar, fail after 5 errors | Prevent cascade failures |
| **Retry with Backoff** | Exponential backoff, max 3 retries | Handle transient errors |
| **Timeout** | 10s for API calls, 30s for documents | Prevent hanging |
| **Fallback** | Graceful degradation, queue for later | Maintain availability |
| **Rate Limiting** | Per-integration limits, tracking | Stay within quotas |
| **Webhook Verification** | Signature validation, replay prevention | Security |
| **Idempotency** | Idempotency keys, deduplication | Prevent duplicates |

---

*Document Version: 1.0*  
*Last Updated: January 2026*  
*Status: Living Document*  
*Related: [PLATFORM_STRATEGY.md](./PLATFORM_STRATEGY.md)*
