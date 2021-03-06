/**
 * @title Some title here
 * @description Some description here
 */
export class MyObject {
    /**
     * @title String field title
     * @minLength 10
     * @format date-time
     * @pattern /^\d+$/
     */
    stringValue: string;

    /**
     * This field is of integer type.
     * Integer!
     *
     * @title Number field title
     * @exclusiveMaximum 10
     * @multipleOf 3
     * @schemaType integer
     */
    numberValue: number;

    /**
     * Some ignored comment description
     *
     * @description Export field description
     * @default {"length": 10}
     */
    exportString: MyExportString;

    /**
     * @description Export field description
     * @default "private"
     */
    privateString: MyPrivateString;

    /**
     * @title Non empty array
     */
    numberArray: MyNonEmptyArray<number>;
}

/**
 * @title My export string
 */
export type MyExportString = string;

/**
 * @title My private string
 */
export type MyPrivateString = string;

/**
 * @minItems 1
 */
export type MyNonEmptyArray<T> = T[];
