// Enable "Enter" key for the input field
document.getElementById("torqueInput").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    calculateInterpolation();
  }
});

function calculateInterpolation() {
  // Check the current date
  const currentDate = new Date();
  const cutoffDate = new Date('2024-08-08');

  // Check if the current date is beyond the cutoff date
  if (currentDate > cutoffDate) {
    document.getElementById("result").innerText = 'Interpolated value (in PSI):';
    document.getElementById("roundedResult").innerText = 'Rounded Off Interpolated value (in PSI):';
    document.getElementById("error").innerText = 'Error: Data entry not allowed after 08 August 2024';
    return;
  }

  // Get the input value
  const inputX = parseFloat(document.getElementById("torqueInput").value);

  // Given data points
  const dataPoints = [
    { x: 10506.0, y: 2000 },
    { x: 31383.6, y: 6000 },
    { x: 51031.4, y: 10000 }
  ];

  // Check if the input is within the range
  if (inputX < dataPoints[0].x || inputX > dataPoints[dataPoints.length - 1].x) {
    document.getElementById("result").innerText = 'Interpolated value (in PSI):';
    document.getElementById("roundedResult").innerText = 'Rounded Off Interpolated value (in PSI):';
    document.getElementById("error").innerText = 'Error: Torque value out of range';
    return;
  }

  // Find the two closest data points
  let lowerPoint, upperPoint;
  for (let i = 0; i < dataPoints.length - 1; i++) {
    if (inputX >= dataPoints[i].x && inputX <= dataPoints[i + 1].x) {
      lowerPoint = dataPoints[i];
      upperPoint = dataPoints[i + 1];
      break;
    }
  }

  // Perform linear interpolation and round off to 2 decimal places
  const interpolatedY = interpolate(inputX, lowerPoint.x, lowerPoint.y, upperPoint.x, upperPoint.y);
  const roundedInterpolatedY = roundToTwoDecimalPlaces(interpolatedY);

  // Display the results and clear error message
  document.getElementById("result").innerText = `Interpolated value (in PSI): ${interpolatedY}`;
  document.getElementById("roundedResult").innerText = `Rounded Off Interpolated value (in PSI): ${roundedInterpolatedY}`;
  document.getElementById("error").innerText = '';
}

function interpolate(x, x0, y0, x1, y1) {
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
}

function roundToTwoDecimalPlaces(value) {
  return Math.round(value * 100) / 100;
}
