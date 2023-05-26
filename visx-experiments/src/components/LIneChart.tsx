import applestock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import useMeasure from "react-use-measure";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Bar } from "@visx/shape";
import { defaultStyles, useTooltip, Tooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { TouchEvent, MouseEvent, useState } from "react";

export function LineGraph() {
  const data = applestock.slice(0, 10);
  const margin = 32;

  const defaultWidth = 100;
  const defaultHeight = 100;
  const textColor = "#e4dbd8";
  const lineOneColor = "#FFB3D9";
  const LineTwoColor = "#EAEAEA";
  const LineThreeColor = "#f7d0e3";
  const axisColor = textColor;
  const toolTipStyles = {
    ...defaultStyles,
    borderRadius: 4,
    background: "#446595",
    color: textColor,
  };
  const tickLabelProps = {
    fill: textColor,
    fontSize: 12,
    fontFamily: "sans-serif",
  } as const;

  const [ref, bounds] = useMeasure();
//   const { showTooltip, hideTooltip, tooltipLeft, tooltipTop, tooltipData } =
//     useTooltip<AppleStock>();
  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin;
  const innerHeight = height - margin;

  function getXValue(d: AppleStock) {
    return d.date;
  }
  function getYValue(d: AppleStock) {
    return d.close;
  }
}
