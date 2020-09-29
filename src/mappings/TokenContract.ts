import { Transfer } from '../../generated/LidToken/LidToken'
import { appendAggregateMetrics } from '../models/Metric'
import { getOrCreateToken, handleTokenTransfer } from '../models/Token'
import { AggregateMetricType } from '../enums'

export function handleTransfer(event: Transfer): void {
  handleTokenTransfer(event)

  let token = getOrCreateToken(event.address)

  appendAggregateMetrics(
    AggregateMetricType.TOTAL_SUPPLY,
    token.totalSupply,
    event.block.timestamp,
  )
}
