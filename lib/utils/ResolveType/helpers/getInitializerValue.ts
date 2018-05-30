import * as ts from 'typescript';
import {SGMetadata} from '../../../model/SGMetadata';

export function getInitializerValue(initializer?: ts.Expression, type?: SGMetadata.Type): any {
    if (!initializer) {
        return;
    }

    switch (initializer.kind as ts.SyntaxKind) {
        case ts.SyntaxKind.ArrayLiteralExpression:
            return (initializer as ts.ArrayLiteralExpression)
                .elements
                .map((element) => getInitializerValue(element))
            ;
        case ts.SyntaxKind.StringLiteral:
            return (initializer as ts.StringLiteral).text;
        case ts.SyntaxKind.TrueKeyword:
            return true;
        case ts.SyntaxKind.FalseKeyword:
            return false;
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.FirstLiteralToken:
            return Number((initializer as ts.NumericLiteral).text);
        case ts.SyntaxKind.NewExpression:
            const newExpression = initializer as ts.NewExpression;

            if ((newExpression.expression as ts.Identifier).text === 'Date') {
                let date = new Date();

                if (newExpression.arguments) {
                    const newArguments = newExpression.arguments.filter(args => args.kind !== undefined);
                    const argsValue = newArguments.map(args => getInitializerValue(args));

                    if (argsValue.length > 0) {
                        date = new Date(argsValue as any);
                    }
                }

                const dateString = date.toISOString();

                if (type && type.dataType === 'date') {
                    return dateString.split('T')[0];
                }

                return dateString;
            }

            return;
        case ts.SyntaxKind.ObjectLiteralExpression:
            const objectLiteral = initializer as ts.ObjectLiteralExpression;
            const nestedObject: any = {};

            objectLiteral.properties.forEach((p: any) => {
                nestedObject[p.name.text] = getInitializerValue(p.initializer);
            });

            return nestedObject;
        default:
            return;
    }
}