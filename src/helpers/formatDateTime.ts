export const getTimeDiff = (isoString: string): {
  hoursRemaining: number;
  hhmmssRemaining: string;
} => {
  const now = new Date();
  const target = new Date(isoString);

  const diffMs = target.getTime() - now.getTime();
  const totalSeconds = Math.max(Math.floor(diffMs / 1000), 0); // Never negative

  const hoursRemaining = +(totalSeconds / 3600).toFixed(0); // e.g. 5.25
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  const hhmmssRemaining = `${hours}:${minutes}:${seconds}`;

  return { hoursRemaining, hhmmssRemaining };
};

export const getFormattedDateParts = (isoString?: string) => {
  if (!isoString) {
    return {
      month: '',
      date: '',
      year: '',
      time: '',
      day: '',
    };
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid time value');
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const parts = formatter.formatToParts(date);
  const lookup = (type: string) => parts.find(p => p.type === type)?.value || '';

  return {
    month: lookup('month'),
    date: lookup('day'),
    year: lookup('year'),
    time: `${lookup('hour')}:${lookup('minute')} ${lookup('dayPeriod')}`,
    day: lookup('weekday'),
  };
};
