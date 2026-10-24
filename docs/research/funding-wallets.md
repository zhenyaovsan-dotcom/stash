---
title: Follow funding wallets
description: A repeatable way to trace SOL flows while keeping conclusions evidence-based.
---

# Follow funding wallets

A funding wallet is an address that sent SOL or another asset to a wallet you are investigating. Funding paths can reveal useful relationships, but a shared source is only one clue. Exchanges, custodial services, payment processors and common infrastructure can create links between unrelated users.

<div class="article-meta">ON-CHAIN RESEARCH · INTERMEDIATE · 10 MIN READ · REVIEWED 25 OCT 2026</div>

## Start with a transaction, not a label

Choose one wallet and open its transaction history in a block explorer. Find the transaction that supplied the funds used in the activity you care about. Record the signature, slot, time, amount, sender, receiver and post-transaction balance.

Then follow the sender outward by one hop. Repeat only when the next transaction adds useful evidence. A large graph is not automatically a better graph.

## A careful tracing workflow

1. **Anchor the target.** Record the exact address and the token or launch you are analyzing.
2. **Identify funding events.** Separate direct SOL transfers from token transfers, swaps, rent-exempt account funding and internal program flows.
3. **Check timing.** Compare funding time with account creation, launch transactions and first buys.
4. **Look for repetition.** Similar timing, amounts, repeated routes and coordinated activity may support a hypothesis.
5. **Search for alternative explanations.** Common exchange withdrawals or shared services weaken a claim that wallets share one controller.
6. **Save the evidence.** Keep signatures and exact observations so another person can reproduce the route.

## Teaching example

**Illustrative addresses only.** Wallet A sends 0.8 SOL to Wallet B; Wallet B then buys a newly launched token. This confirms a funding path from A to B before the observed buy. It does not by itself prove A and B are operated by the same person, or that A knew what B would buy.

A second observation—such as repeated funding before several coordinated launches—can increase the strength of a hypothesis, but does not convert it into certainty.

## Confidence ladder

| Level | Example wording |
| --- | --- |
| Observed | “A transferred SOL to B before B’s buy.” |
| Supported hypothesis | “The repeated timing is consistent with coordinated funding.” |
| Unproven | “A and B are definitely the same operator.” |

## Pitfalls

- Treating a wallet-label database as an identity registry.
- Assuming one shared funder means a common owner.
- Ignoring transaction fees and the exact amount available to trade.
- Linking two wallets only because they acted in the same slot.
- Failing to distinguish direct transfers from transactions that merely mention an address.

## Related material

- [Analyze a dev wallet](/research/dev-wallet-analysis)
- [Bundle buys explained](/research/bundle-buys)
- [Facts vs. hypotheses](/research/onchain-evidence)
- [Read a transaction in Solscan](/tools/solscan)
