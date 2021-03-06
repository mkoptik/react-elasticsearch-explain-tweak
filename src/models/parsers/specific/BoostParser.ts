
import {ExplainScoreComponent, Parser} from "../Parser";
import {ChildrenCalculation, ScoreComponent, ScoreComponentType} from "../../ScoreComponent";

export class BoostParser extends Parser {

    canParse = (componentDescription: string) => {
        return componentDescription.toLocaleLowerCase().indexOf("boost") >= 0
    };

    parseWithoutChildren = (explainScoreComponent: ExplainScoreComponent): ScoreComponent => {
        return new ScoreComponent({
            childrenCalculation: ChildrenCalculation.None,
            label: "Boost",
            type: ScoreComponentType.Boost,
            children: [],
            result: explainScoreComponent.value,
            modifiedResult: null,
        });
    }

}