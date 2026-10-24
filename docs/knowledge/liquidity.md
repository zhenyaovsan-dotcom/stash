---
title: Liquidity & price impact
description: Why displayed market cap is not the same thing as executable exit value.
---

# Liquidity & price impact

Liquidity is the amount of assets available for trades at the current market structure. It determines how much a trade can move the quote and how difficult it may be to exit without accepting a worse price.

<div class="article-meta">FUNDAMENTALS · BEGINNER · 6 MIN READ · REVIEWED 25 OCT 2026</div>

## Price is not exit value

A dashboard’s last price is one observation. Your execution depends on the route, current reserves, trade size, fees and competing transactions. Market capitalization is usually a price multiplied by a supply measure; it is not the amount of money waiting to buy your position.

For a small trade, the difference can be minor. For a large trade relative to the available reserves, the average execution price can be materially worse than the displayed spot price.

## Four things to inspect

**Pool depth.** Look at the actual reserves and the destination pool. A token with a dramatic market-cap badge may still have limited quote-asset depth.

**Trade size.** Compare a hypothetical exit size with the pool’s current reserves. A larger sell typically moves an AMM quote further than a smaller sell.

**Concentration.** Check who holds tokens and whether a few wallets could add substantial sell pressure. Token balances alone do not reveal who controls an address.

**Route and fees.** Aggregators, protocol fees, priority fees and slippage settings affect the amount received. A transaction can fail if the resulting execution violates its minimum-output condition.

## A simple example

**Illustrative numbers, not live market data.** Suppose a pool has 100 SOL on its quote side. A sell worth 1 SOL and a sell worth 20 SOL are not equivalent: the larger trade changes the pool state more, so its average execution price can be worse. Exact math depends on the pool formula, reserves and fee schedule.

Do not use the illustration as a price calculator. Read the current pool and simulate the route for the exact size you are evaluating.

## What to record

| Field | Why it matters |
| --- | --- |
| Pool address and venue | Confirms which market you are inspecting |
| SOL/quote reserves | Provides context for trade depth |
| Token reserves | Helps assess the other side of the market |
| Estimated output for your size | Connects liquidity to your actual trade |
| Slippage limit and fees | Explains failure risk and total cost |

## Common analytical traps

- Equating a high market cap with deep liquidity.
- Treating a displayed buy quote as guaranteed sell proceeds.
- Comparing reserves across different pools as though they were one market.
- Ignoring whether a token is still on a launch curve or has migrated.
- Using a screenshot after reserves and price have already changed.

## Related material

- [Bonding curve and migration](/knowledge/bonding-curve-migration)
- [Fast flip mechanics](/knowledge/fast-flip)
- [Analyze a dev wallet](/research/dev-wallet-analysis)
