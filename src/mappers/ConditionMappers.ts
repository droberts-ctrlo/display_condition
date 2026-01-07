import { isNotNullOrUndefined, isNullOrUndefined, isString, isBoolean, isNumber, isObject, isEmptyString, isNotEmptyString } from "typechecks";

type precondition = (a: unknown) => boolean;
type fn = (a: any, b?: any) => boolean;

type mappedFunction = Record<string, fn>
type typedMappedFunction = Record<string, mappedFunction>

const commonMappedFunctions: (precondition: precondition) => mappedFunction = p => {
    return {
        equal: (a, b) => p(a) && p(b) && a === b,
        not_equal: (a, b) => a !== b,
        is_null: isNullOrUndefined,
        is_not_null: isNotNullOrUndefined
    }
};

const stringMappedFunctions: mappedFunction = {
    ...commonMappedFunctions(isString),
    in: (a: string, b: string) => b.includes(a),
    not_in: (a: string, b: string) => !b.includes(a),
    begins_with: (a: string, b: string) => a.startsWith(b),
    not_begins_with: (a: string, b: string) => !a.startsWith(b),
    contains: (a: string, b: string) => a.includes(b),
    not_contains: (a: string, b: string) => !a.includes(b),
    ends_with: (a: string, b: string) => a.endsWith(b),
    not_ends_with: (a: string, b: string) => !a.endsWith(b),
    is_empty: (a: string) => isEmptyString(a),
    is_not_empty: (a: string) => isNotEmptyString(a)
};

const booleanMappedFunctions: mappedFunction = {
    ...commonMappedFunctions(isBoolean)
};

const integerMappedFunctions: mappedFunction = {
    ...commonMappedFunctions(isNumber),
    in: (a: number, b: number) => String(b).includes(String(a)),
    not_in: (a: number, b: number) => !String(b).includes(String(a)),
    less: (a: number, b: number) => a < b,
    less_or_equal: (a: number, b: number) => a <= b,
    greater: (a: number, b: number) => a > b,
    greater_or_equal: (a: number, b: number) => a >= b,
    between: (a: number, b: number[]) => b[0] <= a && a <= b[1],
    not_between: (a: number, b: number[]) => !(b[0] <= a && a <= b[1]),
}

const doubleMappedFunctions: mappedFunction = {
    ...integerMappedFunctions
}

const dateMappedFunctions: mappedFunction = {
    equal: (a: Date, b: Date) => a.getDate() === b.getDate(),
    not_equal: (a, b) => a.getDate() !== b.getDate(),
    in: (a: string, b: Date) => b.toDateString().includes(a),
    not_in: (a: string, b: Date) => !b.toDateString().includes(a),
    less: (a: Date, b: Date) => a < b,
    less_or_equal: (a: Date, b: Date) => a <= b,
    greater: (a: Date, b: Date) => a > b,
    greater_or_equal: (a: Date, b: Date) => a >= b,
    between: (a: Date, b: Date[]) => b[0] <= a && a <= b[1],
    not_between: (a: Date, b: Date[]) => !(b[0] <= a && a <= b[1]),
    is_null: commonMappedFunctions(isObject).is_null,
    is_not_null: commonMappedFunctions(isObject).is_not_null,
}

export const mappedFunctions: typedMappedFunction = {
    string: stringMappedFunctions,
    boolean: booleanMappedFunctions,
    integer: integerMappedFunctions,
    double: doubleMappedFunctions,
    date: dateMappedFunctions
};
