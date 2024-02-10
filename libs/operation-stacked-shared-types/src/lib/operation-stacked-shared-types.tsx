import { Category as APICategory, EquipmentType as APIEquipmentType } from '@operation-stacked/shared-services';

export enum Category {
  Shoulders,
  Chest,
  Back,
  Biceps,
  Triceps,
  Legs,
}

export enum EquipmentType {
  Barbell,
  SmithMachine,
  Dumbbell,
  Machine,
  Cable,
}

export function mapCategory(apiCategory: APICategory): Category {
  const categoryMapping: Record<APICategory, Category> = {
    [APICategory.NUMBER_0]: Category.Shoulders,
    [APICategory.NUMBER_1]: Category.Chest,
    [APICategory.NUMBER_2]: Category.Back,
    [APICategory.NUMBER_3]: Category.Biceps,
    [APICategory.NUMBER_4]: Category.Triceps,
    [APICategory.NUMBER_5]: Category.Legs,
    // Ensure APICategory is correctly reflecting the numeric values expected
  };
  // Assuming apiCategory is a number that correctly maps to your APICategory enum
  return categoryMapping[apiCategory] ?? Category.Shoulders; // Using ?? for nullish coalescing
}

export function mapEquipmentType(apiEquipmentType: APIEquipmentType): EquipmentType {
  const equipmentTypeMapping: Record<APIEquipmentType, EquipmentType> = {
    [APIEquipmentType.NUMBER_0]: EquipmentType.Barbell,
    [APIEquipmentType.NUMBER_1]: EquipmentType.SmithMachine,
    [APIEquipmentType.NUMBER_2]: EquipmentType.Dumbbell,
    [APIEquipmentType.NUMBER_3]: EquipmentType.Machine,
    [APIEquipmentType.NUMBER_4]: EquipmentType.Cable,
    // Ensure APIEquipmentType correctly reflects the numeric values expected
  };
  // Assuming apiEquipmentType is a number that correctly maps to your APIEquipmentType enum
  return equipmentTypeMapping[apiEquipmentType] ?? EquipmentType.Barbell; // Using ?? for nullish coalescing
}


