---
title: Inside a Pump.fun launch
description: How a token launch moves from creation to curve trading and migration.
---

# Inside a Pump.fun launch

A token launch is a sequence of program interactions, not a single magic event. A useful launch review asks what was created, what state the launch mechanism is in, who received the first supply, and what actually happened in the first transactions.

> **Core idea:** a ticker, icon, or social post describes a token. The chain records the instructions and state changes that happened around it.

<div class="article-meta">FUNDAMENTALS · BEGINNER · 7 MIN READ · REVIEWED 25 OCT 2026</div>

## 1. Creation

A launch transaction initializes a token mint and the accounts or program state required by the launch mechanism. The token’s mint address is the durable identifier; names and symbols are not unique.

On Solana, a transaction can contain multiple instructions. Account creation, token initialization, metadata operations, and launch-program instructions may be grouped together. Read the full transaction rather than assuming one visible action tells the whole story.

## 2. The first trading state

Pump.fun launches have used a bonding-curve phase before the asset trades in its post-graduation pool. The curve quotes buys and sells from its current state; a buy changes the quote available to the next trader. Fees, current reserves, transaction ordering and slippage limits all matter.

The exact instructions, token standard, fees, and graduation conditions can evolve. Check the current [Pump.fun bonding-curve documentation](https://pump.fun/docs/bonding-curve) and the actual on-chain accounts for the asset under review.

## 3. A practical first-pass checklist

1. Open the token mint and confirm that the address matches the source you intended to inspect.
2. Open the launch or first trade transaction. Record its signature, slot, signers, instructions and balance changes.
3. Inspect creator-related accounts and the earliest token holders. Treat labels from third-party tools as clues, not ground truth.
4. Check whether the curve is still active or the token has migrated to a pool. Do not infer this from a screenshot or market-cap badge alone.
5. Look at sales, liquidity and holder distribution separately. No single number establishes that a token is safe.

## Transaction walkthrough

**Illustrative example — not a real launch.** Imagine a token named DEMO whose first transaction creates its mint and curve state. The next transaction buys tokens using SOL. A block explorer might show several instructions and account changes in the same transaction, rather than a simple “buy” line.

The questions to answer are:

- Which instruction created or initialized the relevant account?
- Which signer authorized the transaction?
- Which account paid SOL, and which token account received tokens?
- Did the transaction succeed, and do the pre/post balances agree with the decoded summary?

## What this does not tell you

Creation does not imply legitimacy, fairness, or likely future demand. A creator address can be different from the person promoting a token, and address relationships do not independently prove identity. A successful swap only shows that the transaction executed under the program’s rules.

## Related material

- [Bonding curve and migration](/knowledge/bonding-curve-migration)
- [Liquidity and price impact](/knowledge/liquidity)
- [Analyze a dev wallet](/research/dev-wallet-analysis)
- [Read a transaction in Solscan](/tools/solscan)

## Sources and currency

Mechanics checked against the [official Pump.fun bonding-curve documentation](https://pump.fun/docs/bonding-curve) on 25 October 2026. Fees and protocol details may change; verify current documentation and account state before relying on specific parameters.
