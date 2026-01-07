import { mappedFunctions } from "../mappers/ConditionMappers";

const buildRule = (rule:any) => {
    return (data:any)=> {
        const left = data[rule.field];
        let right = rule.value;

        if(/^date$/i.test(rule.type))
            right =new Date(rule.value);

        return mappedFunctions[rule.type][rule.operator](left,right)
    }
}

export const buildGroup = (group:any) => {
    const children = group.rules.map((rule: any)=>
        rule.rules ? buildGroup(rule) : buildRule(rule)
    );

    if(group.condition === "AND") {
        return (data: any) => children.every((fn:any)=>fn(data));
    }

    if(group.condition === "OR") {
        return (data:any) => children.some((fn:any)=>fn(data));
    }

    throw new Error(`Unknown condition: ${group.condition}`);
}
