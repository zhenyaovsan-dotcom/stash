---
title: Read a transaction in Solscan
description: A repeatable workflow for inspecting a Solana transaction in a block explorer.
---

# Read a transaction in Solscan

Solscan is a Solana block explorer. It gives a readable view of transaction signatures, slot/time, signers, fees, instructions and account balance changes. Use it as a starting interface; when a decoded label matters, compare it with the underlying instructions and official program documentation.

<div class="article-meta">TOOLS & INFRASTRUCTURE · BEGINNER · 8 MIN READ · REVIEWED 25 OCT 2026</div>

## Open the exact transaction

Start with a full transaction signature from the token page, wallet history or another reliable source. Make sure the network is the intended one and that the signature matches the reference you were given. Avoid guessing from a ticker: many tokens can share similar names.

## Read the overview first

The transaction overview commonly displays:

- **Signature:** the unique transaction identifier.
- **Slot and timestamp:** where and when the transaction landed.
- **Result:** whether execution succeeded.
- **Signer:** which address signed the message.
- **Fee and priority fee:** costs shown by the explorer.
- **Main actions:** a decoded summary of transfer, swap or program interactions.

The exact labels and page layout can evolve. For current interface details, see the [Solscan transaction documentation](https://docs.solscan.io/transaction-details/transaction-details).

## Then inspect balance changes

Compare the pre- and post-transaction balances for SOL and the relevant token accounts. This is often more informative than a single decoded “buy” label. Remember that a wallet can use a separate associated token account; the token account address and the owner wallet address are not always the same string.

## Expand instructions when necessary

A transaction can contain multiple instructions and inner instructions. A simple UI summary may hide account creation, token transfers, program calls, fee transfers or other actions. Expand the instruction details when:

- the summary does not match the balance changes;
- a transaction touches several programs;
- a wallet’s role is unclear;
- a token or SOL transfer appears to be missing;
- the conclusion depends on a program-specific instruction.

## A short working checklist

1. Copy the signature into your notes.
2. Confirm result, slot and signer.
3. Compare SOL and token balance changes.
4. Read the main and inner instructions for actions relevant to your question.
5. Open the involved accounts and inspect nearby transactions.
6. Save the exact source URLs and distinguish explorer labels from your interpretation.

## Limitations

A block explorer is an interface to blockchain data, not a guarantee that each action has been decoded correctly. New program versions, unusual instructions, missing labels and complex routes can make the human-readable summary incomplete. For deeper analysis, compare with raw transaction data or another independent source.

## Related material

- [Facts vs. hypotheses](/research/onchain-evidence)
- [Follow funding wallets](/research/funding-wallets)
- [Analyze a dev wallet](/research/dev-wallet-analysis)

## Source

[Solscan transaction details documentation](https://docs.solscan.io/transaction-details/transaction-details), reviewed 25 October 2026.
