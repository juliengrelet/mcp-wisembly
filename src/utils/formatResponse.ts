const formatResponse = (data: any, eventId: string): string => {
    try {
        let formatted = `📅 Wisembly Event: ${eventId}\n`;
        formatted += "=".repeat(50) + "\n\n";
        
        if (data?.id) {
            formatted += `🆔 ID: ${data.id}\n`;
        }
        
        if (data?.name || data?.title) {
            formatted += `📌 Name: ${data?.name || data?.title}\n`;
        }
        
        if (data.description) {
            formatted += `📝 Description: ${data.description}\n`;
        }
        
        if (data.status) {
            formatted += `🎯 Status: ${data.status}\n`;
        }
        
        if (data.startDate || data.date || data.start_date) {
            const date = data.startDate || data.date || data.start_date;
            formatted += `📅 Start Date: ${date}\n`;
        }
        
        if (data.endDate || data.end_date) {
            const date = data.endDate || data.end_date;
            formatted += `🏁 End Date: ${date}\n`;
        }
        
        if (data.location || data.venue) {
            formatted += `📍 Location: ${data.location || data.venue}\n`;
        }
        
        if (data.organizer || data.host) {
            formatted += `👤 Organizer: ${data.organizer || data.host}\n`;
        }
        
        if (data.participantCount || data.participants || data.attendees) {
            const count = data.participantCount || data.participants || data.attendees;
            formatted += `👥 Participants: ${typeof count === 'number' ? count : 'Unknown'}\n`;
        }
        
        if (data.url || data.link) {
            formatted += `🔗 URL: ${data.url || data.link}\n`;
        }
    
        formatted += "\n" + "─".repeat(50) + "\n";
        formatted += "📋 Complete API Response:\n\n";
        formatted += "```json\n";
        formatted += JSON.stringify(data, null, 2);
        formatted += "\n```";
    
        return formatted;
    } catch (error) {
        console.error(`❌ Error formatting event data:`, error);
        return `❌ Error formatting event "${eventId}" data: ${error}\n\n📋 Raw API Response:\n${JSON.stringify(data, null, 2)}`;
    }
}

export { formatResponse }