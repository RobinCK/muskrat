import {BaseType, IFormatter} from './model';
import {Definition} from './schema/';

export class CircularReferenceFormatter implements IFormatter {
    private definition = new Map<BaseType, Definition>();
    private children = new Map<BaseType, BaseType[]>();

    public constructor(
        private formatter: IFormatter,
    ) {
    }

    public isSupport(type: BaseType): boolean {
        return this.formatter.isSupport(type);
    }

    public getDefinition(type: BaseType): Definition {
        if (this.definition.has(type)) {
            return this.definition.get(type)!;
        }

        const definition: Definition = {};
        this.definition.set(type, definition);
        Object.assign(definition, this.formatter.getDefinition(type));

        return definition;
    }

    public getChildren(type: BaseType): BaseType[] {
        if (this.children.has(type)) {
            return this.children.get(type)!;
        }

        const children: BaseType[] = [];
        this.children.set(type, children);
        children.push(...this.formatter.getChildren(type));

        return children;
    }
}
