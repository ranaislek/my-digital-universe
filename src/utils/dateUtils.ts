export const formatDate = (dateString: string | undefined, lang: string) => {
    if (!dateString) return '';
    try {
        const isTurkish = lang.startsWith('tr');

        let date: Date;
        // Check if date String is strictly YYYY-MM-DD to avoid timezone shift
        if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateString.split('-');
            date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
        } else {
            date = new Date(dateString);
        }

        if (isNaN(date.getTime())) return dateString;

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(isTurkish ? 'tr-TR' : 'en-US', options);
    } catch (e) {
        return dateString;
    }
};
