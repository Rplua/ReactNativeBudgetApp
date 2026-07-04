export const createPeriodKey = (year: number, month: number) => {
    return `${year}-${month.toString().padStart(2, "0")}`;
};

export const getCurrentPeriodKey = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return createPeriodKey(year, month);
};

export const getMonthAndYearFromPeriodKey = (periodKey: string) => {
    const [year, month] = periodKey.split("-").map(Number);

    return {
        year,
        month,
    };
};