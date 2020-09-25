import { BigInt } from '@graphprotocol/graph-ts'
import {
  LidStaking,
  OnDistribute,
  OnReinvest,
  OnStake,
  OnUnstake,
  OnWithdraw,
} from '../../generated/LidStaking/LidStaking'
import { LidToken } from '../../generated/LidStaking/LidToken'
import { appendAggregateMetrics, appendVolumeMetrics } from '../models/Metric'
import { RATIO, toDecimal } from '../utils/number'
import { TOKEN_DECIMALS } from '../utils/token'

import { AggregateMetricType, TransactionType } from '../enums'

export function handleOnStake(event: OnStake): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_STAKE,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )
}

export function handleOnUnstake(event: OnUnstake): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_UNSTAKE,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )
}

export function handleOnWithdraw(event: OnWithdraw): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_WITHDRAW,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )
}

export function handleOnReinvest(event: OnReinvest): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_REINVEST,
    toDecimal(event.params.amount, TOKEN_DECIMALS),
    event.block.timestamp,
  )
}

export function handleOnDistribute(event: OnDistribute): void {
  appendVolumeMetrics(
    TransactionType.STAKING_CONTRACT_STAKE,
    toDecimal(event.params.amountSent, TOKEN_DECIMALS),
    event.block.timestamp,
  )
}
