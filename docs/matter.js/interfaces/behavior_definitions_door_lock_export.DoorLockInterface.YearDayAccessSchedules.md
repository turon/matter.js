[@project-chip/matter.js](../README.md) / [Modules](../modules.md) / [behavior/definitions/door-lock/export](../modules/behavior_definitions_door_lock_export.md) / [DoorLockInterface](../modules/behavior_definitions_door_lock_export.DoorLockInterface.md) / YearDayAccessSchedules

# Interface: YearDayAccessSchedules

[behavior/definitions/door-lock/export](../modules/behavior_definitions_door_lock_export.md).[DoorLockInterface](../modules/behavior_definitions_door_lock_export.DoorLockInterface.md).YearDayAccessSchedules

## Table of contents

### Methods

- [clearYearDaySchedule](behavior_definitions_door_lock_export.DoorLockInterface.YearDayAccessSchedules.md#clearyeardayschedule)
- [getYearDaySchedule](behavior_definitions_door_lock_export.DoorLockInterface.YearDayAccessSchedules.md#getyeardayschedule)
- [setYearDaySchedule](behavior_definitions_door_lock_export.DoorLockInterface.YearDayAccessSchedules.md#setyeardayschedule)

## Methods

### clearYearDaySchedule

▸ **clearYearDaySchedule**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `userIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `yearDayIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

**`See`**

[MatterApplicationClusterSpecificationV1_1](spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:222](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L222)

___

### getYearDaySchedule

▸ **getYearDaySchedule**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)\<[`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `localEndTime`: [`OptionalFieldType`](tlv_export.OptionalFieldType.md)\<`number`\> ; `localStartTime`: [`OptionalFieldType`](tlv_export.OptionalFieldType.md)\<`number`\> ; `status`: [`FieldType`](tlv_export.FieldType.md)\<[`DlStatus`](../enums/cluster_export.DoorLock.DlStatus.md)\> ; `userIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `yearDayIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\>  }\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `userIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `yearDayIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)\<[`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `localEndTime`: [`OptionalFieldType`](tlv_export.OptionalFieldType.md)\<`number`\> ; `localStartTime`: [`OptionalFieldType`](tlv_export.OptionalFieldType.md)\<`number`\> ; `status`: [`FieldType`](tlv_export.FieldType.md)\<[`DlStatus`](../enums/cluster_export.DoorLock.DlStatus.md)\> ; `userIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `yearDayIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\>  }\>\>

**`See`**

[MatterApplicationClusterSpecificationV1_1](spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:217](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L217)

___

### setYearDaySchedule

▸ **setYearDaySchedule**(`request`): [`MaybePromise`](../modules/util_export.md#maybepromise)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`TypeFromFields`](../modules/tlv_export.md#typefromfields)\<\{ `localEndTime`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `localStartTime`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `userIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\> ; `yearDayIndex`: [`FieldType`](tlv_export.FieldType.md)\<`number`\>  }\> |

#### Returns

[`MaybePromise`](../modules/util_export.md#maybepromise)

**`See`**

[MatterApplicationClusterSpecificationV1_1](spec_export.MatterApplicationClusterSpecificationV1_1.md) § 5.2.4

#### Defined in

[packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts:212](https://github.com/project-chip/matter.js/blob/3adaded6/packages/matter.js/src/behavior/definitions/door-lock/DoorLockInterface.ts#L212)