export type fieldMappingType = 'string' | 'integer' | 'double' | 'date' | 'boolean';

export type mappedField = { id: string, field: string, type: fieldMappingType };

export type condition = 'AND' | 'OR';
export type fieldType = number | string | boolean;

export type rule = mappedField & { input: string, operator: string, value: fieldType };

export type ruleGroup = { condition: condition, rules: (rule | ruleGroup)[], valid?: boolean };
