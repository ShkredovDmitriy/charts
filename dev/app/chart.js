const config1 = {
  id: "myChart1",
  data: [20, 20, 20, 20, 20, 20, 20, 20],
  value: 0,
  backgroundColor: [
    "#a9c6ff",
    "#a9c6ff",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#f78080",
    "#f78080"
  ],
  needleColor: "green",
  label1: "20%",
  label2: "50%",
  label3: "80%"
};

const config2 = {
  id: "myChart2",
  data: [20, 20, 20, 20, 20, 20, 20, 20],
  value: 67,
  backgroundColor: [
    "#3caf93",
    "#3caf93",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#f78080",
    "#f78080"
  ],
  needleColor: "#e5e5e5",
  label1: "$600",
  label2: "$1,100",
  label3: "$1,600"
};

const config3 = {
  id: "myChart3",
  data: [20, 20, 20, 20, 20, 20, 20, 20],
  value: 160,
  backgroundColor: [
    "#3caf93",
    "#3caf93",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#c0e9df",
    "#fff453",
    "#fff453"
  ],
  needleColor: "red",
  label1: "2%",
  label2: "6%",
  label3: "10%"
};

function customChartJs(config) {
  // VARS
  const canvas = document.getElementById(config.id);
  const ctx = document.getElementById(config.id).getContext("2d");
  const bgColor = config.backgroundColor;
  const data = config.data;
  const totalData = config.data.reduce((a, b) => a + b, 0);
  let value = config.value;
  if (value > totalData) value = totalData;
  if (value < 0) value = 0;
  const needleColor = config.needleColor;
  const label1 = config.label1;
  const label2 = config.label2;
  const label3 = config.label3;

  const spacing = 64;
  const fontSize = 25;
  const fontFamily = "Roboto-Regular";

  const chart = new Chart(ctx, {
    plugins: [
      {
        afterDraw: chart => {
          // console.log(chart);
          const needleValue = chart.config.data.datasets[0].needleValue;
          const dataTotal = chart.config.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
          const ctx = chart.ctx;
          const cw = chart.canvas.offsetWidth;
          const ch = chart.canvas.offsetHeight;
          const scale = canvas.offsetWidth / 500;
          const cx = cw / 2;
          const cy = ch - 48 * scale;

          // ARROW
          const point1 = 12 * scale * -1;
          const point2 = 140 * scale;
          const point3 = 12 * scale;
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, point1);
          ctx.lineTo(point2, 0);
          ctx.lineTo(0, point3);
          ctx.fillStyle = needleColor;
          ctx.fill();
          ctx.rotate(-angle);
          ctx.translate(-cx, -cy);

          // DOT
          const radius = 12 * scale;
          const dotY = ch - 48 * scale;
          ctx.beginPath();
          ctx.arc(cx, dotY, radius, 0, Math.PI * 2);
          ctx.fill();

          // LABELS
          const font = fontSize * scale + "px " + fontFamily;
          ctx.font = font;
          ctx.fillStyle = "#898989";

          // LABEL 1
          ctx.textAlign = "right";
          ctx.fillText(label1, 84 * scale, 88 * scale);

          // LABEL 2
          ctx.textAlign = "center";
          ctx.fillText(label2, 248 * scale, 19 * scale);

          // LABEL 3
          ctx.textAlign = "left";
          ctx.fillText(label3, 410 * scale, 88 * scale);
        }
      }
    ],
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: data,
          needleValue: value,
          backgroundColor: bgColor,
          borderWidth: 0,
          spacing: spacing,
          cutout: "83%",
          circumference: 180,
          rotation: -90
        }
      ]
    },
    options: {
      autoPadding: false,
      layout: {
        padding: {
          top: 19,
          bottom: 0
        },
        autoPadding: false
      },
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      cutoutPercentage: 70,
      aspectRatio: 1.75,
      onResize: function(chart) {
        const width = chart.canvas.offsetWidth;
        const scale = chart.canvas.offsetWidth / 500;
        chart.config.options.layout.padding.top = 19 * scale;
        chart.config.data.datasets[0].spacing = spacing * scale;
      }
    }
  });
}

// START
customChartJs(config1);

customChartJs(config2);

customChartJs(config3);
