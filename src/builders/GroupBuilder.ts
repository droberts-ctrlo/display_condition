import { mappedFunctions } from '../mappers/ConditionMappers';
import { isRule, isRuleGroup } from '../types/checks';
import { fieldType, rule, ruleGroup } from '../types/types';

const buildRule = (rule: rule) => {
    return (data: Record<string, string | boolean | number>) => {
        const left = data[rule.field];
        let right: fieldType | Date = rule.value;

        if (/^date$/i.test(rule.type))
            right = new Date(typeof rule.value != 'boolean' ? rule.value : 0);

        return mappedFunctions[rule.type][rule.operator](left, right);
    };
};

export const buildGroup = (group: ruleGroup) => {
    const children = group.rules.map((rule: ruleGroup) => {
        if (isRuleGroup(rule)) return buildGroup(rule);
        else if (isRule(rule)) return buildRule(rule);
        else throw new Error('Invalid input given');
    });

    if (group.condition === 'AND') {
        return (data: Record<string, string | boolean | number>): boolean => children.every(fn => fn(data));
    }

    if (group.condition === 'OR') {
        return (data: Record<string, string | boolean | number>): boolean => children.some(fn => fn(data));
    }

    throw new Error(`Unknown condition: ${group.condition}`);
};
