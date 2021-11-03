// const ctx1 = document.getElementById("myChart1").getContext("2d");
// const ctx2 = document.getElementById("myChart2").getContext("2d");
const ctx3 = document.getElementById("myChart3").getContext("2d");

// // CHART 1
// const myChart1 = new Chart(ctx1, {
//   type: "line",
//   data: {
//     labels: [0, 1, 2, 3, 4, 5],
//     datasets: [
//       {
//         label: "line 1",
//         data: [0, 1, 2, 3, 4, 5],
//         backgroundColor: "red",
//         borderColor: "#ffb6b6",
//         tension: 0.1
//       },
//       {
//         label: "line 2",
//         data: [0, 1, 1.5, 2, 3, 2],
//         backgroundColor: "blue",
//         borderColor: "#7e9df9",
//         tension: 0.1
//       }
//     ]
//   }
// });

// // CHART 2
// const myChart2 = new Chart(ctx2, {
//   type: "bar",
//   data: {
//     labels: [0, 1, 2, 3, 4, 5],
//     datasets: [
//       {
//         label: "line 1",
//         data: [0.2, 1, 2, 3, 4, 5],
//         backgroundColor: "red",
//         borderColor: "#ffb6b6",
//         tension: 0.1
//       },
//       {
//         label: "line 2",
//         data: [0.5, 1, 1.5, 2, 3, 2],
//         backgroundColor: "blue",
//         borderColor: "#7e9df9",
//         tension: 0.1
//       }
//     ]
//   }
// });

// CHART 3
const myChart3 = new Chart(ctx3, {
  plugins: [
    {
      afterDraw: chart => {
        var needleValue = 15;
        var dataTotal = 16;
        var angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
        var ctx = document.getElementById("myChart3").getContext("2d");
        var cw = 500;
        var ch = 300;
        var cx = cw / 2;
        var cy = 240;

        console.log(angle);
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(120, 0);
        ctx.lineTo(0, 10);
        ctx.fillStyle = "#e5e5e5";
        ctx.fill();
        ctx.rotate(-angle);
        ctx.translate(-cx, -cy);

        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    {
      afterDraw: chart => {
        var ctx = document.getElementById("myChart3").getContext("2d");

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
        data: [2, 2, 2, 2, 2, 2, 2, 2],
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
        hoverBackgroundColor: ["red"],
        borderColor: "#ffb6b6",
        borderWidth: 0,
        spacing: 65,
        cutout: "80%",
        circumference: 180,
        rotation: -90
      }
    ]
  },
  options: {
    aspectRatio: 1.75,
    responsive: true,
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 50,
        left: 50,
        right: 50
      }
    }
  }
});
