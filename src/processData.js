export async function processData(weather) {
  return {
    currentConditions: weather.currentConditions,
    days: weather.days,
    description: weather.description,
    resolvedAddress: weather.resolvedAddress,
  };
}
