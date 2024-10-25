import ReactEcharts from "echarts-for-react";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chartspage() {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "Bounce Rate by Week of Year",
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%",
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2,
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}%",
        dataPoints: [
          { x: 1, y: 64 },
          { x: 2, y: 61 },
          { x: 3, y: 64 },
          { x: 4, y: 62 },
          { x: 5, y: 64 },
          { x: 6, y: 60 },
          { x: 7, y: 58 },
          { x: 8, y: 59 },
          { x: 9, y: 53 },
          { x: 10, y: 54 },
          { x: 11, y: 61 },
          { x: 12, y: 60 },
          { x: 13, y: 55 },
          { x: 14, y: 60 },
          { x: 15, y: 56 },
          { x: 16, y: 60 },
          { x: 17, y: 59.5 },
          { x: 18, y: 63 },
          { x: 19, y: 58 },
          { x: 20, y: 54 },
          { x: 21, y: 59 },
          { x: 22, y: 64 },
          { x: 23, y: 59 },
        ],
      },
    ],
  };

  // Echart in React

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  return (
    <>
      <h2>Chartspage</h2>
      {/* <LeftSidebar /> */}

      <ReactEcharts
        option={{
          title: {
            text: "Nightingale Chart",
            subtext: "Fake Data",
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            left: "center",
            top: "bottom",
            data: [
              "rose1",
              "rose2",
              "rose3",
              "rose4",
              "rose5",
              "rose6",
              "rose7",
              "rose8",
            ],
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "Radius Mode",
              type: "pie",
              radius: [20, 140],
              center: ["25%", "50%"],
              roseType: "radius",
              itemStyle: {
                borderRadius: 5,
              },
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: [
                { value: [40,20], name: "rose 1" },
                { value: 33, name: "rose 2" },
                { value: 28, name: "rose 3" },
                { value: 22, name: "rose 4" },
                { value: 20, name: "rose 5" },
                { value: 15, name: "rose 6" },
                { value: 12, name: "rose 7" },
                { value: 10, name: "rose 8" },
              ],
            },
            {
              name: "Area Mode",
              type: "pie",
              radius: [20, 140],
              center: ["75%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 5,
              },
              data: [
                { value: 30, name: "rose 1" },
                { value: 28, name: "rose 2" },
                { value: 26, name: "rose 3" },
                { value: 24, name: "rose 4" },
                { value: 22, name: "rose 5" },
                { value: 20, name: "rose 6" },
                { value: 18, name: "rose 7" },
                { value: 16, name: "rose 8" },
              ],
            },
          ],
        }}
      />

      <h3> CanvasJS Chart</h3>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />

      <h3>ReactEcharts bar chart</h3>
      {/* Echart in React */}
      <ReactEcharts option={option} />

      <h3>ReactEcharts line chart</h3>

      <ReactEcharts
        option={{
          xAxis: {
            type: "category",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [
                820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
              ],
              type: "line",
              lineStyle: {
                color: "#25f1f5",
                width: 2,
              },
              itemStyle: {
                borderWidth: 2,
                borderColor: "#a5b0af",
              },
            },
            {
              data: [
                270, 832, 601, 734, 1590, 1830, 1820, 1820, 1032, 901, 934,
                1390,
              ],
              type: "line",
              lineStyle: {
                color: "blue",
                width: 2,
              },
              itemStyle: {
                borderWidth: 2,
                borderColor: "black",
              },
            },
          ],
        }}
      />

      <ReactEcharts
        option={{
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" },
              ],
            },
          ],
        }}
      />
    </>
  );
}
