import { ruleGroup, rule } from './types';

export const isRuleGroup = (r: ruleGroup | rule): r is ruleGroup => 'rules' in r;
export const isRule = (r: ruleGroup | rule): r is rule => 'id' in r && 'field' in r && 'type' in r && 'input' in r && 'operator' in r && 'value' in r;
