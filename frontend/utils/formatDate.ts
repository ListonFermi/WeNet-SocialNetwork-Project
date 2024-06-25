export function formatDate(dateString: string) {
    // Parse the input date string
    const date = new Date(dateString);

    // Get the components of the date
    const day = date.getUTCDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear().toString().slice(-2);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;  

    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}${ampm}`;
    
    return formattedDate;
}

