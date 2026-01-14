import { isBoolean, isNumber, isInteger, isString } from '@ctrlo/typechecks';
import { fieldMappingType } from '../types/types';

// We allow any here because we could pass in any value, that's why this function exists!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const coerce = (value: any, expected: fieldMappingType) => {
    switch (expected) {
        case 'integer':
            if (isInteger(value)) return value;
            if (isNaN(parseInt(value))) return Number.NaN;
            return parseInt(value);
        case 'double':
            if (isNumber(value)) return value;
            if (isNaN(parseFloat(value))) return Number.NaN;
            return parseFloat(value);
        case 'string':
            // Using interpolation here, because we can't assume there's a toString method (although there should be)
            // No point checking if it's a string here IMO
            return `${value}`;
        case 'date':
            // We don't need to check if it's already a Date as the constructor can accept a Date as the input
            try {
                return new Date(value).toISOString();
            } catch {
                return undefined;
            }
        case 'boolean':
            // The !!value for if the value is a number is "cleaner" as we want true if it's not 0
            return isBoolean(value) ? value : isString(value) ? value === 'true' : isNumber(value) ? !!value : false;
        default:
            throw new Error('Invalid expected type');
    }
};
