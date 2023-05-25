//data
import applestock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import useMeasure from "react-use-measure";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Bar } from "@visx/shape";
import { defaultStyles, useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { TouchEvent, MouseEvent } from "react";
import "../css/BarChart.css";
const data = applestock.slice(0, 20);

const margin = 64;

const defaultWidth = 100;
const defaultHeight = 100;
const textColor = "#e4dbd8";
const toolTipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#1c2a3f",
  color: textColor,
};

const axisColor = textColor;
const tickLabelProps = {
  fill: textColor,
  fontSize: 12,
  fontFamily: "sans-serif",
} as const;
export function BarChart() {
  const [ref, bounds] = useMeasure();
  const { showTooltip, hideTooltip, tooltipLeft, tooltipTop, tooltipData } =
    useTooltip<AppleStock>();
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
  function isOdd(number: number) {
    return number % 2 === 0;
  }
  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: data.map(getXValue),
    padding: 0.2,
  });
  const yScale = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1,
    ],
  });
  return (
    <div className="barchart-container">
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <Group>
          {data.map((d, index) => {
            const xValue = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;
            const fillColor = isOdd(index) ? "#FFB3D9" : "#EAEAEA";
            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                rx={5}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={fillColor}
                onMouseLeave={() => hideTooltip()}
                onMouseMove={(
                  e: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>
                ) => {
                  const point = localPoint(e);
                  if (!point) return;
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: point.x,
                    tooltipTop: point.y,
                  });
                }}
              />
            );
          })}
        </Group>
        <Group>
          <AxisLeft
            left={margin}
            scale={yScale}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={tickLabelProps}
          />
        </Group>
        <Group>
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={tickLabelProps}
          />
        </Group>
      </svg>
      {tooltipData ? (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={toolTipStyles}
        >
          <b>Date</b> : {getXValue(tooltipData)}
          <br></br>
          <b>Closing Price</b> : {getYValue(tooltipData)}
        </TooltipWithBounds>
      ) : null}
    </div>
  );
}
