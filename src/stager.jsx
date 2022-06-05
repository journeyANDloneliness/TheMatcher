
import PropTypes from "prop-types";
import { calculateFromInfo } from "./helper";
import React from "react"

export default function Stager(props) {
  var i = calculateFromInfo(props.stage, props.stageInfo);
  console.log("aaa");
  var style = {
    gap: i.gap
  };
  return (
    <div style={style} className="stager">
      {props.children}
    </div>
  );
}
