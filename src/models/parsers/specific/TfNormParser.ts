
import {ExplainScoreComponent, Parser} from "../Parser";
import {ChildrenCalculation, FormulaScoreComponent, ScoreComponent, ScoreComponentType} from "../../ScoreComponent";
import {RegExpParser} from "../RegExpParser";

export class TfNormParser extends RegExpParser {

    constructor() {
        //tfNorm, computed as (freq * (k1 + 1)) / (freq + k1 * (1 - b + b * fieldLength / avgFieldLength)) from:,
        super(/computed\sas\s(.*)\sfrom/, 1, 1)
    }

    protected mapToScoreComponent = (explainScoreComponent: ExplainScoreComponent, matchedGroups: string[]): FormulaScoreComponent => {
        return new FormulaScoreComponent({
            type: ScoreComponentType.TfNorm,
            formula: matchedGroups[1],
            childrenCalculation: ChildrenCalculation.FormulaVariables,
            label: "TF norm",
            modifiedResult: null,
            result: explainScoreComponent.value
        });
    };

    getChildrenParsers = (): Parser[] => [
        new RegExpParser(/(termFreq)=.*/, 1, 1),
        new RegExpParser(/parameter\s(.*)/, 1, 1),
        new RegExpParser(/avgFieldLength/, 0),
        new RegExpParser(/fieldLength/, 0)
    ];
}