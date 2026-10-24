---
title: Worked example — wallet cluster
description: A fictional wallet-tracing exercise with evidence and confidence labels.
---

# Worked example: wallet cluster

This walkthrough is deliberately synthetic. All wallet labels, amounts and events below are made up for learning. They are not real addresses, a real token launch, or an allegation about any project.

<div class="article-meta">CASE STUDY · INTERMEDIATE · 12 MIN READ · SYNTHETIC DATA</div>

## The question

A token appears to have three early buyers. A dashboard labels the wallets as a “cluster.” What can an analyst independently verify before reaching a conclusion?

## The supplied teaching observations

| Event | Synthetic observation |
| --- | --- |
| A | Wallet Alpha sends 1.2 SOL to Wallet Birch |
| B | Wallet Alpha sends 0.9 SOL to Wallet Cedar several minutes later |
| C | Birch and Cedar buy the same sample token during the launch window |
| D | Wallet Delta also buys within that window, but has no observed transfer from Alpha in this sample |
| E | Birch later sells a portion; Cedar retains its observed balance at the final snapshot |

No address or transaction identifier is included because these are not real chain events.

## Step 1 — Separate observations

The direct funding paths from Alpha to Birch and Cedar are observations in the fictional dataset. The buys by Birch and Cedar are separate observations. The timing between funding and buys is relevant but does not by itself prove that the funds were specifically intended for those purchases.

## Step 2 — Test the cluster label

Check how the dashboard defines “cluster.” Does it require same-slot transactions, a shared funder, a block-level bundle, or a proprietary score? A label without a documented method should be treated as a lead.

Delta matters: the fourth buyer shows that a cluster label may not map cleanly to “everyone is funded by Alpha.” Do not stretch the evidence to fit a convenient story.

## Step 3 — Write a defensible result

**Supported:** “In the supplied synthetic sample, Alpha sent SOL to Birch and Cedar before their token buys. Birch later sold part of its balance.”

**Possible but not proven:** “Alpha, Birch and Cedar may have coordinated the activity.”

**Unsupported:** “All three wallets are certainly controlled by the developer and the launch is a scam.”

The last statement adds ownership, role and intent claims that the dataset does not contain.

## Step 4 — What additional evidence would help?

- More launch history showing whether the same pattern repeats.
- The full transaction data and accurate program decoding.
- Evidence linking funding, purchases and later exits across multiple events.
- Alternative explanations, including exchange withdrawals or common services.
- A clear definition of the tool’s cluster detection method.

## Takeaway

A useful case study does not need a dramatic accusation. Its value is a reproducible trail, a clear confidence level, and an honest description of what remains unknown.

## Continue

- [Follow funding wallets](/research/funding-wallets)
- [Bundle buys explained](/research/bundle-buys)
- [Facts vs. hypotheses](/research/onchain-evidence)
