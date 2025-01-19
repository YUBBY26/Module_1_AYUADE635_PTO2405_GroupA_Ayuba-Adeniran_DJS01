/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result,
 *    and it throws an error to the user if something has gone wrong (e.g., parameter used with an incorrect unit of measurement, etc.)
 */

// Utility function to validate input values
function validateInputs(value, expectedUnit, paramName) {
  if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Invalid input for ${paramName}. Expected a number in ${expectedUnit}, got ${typeof value}.`);
  }
  if (value < 0) {
      throw new Error(`${paramName} cannot be negative. Received ${value} ${expectedUnit}.`);
  }
}

// Function to calculate new velocity with validation
function calcNewVel(vel, acc, time) {
  validateInputs(vel, 'km/h', 'Velocity');
  validateInputs(acc, 'm/s^2', 'Acceleration');
  validateInputs(time, 'seconds', 'Time');

  // Convert velocity from km/h to m/s for consistent units
  const velInMetersPerSecond = vel * (1000 / 3600);
  const newVelInMetersPerSecond = velInMetersPerSecond + acc * time;

  // Convert back to km/h for the result
  return newVelInMetersPerSecond * (3600 / 1000);
}

// Given Parameters
const velocity = 10000; // velocity (km/h)
const acceleration = 3; // acceleration (m/s^2)
const time = 3600; // seconds (1 hour)
const initialDistance = 0; // distance (km)
const remainingFuel = 5000; // remaining fuel (kg)
const fuelBurnRate = 0.5; // fuel burn rate (kg/s)

try {
  // Validate inputs
  validateInputs(velocity, 'km/h', 'Velocity');
  validateInputs(acceleration, 'm/s^2', 'Acceleration');
  validateInputs(time, 'seconds', 'Time');
  validateInputs(initialDistance, 'km', 'Initial Distance');
  validateInputs(remainingFuel, 'kg', 'Remaining Fuel');
  validateInputs(fuelBurnRate, 'kg/s', 'Fuel Burn Rate');

  // Calculate new values
  const newDistance = initialDistance + (velocity * (time / 3600)); // Convert time to hours for km calculation
  const remainingFuelAfterBurn = remainingFuel - (fuelBurnRate * time);
  const newVelocity = calcNewVel(velocity, acceleration, time);

  // Output results
  console.log(`Corrected New Velocity: ${newVelocity.toFixed(2)} km/h`);
  console.log(`Corrected New Distance: ${newDistance.toFixed(2)} km`);
  console.log(`Corrected Remaining Fuel: ${remainingFuelAfterBurn.toFixed(2)} kg`);

} catch (error) {
  console.error(`Error: ${error.message}`);
}
