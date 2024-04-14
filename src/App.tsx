import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [monthsPassed, setMonthsPassed] = useState(0);
  const [hoursPassed, setHoursPassed] = useState(0);
  const [minutesPassed, setMinutesPassed] = useState(0);
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
      const totalMillisecondsInYear = currentDate - startOfYear;
      const totalSecondsInYear = totalMillisecondsInYear / 1000;

      const secondsPassed = Math.floor(totalSecondsInYear % 60);
      const minutesPassed = Math.floor((totalSecondsInYear / 60) % 60);
      const hoursPassed = Math.floor((totalSecondsInYear / 3600) % 24);
      const daysPassed = Math.floor(totalSecondsInYear / 86400);
      const monthsPassed = Math.floor(daysPassed / 30.44); // Approximate number of days in a month

      const percentage = (totalSecondsInYear / 31556952) * 100; // Total seconds in a year
      setProgress(percentage.toFixed(7)); // Round to 7 decimal places for precision

      setDaysPassed(daysPassed);
      setMonthsPassed(monthsPassed);
      setHoursPassed(hoursPassed);
      setMinutesPassed(minutesPassed);
      setSecondsPassed(secondsPassed);
    };

    const timer = setInterval(updateProgress, 1000);

    // Call updateProgress immediately to avoid a delay in displaying the progress
    updateProgress();

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Progress of the Current Year</h2>
      <div>
        <p>Days passed: {daysPassed}</p>
        <p>Months passed: {monthsPassed}</p>
        <p>Hours passed: {hoursPassed}</p>
        <p>Minutes passed: {minutesPassed}</p>
        <p>Seconds passed: {secondsPassed}</p>
      </div>
      <div style={{ width: '100%', backgroundColor: '#eee', padding: '2px', borderRadius: '4px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: 'blue',
            height: '20px',
            borderRadius: '4px',
            transition: 'width 0.5s ease-in-out'
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

