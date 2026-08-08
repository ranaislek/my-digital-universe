const TURKISH_MONTHS: Record<string, string> = {
    'oca': 'Jan', 'ocak': 'Jan',
    'şub': 'Feb', 'şubat': 'Feb', 'sub': 'Feb', 'subat': 'Feb',
    'mar': 'Mar', 'mart': 'Mar',
    'nis': 'Apr', 'nisan': 'Apr',
    'may': 'May', 'mayıs': 'May', 'mayis': 'May',
    'haz': 'Jun', 'haziran': 'Jun',
    'tem': 'Jul', 'temmuz': 'Jul',
    'ağu': 'Aug', 'ağustos': 'Aug', 'agu': 'Aug', 'agustos': 'Aug',
    'eyl': 'Sep', 'eylül': 'Sep', 'eylul': 'Sep',
    'eki': 'Oct', 'ekim': 'Oct',
    'kas': 'Nov', 'kasım': 'Nov', 'kasim': 'Nov',
    'ara': 'Dec', 'aralık': 'Dec', 'aralik': 'Dec'
};

export const parseContentDate = (dateStr?: string) => {
    if (!dateStr) return { start: 0, end: 0, isPresent: false };

    let normalized = dateStr.trim().toLowerCase();

    // Replace Turkish month names with English equivalents
    for (const [tr, en] of Object.entries(TURKISH_MONTHS)) {
        normalized = normalized.replace(new RegExp(`\\b${tr}\\b`, 'gi'), en);
    }

    const parts = normalized.split(/[–-]/);
    const startDateStr = parts[0].trim();
    const endDateStr = parts[parts.length - 1].trim();

    const isPresent = (
        endDateStr.includes('present') ||
        endDateStr.includes('günümüz') ||
        endDateStr.includes('devam')
    );

    const parseSingleDate = (str: string): number => {
        if (!str) return 0;
        // Check YYYY-MM-DD or YYYY-MM
        if (/^\d{4}-\d{2}(-\d{2})?$/.test(str)) {
            const d = new Date(str);
            return isNaN(d.getTime()) ? 0 : d.getTime();
        }
        // Check YYYY only
        if (/^\d{4}$/.test(str)) {
            const d = new Date(`${str}-01-01`);
            return isNaN(d.getTime()) ? 0 : d.getTime();
        }
        const d = new Date(str);
        return isNaN(d.getTime()) ? 0 : d.getTime();
    };

    const start = parseSingleDate(startDateStr);
    const end = isPresent ? Date.now() : (parseSingleDate(endDateStr) || start);

    return { start, end, isPresent };
};

export const compareContentDates = (dateStrA?: string, dateStrB?: string): number => {
    const aDetails = parseContentDate(dateStrA);
    const bDetails = parseContentDate(dateStrB);

    // If both are present, compare start dates (newest starting role/item first)
    if (aDetails.isPresent && bDetails.isPresent) {
        return bDetails.start - aDetails.start;
    }

    // Present item goes first
    if (aDetails.isPresent && !bDetails.isPresent) return -1;
    if (!aDetails.isPresent && bDetails.isPresent) return 1;

    // Otherwise sort by end date (or start date if end dates are equal)
    if (bDetails.end !== aDetails.end) {
        return bDetails.end - aDetails.end;
    }
    return bDetails.start - aDetails.start;
};

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

