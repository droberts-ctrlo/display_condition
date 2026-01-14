import { mappedField, ruleGroup } from '../types/types';
import { isRule, isRuleGroup } from '../types/checks';
import { coerce } from './TypeCoercion';

export const getRuleMap = (rules: ruleGroup) => {
    const fieldMap: mappedField[] = [];
    rules.rules.forEach((r) => {
        if (isRule(r)) {
            fieldMap.push({
                id: r.id,
                field: r.field,
                type: r.type
            });
        } else if (isRuleGroup(r)) {
            fieldMap.push(...getRuleMap(r));
        } else {
            throw new Error('Invalid rule input');
        }
    });

    return fieldMap;
};

export const getValues = (map: mappedField[]) => {
    const result: Record<string, string | number | Date | boolean> = {};

    for (const i of map) {
        const field = document.getElementById(i.id || i.field) as HTMLInputElement;
        const baseValue = field.value;
        result[i.id || i.field] = coerce(baseValue, i.type);
    }

    return result;
};
