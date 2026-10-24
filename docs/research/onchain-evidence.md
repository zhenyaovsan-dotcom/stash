---
title: Facts vs. hypotheses
description: A practical method for separating observed blockchain state from interpretations and speculation.
---

# Facts vs. hypotheses

On-chain research becomes useful when another person can reproduce the observation and understand the limits of the conclusion. The blockchain records transactions and account state; it does not directly record a trader’s motive, real-world identity, or private agreement.

<div class="article-meta">RESEARCH METHOD · BEGINNER · 5 MIN READ · REVIEWED 25 OCT 2026</div>

## Three layers of a claim

**Observed fact.** A reproducible signature shows that address A transferred a stated amount to address B at a recorded time.

**Inference.** The transfer happened shortly before B bought a token, so the funding may have been related to that buy.

**Speculation.** A and B are definitely the same person and the transfer proves a planned scheme.

The first statement is directly checkable. The second is a hypothesis that needs context. The third asserts identity and intent without enough evidence.

## Write conclusions in a useful format

For each claim, note:

- **Claim:** exactly what you think happened.
- **Evidence:** signatures, slots, account states, and source URLs.
- **Interpretation:** why the observations support the claim.
- **Alternatives:** at least one plausible explanation that would produce the same pattern.
- **Confidence:** low, medium or high—with a reason, not just a feeling.
- **Unknowns:** information that cannot be established from available data.

## Example

**Synthetic data — teaching example only.** An address funds three wallets, and all three buy the same token within a short interval. This supports the statement that a shared funding source preceded the clustered buys. It may support a coordination hypothesis, especially if repeated across launches, but does not independently establish common ownership or malicious intent.

## Evidence hygiene

- Save the full transaction signature, not only a screenshot.
- Verify addresses character by character when linking evidence.
- Distinguish raw instructions from an explorer’s decoded interpretation.
- Record the exact time zone and slot when timing matters.
- Do not delete contradictory observations from the write-up.
- Update conclusions when new transfers or program details change the picture.

## Source quality

Prefer direct on-chain data and official program documentation for claims about mechanics. Third-party explorers are valuable interfaces, but parser labels and derived classifications are interpretations that may be incomplete or wrong.

## Related material

- [Follow funding wallets](/research/funding-wallets)
- [Bundle buys explained](/research/bundle-buys)
- [Read a transaction in Solscan](/tools/solscan)
