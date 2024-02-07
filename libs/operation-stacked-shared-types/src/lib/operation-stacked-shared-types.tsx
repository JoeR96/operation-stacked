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

export function mapCategory(apiCategory: Category): Category {
  const categoryMapping: Record<keyof typeof APICategory, Category> = {
    NUMBER_0: Category.Shoulders,
    NUMBER_1: Category.Chest,
    NUMBER_2: Category.Back,
    NUMBER_3: Category.Biceps,
    NUMBER_4: Category.Triceps,
    NUMBER_5: Category.Legs,
  };
  return categoryMapping[apiCategory] || Category.Shoulders; // Default to Shoulders or anyy sensible default
}

export function mapEquipmentType(apiEquipmentType: EquipmentType): EquipmentType {
  const equipmentTypeMapping: Record<keyof typeof APIEquipmentType, EquipmentType> = {
    NUMBER_0: EquipmentType.Barbell,
    NUMBER_1: EquipmentType.SmithMachine,
    NUMBER_2: EquipmentType.Dumbbell,
    NUMBER_3: EquipmentType.Machine,
    NUMBER_4: EquipmentType.Cable,
    // Add more mappings as needed based on your API's definitions
  };
  return equipmentTypeMapping[apiEquipmentType] || EquipmentType.Barbell; // Default to Barbell or any sensible default
}
