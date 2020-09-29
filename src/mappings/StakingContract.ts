import {
  OnDistribute,
  OnReinvest,
  OnStake,
  OnUnstake,
  OnWithdraw,
} from '../../generated/LidStaking/LidStaking'
import { appendAggregateMetrics, appendVolumeMetrics } from '../models/Metric'
import {
  getOrCreateStakingContract,
  handleStake,
  handleUnStake,
  handleDistribute,
} from '../models/Staking'
import {
  getOrCreateStakeTransaction,
  getOrCreateUnStakeTransaction,
  getOrCreateDistributeTransaction,
  getOrCreateReInvestTransaction,
  getOrCreateWithDrawTransaction,
} from '../models/Transaction'
import { toDecimal } from '../utils/number'
import { TOKEN_DECIMALS } from '../utils/token'

import { AggregateMetricType, TransactionType } from '../enums'

export function handleOnStake(event: OnStake): void {
  handleStake(event)

  let staking = getOrCreateStakingContract(event.address)
  appendAggregateMetrics(
    AggregateMetricType.TOTAL_STAKED,
    toDecimal(staking.totalStaked, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_STAKE,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  getOrCreateStakeTransaction(event)
}

export function handleOnUnstake(event: OnUnstake): void {
  handleUnStake(event)

  let staking = getOrCreateStakingContract(event.address)
  appendAggregateMetrics(
    AggregateMetricType.TOTAL_STAKED,
    toDecimal(staking.totalStaked, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_UNSTAKE,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  getOrCreateUnStakeTransaction(event)
}

export function handleOnWithdraw(event: OnWithdraw): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_WITHDRAW,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  getOrCreateWithDrawTransaction(event)
}

export function handleOnReinvest(event: OnReinvest): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_REINVEST,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  getOrCreateReInvestTransaction(event)
}

export function handleOnDistribute(event: OnDistribute): void {
  handleDistribute(event)

  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_DISTRIBUTE,
    toDecimal(event.params.amountSent, TOKEN_DECIMALS),
    event.block.timestamp,
  )

  getOrCreateDistributeTransaction(event)
}
