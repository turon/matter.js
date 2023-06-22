[@project-chip/matter-node.js](../README.md) / [Modules](../modules.md) / [exports/session](../modules/exports_session.md) / CaseClient

# Class: CaseClient

[exports/session](../modules/exports_session.md).CaseClient

## Table of contents

### Constructors

- [constructor](exports_session.CaseClient.md#constructor)

### Methods

- [pair](exports_session.CaseClient.md#pair)

## Constructors

### constructor

• **new CaseClient**()

## Methods

### pair

▸ **pair**(`client`, `exchange`, `fabric`, `peerNodeId`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`MatterController`](index.MatterController.md) |
| `exchange` | [`MessageExchange`](exports_protocol.MessageExchange.md)<[`MatterController`](index.MatterController.md)\> |
| `fabric` | [`Fabric`](exports_fabric.Fabric.md) |
| `peerNodeId` | [`NodeId`](exports_datatype.NodeId.md) |

#### Returns

`Promise`<`any`\>

#### Defined in

packages/matter.js/dist/cjs/session/case/CaseClient.d.ts:11