export enum TransactionType {
  STAKING_CONTRACT_STAKE,
  STAKING_CONTRACT_UNSTAKE,
  STAKING_CONTRACT_WITHDRAW,
  STAKING_CONTRACT_REINVEST,
  STAKING_CONTRACT_DISTRIBUTE,
}

export enum TimeMetricPeriod {
  HOUR,
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  YEAR,
}

export enum AggregateMetricType {
  TOTAL_SUPPLY,
  TOTAL_STAKED,
}

export function mapTimeMetricPeriod(period: TimeMetricPeriod): string {
  switch (period) {
    case TimeMetricPeriod.DAY:
      return 'DAY'
    case TimeMetricPeriod.HOUR:
      return 'HOUR'
    case TimeMetricPeriod.WEEK:
      return 'WEEK'
    case TimeMetricPeriod.MONTH:
      return 'MONTH'
    case TimeMetricPeriod.QUARTER:
      return 'QUARTER'
    case TimeMetricPeriod.YEAR:
      return 'YEAR'
    default:
      return ''
  }
}

export function mapTransactionType(type: TransactionType): string {
  switch (type) {
    case TransactionType.STAKING_CONTRACT_STAKE:
      return 'STAKING_CONTRACT_STAKE'
    case TransactionType.STAKING_CONTRACT_UNSTAKE:
      return 'STAKING_CONTRACT_UNSTAKE'
    case TransactionType.STAKING_CONTRACT_WITHDRAW:
      return 'STAKING_CONTRACT_WITHDRAW'
    case TransactionType.STAKING_CONTRACT_DISTRIBUTE:
      return 'STAKING_CONTRACT_DISTRIBUTE'
    case TransactionType.STAKING_CONTRACT_REINVEST:
      return 'STAKING_CONTRACT_REINVEST'
    default:
      return ''
  }
}

export function mapAggregateMetricType(type: AggregateMetricType): string {
  switch (type) {
    case AggregateMetricType.TOTAL_STAKED:
      return 'TOTAL_STAKED'
    case AggregateMetricType.TOTAL_SUPPLY:
      return 'TOTAL_SUPPLY'
    default:
      return ''
  }
}
