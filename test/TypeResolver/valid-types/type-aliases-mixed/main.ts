export interface MyObject {
    primitive: MyString;
    object: MySubObject;
}

export type MyString = string;

export interface MySubObject {
    propA: number;
    propB: number;
}
