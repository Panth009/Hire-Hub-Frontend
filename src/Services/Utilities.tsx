const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options = {year: 'numeric' as const, month: 'short' as const}

    return date.toLocaleString('en-US', options)
}

const formatMonth = (date:any) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01T00:00:00`;
};

const getBase64 = (file:any)=> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error);
    })
}

const timeAgo = (postTime: string): string => {
    const seconds = Math.floor(
        (Date.now() - new Date(postTime).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds} sec ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
};

const formatInterviewTime = (dateString:any)=> {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Define options for formatting the date
    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    
    // Format the date
    const formattedDate = date.toLocaleString('en-us', options)
    
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Determine AM or PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine everything into the final format
    return `${formattedDate} on Time: ${hours}:${formattedMinutes} ${ampm}`;
}

const openBase64PDF = (base64String:string) =>{
    const byteCharecters = atob(base64String)
    const byteNumbers = new Array(byteCharecters.length)

    for (let i=0; i< byteCharecters.length; i++){
        byteNumbers[i] = byteCharecters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], {type:'application/pdf'})
    const blobUrl = URL.createObjectURL(blob)
    window.open(blobUrl, '_blank')
}

export {formatDate, formatMonth, getBase64, timeAgo, formatInterviewTime, openBase64PDF}