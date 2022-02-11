import { Jsml } from "kodim-cms/esm/jsml";
import { renderJsml } from "./render-jsml";

interface Props {
  jsml: Jsml,
}

const JsmlContainer = ({ jsml }: Props): JSX.Element => (
  <>
    {renderJsml(jsml)}
  </>
);

export default JsmlContainer;