let ctx = canvas.getContext("2d");

let pos = [0, 0];
let vector = [5, 5];
let bounds = [1280, 1024];
let imgSize = [1792, 1280];


function draw() {
  ctx.clearRect(0, 0, ...bounds);
  ctx.drawImage(testimg, ...pos, canvas.width * 2, canvas.height * 2);
  pos = pos.map((p, i) => p + vector[i]);

  let center = pos.map((p, i) => p + imgSize[i] / 2);

  center.forEach((p, i) => {
    if (p > bounds[i] || p < 0) {
      vector[i] *= -1;
    }
  });

  requestAnimationFrame(draw);
}

draw();