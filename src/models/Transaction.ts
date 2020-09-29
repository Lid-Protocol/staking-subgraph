import {
  StakeTransaction,
  UnStakeTransaction,
  WithdrawTransaction,
  ReInvestTransaction,
  DistributeTransaction,
} from '../../generated/schema'

import {
  OnDistribute,
  OnReinvest,
  OnStake,
  OnUnstake,
  OnWithdraw,
} from '../../generated/LidStaking/LidStaking'
import { mapTransactionType, TransactionType } from '../enums'

export function getOrCreateStakeTransaction(event: OnStake): StakeTransaction {
  let txHash = event.transaction.hash
  let type = mapTransactionType(TransactionType.STAKING_CONTRACT_STAKE)
  let id = txHash.toHexString().concat(type)
  let transaction = StakeTransaction.load(id)

  if (transaction != null) {
    return transaction as StakeTransaction
  }

  transaction = new StakeTransaction(id)
  transaction.tx = txHash
  transaction.type = type
  transaction.timestamp = event.block.timestamp.toI32()
  transaction.sender = event.params.sender
  transaction.amount = event.params.amount
  transaction.tax = event.params.tax
  transaction.save()
  return transaction as StakeTransaction
}

export function getOrCreateUnStakeTransaction(
  event: OnUnstake,
): UnStakeTransaction {
  let txHash = event.transaction.hash
  let type = mapTransactionType(TransactionType.STAKING_CONTRACT_UNSTAKE)
  let id = txHash.toHexString().concat(type)
  let transaction = UnStakeTransaction.load(id)

  if (transaction != null) {
    return transaction as UnStakeTransaction
  }

  transaction = new UnStakeTransaction(id)
  transaction.tx = txHash
  transaction.type = type
  transaction.timestamp = event.block.timestamp.toI32()
  transaction.sender = event.params.sender
  transaction.amount = event.params.amount
  transaction.tax = event.params.tax
  transaction.save()
  return transaction as UnStakeTransaction
}

export function getOrCreateWithDrawTransaction(
  event: OnWithdraw,
): WithdrawTransaction {
  let txHash = event.transaction.hash
  let type = mapTransactionType(TransactionType.STAKING_CONTRACT_WITHDRAW)
  let id = txHash.toHexString().concat(type)
  let transaction = WithdrawTransaction.load(id)

  if (transaction != null) {
    return transaction as WithdrawTransaction
  }

  transaction = new WithdrawTransaction(id)
  transaction.tx = txHash
  transaction.type = type
  transaction.timestamp = event.block.timestamp.toI32()
  transaction.sender = event.params.sender
  transaction.amount = event.params.amount
  transaction.save()
  return transaction as WithdrawTransaction
}

export function getOrCreateReInvestTransaction(
  event: OnReinvest,
): ReInvestTransaction {
  let txHash = event.transaction.hash
  let type = mapTransactionType(TransactionType.STAKING_CONTRACT_REINVEST)
  let id = txHash.toHexString().concat(type)
  let transaction = ReInvestTransaction.load(id)

  if (transaction != null) {
    return transaction as ReInvestTransaction
  }

  transaction = new ReInvestTransaction(id)
  transaction.tx = txHash
  transaction.type = type
  transaction.timestamp = event.block.timestamp.toI32()
  transaction.sender = event.params.sender
  transaction.amount = event.params.amount
  transaction.tax = event.params.tax
  transaction.save()
  return transaction as ReInvestTransaction
}

export function getOrCreateDistributeTransaction(
  event: OnDistribute,
): DistributeTransaction {
  let txHash = event.transaction.hash
  let type = mapTransactionType(TransactionType.STAKING_CONTRACT_DISTRIBUTE)
  let id = txHash.toHexString().concat(type)
  let transaction = DistributeTransaction.load(id)

  if (transaction != null) {
    return transaction as DistributeTransaction
  }

  transaction = new DistributeTransaction(id)
  transaction.tx = txHash
  transaction.type = type
  transaction.timestamp = event.block.timestamp.toI32()
  transaction.sender = event.params.sender
  transaction.amount = event.params.amountSent
  transaction.save()
  return transaction as DistributeTransaction
}
