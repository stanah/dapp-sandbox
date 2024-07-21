import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ApprovalValue as ApprovalValueEvent,
  SetMetadataDescriptor as SetMetadataDescriptorEvent,
  SlotChanged as SlotChangedEvent,
  Transfer as TransferEvent,
  TransferValue as TransferValueEvent
} from "../generated/Contract/Contract"
import {
  Approval,
  ApprovalForAll,
  ApprovalValue,
  SetMetadataDescriptor,
  SlotChanged,
  Transfer,
  TransferValue
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._approved = event.params._approved
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._operator = event.params._operator
  entity._approved = event.params._approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalValue(event: ApprovalValueEvent): void {
  let entity = new ApprovalValue(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId
  entity._operator = event.params._operator
  entity._value = event.params._value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetMetadataDescriptor(
  event: SetMetadataDescriptorEvent
): void {
  let entity = new SetMetadataDescriptor(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.metadataDescriptor = event.params.metadataDescriptor

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSlotChanged(event: SlotChangedEvent): void {
  let entity = new SlotChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tokenId = event.params._tokenId
  entity._oldSlot = event.params._oldSlot
  entity._newSlot = event.params._newSlot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._from = event.params._from
  entity._to = event.params._to
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferValue(event: TransferValueEvent): void {
  let entity = new TransferValue(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._fromTokenId = event.params._fromTokenId
  entity._toTokenId = event.params._toTokenId
  entity._value = event.params._value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
