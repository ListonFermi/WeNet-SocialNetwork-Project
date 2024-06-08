export const validateDateOfBirth = (value: Date) => {
    const selectedDate = new Date(value);
    const today = new Date();
    const minAge = 18;
    const maxAge = 100;
    
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();
    const dayDifference = today.getDate() - selectedDate.getDate();
    const isBeforeToday = selectedDate < today;

    if (!isBeforeToday) {
      return "Date of birth cannot be in the future";
    }

    if (
      age < minAge ||
      (age === minAge && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
    ) {
      return `You must be at least ${minAge} years old`;
    }

    if (
      age > maxAge ||
      (age === maxAge && (monthDifference > 0 || (monthDifference === 0 && dayDifference > 0)))
    ) {
      return `You must be less than ${maxAge} years old`;
    }

    return true;
  };