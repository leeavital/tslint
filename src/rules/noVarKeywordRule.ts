/*
 * Copyright 2015 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

///<reference path='../../lib/tslint.d.ts' />

var OPTION_LEADING_UNDERSCORE = "no-var-keyword";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "use of the var-keyword is disallowed, use 'let' or 'const' instead";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        var noVarKeywordWalker = new NoVarKeywordWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(noVarKeywordWalker);
    }
}

class NoVarKeywordWalker extends Lint.RuleWalker {
    public visitVariableStatement(node: ts.VariableStatement): void {
        if (!Lint.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword)
            && !Lint.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
            var flags = node.declarationList.flags;
            var declarationIsLet = (Math.floor(flags / ts.NodeFlags.Let) % 2) === 1;
            var declarationIsConst = (Math.floor(flags / ts.NodeFlags.Const) % 2) === 1;
            if (!declarationIsConst && !declarationIsLet) {
                this.addFailure(this.createFailure(node.getStart(), "var".length, Rule.FAILURE_STRING));
            }
        }

        super.visitVariableStatement(node);
    }
}
