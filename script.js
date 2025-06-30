async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const resultDiv = document.getElementById('weatherResult');
  
  if (!location) {
    resultDiv.innerHTML = 'Please enter a location.';
    return;
  }

  const apiKey = '161fa184f3fb4801b0483839251903';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Location not found');
    const data = await response.json();
    
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <strong>${city}, ${country}</strong><br>
      Temperature: ${tempC}°C<br>
      Condition: ${condition}
    `;
  } catch (error) {
    resultDiv.innerHTML = 'Error: ' + error.message;
  }
}
