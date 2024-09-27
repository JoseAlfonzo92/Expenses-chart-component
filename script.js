document.addEventListener('DOMContentLoaded', () => {
  const chartContainer = document.getElementById('chart');

  // Function to create a bar with tooltip and label
  const createBar = (dayData, isCurrentDay) => {
    const barContainer = document.createElement('div');
    barContainer.classList.add('chart-bar');

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${dayData.amount * 2}px`; 

    // Highlight current day
    if (isCurrentDay) {
      bar.classList.add('current-day'); 
    }

    // Tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = `$${dayData.amount}`;
    barContainer.appendChild(tooltip);

    // Tooltip visibility handlers
    barContainer.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.bottom = `${bar.offsetHeight + 30}px`; 
    });

    barContainer.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });

    barContainer.appendChild(bar);

    // Day label
    const dayLabel = document.createElement('span');
    dayLabel.classList.add('day-label');
    dayLabel.textContent = dayData.day.slice(0, 3); 
    barContainer.appendChild(dayLabel);

    return barContainer;
  };

  // Fetch the JSON data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();

      data.forEach(dayData => {
        const isCurrentDay = dayData.day === currentDay;
        const barElement = createBar(dayData, isCurrentDay);
        chartContainer.appendChild(barElement);
      });
    })
    .catch(error => console.error('Error fetching the data:', error));
});


