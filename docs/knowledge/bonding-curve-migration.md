---
title: Bonding curve & migration
description: Virtual reserves, price movement, completion and post-graduation pools.
---

# Bonding curve & migration

A bonding curve is a pricing mechanism where the quote changes as trades change the curve’s state. On launch platforms, it can allow a token to trade before it has a conventional pool on an exchange.

<div class="article-meta">FUNDAMENTALS · INTERMEDIATE · 8 MIN READ · REVIEWED 25 OCT 2026</div>

## The intuition

Think of the curve as a rule that computes a price from reserves. In a common constant-product model, the product of two reserve values is constrained while a trade changes both sides. A buy removes some tokens and adds quote asset; the next buyer sees a different state and therefore a different quote. A sell moves the state the other way.

The quoted spot price is not a promise that any size can trade at that price. Fees, transaction order, slippage limits and available reserves all affect the final result.

## Virtual reserves vs. real balances

Some launch curves use **virtual reserves** to calculate pricing and **real reserves** to describe assets held by the relevant accounts. Those concepts serve different purposes. Reading one field as if it represented spendable liquidity can produce a false estimate of how much a trader can exit.

| Term | What it means in context | Common mistake |
| --- | --- | --- |
| Virtual reserves | Values used by the pricing formula | Treating them as withdrawable assets |
| Real reserves | Actual balances associated with the curve | Assuming they alone explain every quote |
| Price impact | Quote change caused by trade size | Comparing only last-traded prices |
| Slippage limit | The trade’s allowed execution deviation | Assuming it guarantees a fill |

## What “migration” means

When a curve reaches its completion condition, the token can move into a post-graduation liquidity pool. Pump.fun documentation describes graduation and migration into PumpSwap; the implementation and program instructions should always be checked against current official docs.

A migration changes the market structure. The curve phase and the pool phase can have different account layouts, fees, reserve composition, and explorers’ decoded summaries. Do not assume a pre-migration chart can be compared directly with post-migration liquidity without checking where the trades occurred.

## A visual mental model

1. **Launch:** mint and curve accounts are initialized.
2. **Curve trading:** buys and sells update the curve state.
3. **Completion:** the program’s defined graduation condition is reached.
4. **Pool phase:** the migration process creates or funds the canonical destination pool.
5. **Pool trading:** swaps now use the post-graduation pool state.

These stages are a simplified model. Exact instructions and completion checks can change as the protocol evolves.

## Practical checks

- Find the launch’s actual curve account and inspect its state, not just a UI progress bar.
- Compare the transaction signature and slot around the completion event.
- Confirm the destination pool and its real token/SOL balances.
- Verify that the pool and token mint are the expected ones.
- Re-check fees and route behavior in the current docs for the specific asset.

> **Risk note:** graduation is a state transition, not a guarantee of future demand. Liquidity can still be thin, concentrated, or sold into.

## Related material

- [Inside a Pump.fun launch](/knowledge/pump-fun-launch)
- [Liquidity and price impact](/knowledge/liquidity)
- [Bundle buys explained](/research/bundle-buys)

## Source

[Pump.fun — The bonding curve](https://pump.fun/docs/bonding-curve), reviewed 25 October 2026. Verify live program behavior and fee parameters directly before using numeric assumptions.
