import { Address, BigDecimal } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { Transfer, LidToken } from '../../generated/LidToken/LidToken'
import { toDecimal } from '../utils/number'
import { ZERO_ADDRESS } from '../utils/token'

export function getOrCreateToken(address: Address): Token {
  let token = Token.load(address.toHexString())
  if (token != null) {
    return token as Token
  }

  return upsertToken(address)
}

export function upsertToken(address: Address): Token {
  let token = new Token(address.toHexString())
  let contract = LidToken.bind(address)

  token.address = address
  token.name = contract.name()
  token.symbol = contract.symbol()
  token.decimals = contract.decimals()
  token.totalSupply = toDecimal(contract.totalSupply(), token.decimals)
  token.totalMinted = BigDecimal.fromString('0')
  token.totalBurned = BigDecimal.fromString('0')
  token.save()

  return token
}

export function handleTokenTransfer(event: Transfer): void {
  let token = getOrCreateToken(event.address)

  let isMint = event.params.from.toHexString() == ZERO_ADDRESS
  let isBurn = event.params.to.toHexString() == ZERO_ADDRESS

  if (isMint) {
    handleTokenMintEvent(token, event)
  } else if (isBurn) {
    handleTokenBurnEvent(token, event)
  }
}

function getTokenTransferAmount(token: Token, event: Transfer): BigDecimal {
  return toDecimal(event.params.value, token.decimals)
}

function handleTokenMintEvent(token: Token, event: Transfer): void {
  let amount = getTokenTransferAmount(token, event)
  token.totalSupply = token.totalSupply.plus(amount)
  token.totalMinted = token.totalMinted.plus(amount)
  token.save()
}

function handleTokenBurnEvent(token: Token, event: Transfer): void {
  let amount = getTokenTransferAmount(token, event)
  token.totalBurned = token.totalBurned.plus(amount)
  token.totalSupply = token.totalSupply.minus(amount)
  token.save()
}
