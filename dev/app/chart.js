const ctx3 = document.getElementById("myChart3").getContext("2d");

const config1 = {
  id: "myChart1",
  data: [20, 20, 20, 20, 20, 20, 20, 20],
  value: 80,
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
  needleColor: "red"
};

const config2 = {
  id: "myChart2",
  data: [2, 2, 2, 2, 2, 2, 2, 2],
  value: 8,
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
  needleColor: "#e5e5e5"
};

const config3 = {
  id: "myChart3",
  data: [2, 2, 2, 2, 2, 2, 2, 2],
  value: 100,
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
  needleColor: "red"
};

//
function customChartJs(config) {
  // VARS
  const canvas = document.getElementById(config.id);
  const ctx = document.getElementById(config.id).getContext("2d");
  const bgColor = config.backgroundColor;
  const data = config.data;
  let spacing = 65;
  const totalData = config.data.reduce((a, b) => a + b, 0);
  let value = config.value;
  if (value > totalData) value = totalData;
  if (value < 0) value = 0;
  const ndColor = config.needleColor;

  const chart = new Chart(ctx, {
    plugins: [
      {
        afterDraw: chart => {
          const angle = Math.PI + (1 / totalData) * value * Math.PI;
          const cw = canvas.offsetWidth;
          const ch = canvas.offsetHeight;
          const scale = canvas.offsetWidth / 500;
          const cx = cw / 2;
          const cy = ch - 35 * scale;

          // console.log(cx);
          // console.log(cy);

          // NUDDLE
          const point1 = 10 * scale * -1;
          const point2 = 120 * scale;
          const point3 = 10 * scale;
          ctx.translate(cx, cy);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, point1);
          ctx.lineTo(point2, 0);
          ctx.lineTo(0, point3);
          ctx.fillStyle = ndColor;
          ctx.fill();
          ctx.rotate(-angle);
          ctx.translate(-cx, -cy);

          // DOT
          const radius = 10 * scale;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();

          // TEXT
          ctx.font = "20px Comic Sans MS";
          ctx.fillStyle = "#898989";
          ctx.fillText("$600", 60, 105);
          ctx.fillText("$1,100", 210, 38);
          ctx.fillText("$1,600", 385, 105);
        }
      }
    ],
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: data,
          backgroundColor: bgColor,
          borderWidth: 0,
          spacing: spacing,
          cutout: "80%",
          circumference: 180,
          rotation: -90
        }
      ]
    },
    options: {
      aspectRatio: 1.75,
      maintainAspectRatio: true,
      responsive: true,
      onResize: function(a, b) {
        // console.log(a);
        // console.log(b);
        const scale = canvas.offsetWidth / 500;
        spacing = 65 * scale;
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          top: 50,
          left: 50,
          right: 50
        }
      },
      tooltip: {
        enabled: false
      }
    }
  });
}

// start
customChartJs(config1);

customChartJs(config2);

customChartJs(config3);
