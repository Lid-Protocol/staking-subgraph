import { Address, BigInt } from '@graphprotocol/graph-ts'
import { StakingContract } from '../../generated/schema'
import {
  OnDistribute,
  OnReinvest,
  OnStake,
  OnUnstake,
  OnWithdraw,
} from '../../generated/LidStaking/LidStaking'
import { LidStaking } from '../../generated/LidStaking/LidStaking'

export function getOrCreateStakingContract(address: Address): StakingContract {
  let staking = StakingContract.load(address.toHexString())
  if (staking != null) {
    return staking as StakingContract
  }

  return upsertStakingContract(address)
}

export function upsertStakingContract(address: Address): StakingContract {
  let staking = new StakingContract(address.toHexString())
  let contract = LidStaking.bind(address)

  staking.stakingTaxBP = contract.stakingTaxBP()
  staking.unstakingTaxBP = contract.unstakingTaxBP()
  staking.registrationFeeWithReferrer = contract.registrationFeeWithReferrer()
  staking.registrationFeeWithoutReferrer = contract.registrationFeeWithoutReferrer()
  staking.startTime = contract.startTime()
  staking.totalStaked = new BigInt(0)
  staking.totalStakers = new BigInt(0)
  staking.profitPerShare = new BigInt(0)
  staking.totalDistributions = new BigInt(0)
  staking.save()

  return staking
}

export function handleStake(event: OnStake): void {
  // TODO: handle totalStakers, profitPerShare stakingValue, stakerPayouts
  let staking = getOrCreateStakingContract(event.address)
  staking.totalStaked = staking.totalStaked.plus(event.params.amount)
  staking.save()
}

export function handleUnStake(event: OnUnstake): void {
  // TODO: handle totalStakers, profitPerShare stakingValue, stakerPayouts
  let staking = getOrCreateStakingContract(event.address)
  staking.totalStaked = staking.totalStaked.minus(event.params.amount)
  staking.save()
}

export function handleDistribute(event: OnDistribute): void {
  // TODO: handle totalStakers, profitPerShare stakingValue, stakerPayouts
  let staking = getOrCreateStakingContract(event.address)
  staking.totalDistributions = staking.totalDistributions.plus(
    event.params.amountSent,
  )
  staking.save()
}

// TODO: handle ReInvest, Withdraw
