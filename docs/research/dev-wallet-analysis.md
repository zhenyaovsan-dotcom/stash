---
title: Analyze a dev wallet
description: Inspect creator activity, holdings and early distribution without overstating attribution.
---

# Analyze a dev wallet

“Dev wallet” is a working label traders use for an address believed to be associated with a token creator or launch. It is not a protocol-level identity. Creator fields, fund flows and repeated behavior can help build a picture, but one address rarely tells the entire story.

<div class="article-meta">DEVELOPERS & LAUNCHES · INTERMEDIATE · 11 MIN READ · REVIEWED 25 OCT 2026</div>

## 1. Confirm the starting point

Use the token mint and launch transaction to identify the creator or relevant launch account as exposed by the current program. Verify the mint address against a reliable source. Be precise about whether you mean creator, fee recipient, initial buyer, funder, or a wallet promoted in social posts; these can be different entities.

## 2. Build a compact history

Check the wallet’s first observed activity, funding sources, previous launches, token receipts, sells, SOL outflows and recurring counterparties. Compare several launches, not just the token currently trending. If data comes from a third-party label service, record that provenance.

## 3. Inspect distribution and sells

Look at when early holders acquired tokens, whether balances moved between addresses, and whether large sells occurred during moments of rising attention. A transfer into a new wallet changes the visible distribution but does not prove a new independent holder. A swap that sells a token is direct evidence of an exit transaction, not evidence of motive.

## 4. Use a structured worksheet

| Question | Record |
| --- | --- |
| Which address is being analyzed? | Full address and source of attribution |
| What connects it to the launch? | Creator field, signature, or another reproducible observation |
| Where did its funds come from? | Direct funding transactions and timing |
| What repeated across launches? | Similar patterns with transaction links |
| What alternative explains the pattern? | Exchange, service, common treasury, or unrelated behavior |
| What remains unknown? | Ownership, intent, off-chain coordination |

## Example of a defensible conclusion

**Hypothetical example:** “The address was listed as creator in the launch-related account state. It received SOL from an upstream wallet shortly before the launch and sold a portion of its token balance later.” This wording sticks to observations.

Avoid jumping to “the developer is scamming” solely because a wallet sold. Consider launch disclosures, token distribution, pool state, previous behavior and what evidence would falsify the suspicion.

## What can change

Program versions, token standards and dashboard decoding change over time. Reconfirm the creator fields and instruction semantics against current official docs for the launch mechanism you are reviewing.

## Related material

- [Follow funding wallets](/research/funding-wallets)
- [Bundle buys explained](/research/bundle-buys)
- [Worked example: wallet cluster](/research/wallet-cluster-case)
- [Common memecoin scams](/security/scams)
