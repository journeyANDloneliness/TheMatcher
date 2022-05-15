import PropTypes from "prop-types";
import { calculateFromInfo } from "./helper";

export default function Stager({ stage, stageInfo, children }) {
  var i = calculateFromInfo(stage, stageInfo);
  console.log("aaa");
  var style = {
    gap: i.gap
  };
  return (
    <div style={style} className="stager">
      {children}
    </div>
  );
}
