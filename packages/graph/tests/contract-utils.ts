import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ApprovalValue,
  SetMetadataDescriptor,
  SlotChanged,
  Transfer,
  TransferValue
} from "../generated/Contract/Contract"

export function createApprovalEvent(
  _owner: Address,
  _approved: Address,
  _tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromAddress(_approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  _owner: Address,
  _operator: Address,
  _approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("_approved", ethereum.Value.fromBoolean(_approved))
  )

  return approvalForAllEvent
}

export function createApprovalValueEvent(
  _tokenId: BigInt,
  _operator: Address,
  _value: BigInt
): ApprovalValue {
  let approvalValueEvent = changetype<ApprovalValue>(newMockEvent())

  approvalValueEvent.parameters = new Array()

  approvalValueEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  approvalValueEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  approvalValueEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return approvalValueEvent
}

export function createSetMetadataDescriptorEvent(
  metadataDescriptor: Address
): SetMetadataDescriptor {
  let setMetadataDescriptorEvent = changetype<SetMetadataDescriptor>(
    newMockEvent()
  )

  setMetadataDescriptorEvent.parameters = new Array()

  setMetadataDescriptorEvent.parameters.push(
    new ethereum.EventParam(
      "metadataDescriptor",
      ethereum.Value.fromAddress(metadataDescriptor)
    )
  )

  return setMetadataDescriptorEvent
}

export function createSlotChangedEvent(
  _tokenId: BigInt,
  _oldSlot: BigInt,
  _newSlot: BigInt
): SlotChanged {
  let slotChangedEvent = changetype<SlotChanged>(newMockEvent())

  slotChangedEvent.parameters = new Array()

  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldSlot",
      ethereum.Value.fromUnsignedBigInt(_oldSlot)
    )
  )
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_newSlot",
      ethereum.Value.fromUnsignedBigInt(_newSlot)
    )
  )

  return slotChangedEvent
}

export function createTransferEvent(
  _from: Address,
  _to: Address,
  _tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return transferEvent
}

export function createTransferValueEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt,
  _value: BigInt
): TransferValue {
  let transferValueEvent = changetype<TransferValue>(newMockEvent())

  transferValueEvent.parameters = new Array()

  transferValueEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  transferValueEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )
  transferValueEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return transferValueEvent
}
