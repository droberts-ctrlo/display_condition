import { describe, it, expect } from "@jest/globals";
import { buildGroup } from "../Builders";

/*
 * Example display condition:
 *
 */
const condition = {
    "condition": "AND",
    "rules": [
        {
            "id": "one",
            "field": "one",
            "type": "string",
            "input": "text",
            "operator": "equal",
            "value": "one"
        },
        {
            "condition": "OR",
            "rules": [
                {
                    "id": "two",
                    "field": "two",
                    "type": "boolean",
                    "input": "text",
                    "operator": "equal",
                    "value": true
                },
                {
                    "id": "three",
                    "field": "three",
                    "type": "string",
                    "input": "text",
                    "operator": "equal",
                    "value": "three"
                },
                {
                    "condition": "AND",
                    "rules": [
                        {
                            "id": "four",
                            "field": "four",
                            "type": "integer",
                            "input": "number",
                            "operator": "greater",
                            "value": 12
                        },
                        {
                            "id": "five",
                            "field": "five",
                            "type": "date",
                            "input": "text",
                            "operator": "greater",
                            "value": "21-04-1983"
                        }
                    ]
                }
            ]
        }
    ],
    "valid": true
}

/**
 * Check the values to get what the expected result should be
 * @param one First Value
 * @param two Second Value
 * @param three Third Value
 * @param four Fourth Value
 * @param five Fifth Value
 * @returns True if all conditions match as expected with the above JSON
 */
const checkFn = (one: string, two: boolean, three: string, four: number, five: Date) => {
    const a = one === "one";
    const b = two === true;
    const c = three === "three";
    const d = four > 12;
    const e = five > new Date("21-04-1983");

    const de = d && e;
    const bcde = b || c || de;
    const abcde = a && bcde;

    return abcde;
}

describe("Builder Tests", () => {
    it.each([
        ["one", false, "three", 20, new Date("1985-01-01")],
        ["1", false, "three", 20, new Date("1985-01-01")],
        ["one", true, "three", 20, new Date("1985-01-01")],
        ["one", false, "five", 20, new Date("1985-01-01")],
        ["one", false, "five", 10, new Date("1985-01-01")],
        ["one", false, "five", 20, new Date("2020-01-01")]
    ])("Returns expected results", (
        one, two, three, four, five
    ) => {
        const evaluate = buildGroup(condition);

        const data = {
            one,
            two,
            three,
            four,
            five,
        };

        const expected = checkFn(one,two,three, four, five);
        console.log(expected);

        const result = evaluate(data);

        expect(result).toBe(expected);
    });
});
