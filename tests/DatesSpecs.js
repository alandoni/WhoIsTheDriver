import DateUtils from './../utils/Date';
const dateUtils = new DateUtils();

describe('DateUtils', () => {
    it('Get day of week name of 2018-5-6', () => {
        const name = dateUtils.getDayOfWeekShortName(new Date(2018, 4, 6));
        expect(name).toEqual('Dom');
    });

    it('Get day of week name of 2018-5-12', () => {
        const name = dateUtils.getDayOfWeekShortName(new Date(2018, 4, 12));
        expect(name).toEqual('Sáb');
    });

    it('Calculate number of days in month 1', () => {
        const number = dateUtils.numberOfDaysInMonth(1, 2018);
        expect(number).toEqual(31);
    });

    it('Calculate number of days in month 2 of 2018', () => {
        const number = dateUtils.numberOfDaysInMonth(2, 2018);
        expect(number).toEqual(28);

    });

    it('Calculate number of days in month 2 of 2020', () => {
        const number = dateUtils.numberOfDaysInMonth(2, 2020);
        expect(number).toEqual(29);

    });

    it('Calculate number of days in month 4', () => {
        const number = dateUtils.numberOfDaysInMonth(4, 2018);
        expect(number).toEqual(30);
    });

    it('Check if 2018-5-12 is weekend', () => {
        const name = dateUtils.isWeekend(new Date(2018, 4, 12));
        expect(name).toEqual(true);
    });

    it('Check if 2018-5-14 is weekend', () => {
        const name = dateUtils.isWeekend(new Date(2018, 4, 14));
        expect(name).toEqual(false);
    });

    it('Check if 2018-5-1 is a holiday', () => {
        const holidays = [new Date(2018, 4, 1).getTime()];
        const workingDays = dateUtils.isWorkingDay(new Date(2018, 4, 1), holidays);
        expect(workingDays).toEqual(false);
    });

    it('Check if 2018-5-2 is not a holiday', () => {
        const holidays = [new Date(2018, 4, 1).getTime()];
        const workingDays = dateUtils.isWorkingDay(new Date(2018, 4, 2), holidays);
        expect(workingDays).toEqual(true);
    });

    it('Check working days in month 5 of 2018', () => {
        const holidays = [new Date(2018, 4, 1).getTime()];
        const workingDays = dateUtils.getWorkingDays(new Date(2018, 4, 1), new Date(2018, 4, 31), holidays);
        expect(workingDays).toEqual(22);
    });

    it('Get first date of the week of 2018-5-7', () => {
        const firstDate = dateUtils.getFirstDateOfWeek(new Date(2018, 4, 7));
        expect(firstDate).toEqual(new Date(2018, 4, 6));
    });

    it('Get last date of the week of 2018-5-7', () => {
        const lastDate = dateUtils.getLastDateOfWeek(new Date(2018, 4, 7));
        expect(lastDate).toEqual(new Date(2018, 4, 12));
    });

    it('Check if the date 2018-5-9 is in the same week of 2018-5-7', () => {
        const isDateInWeek = dateUtils.isDateInWeek(new Date(2018, 4, 9), new Date(2018, 4, 7));
        expect(isDateInWeek).toEqual(true);
    });

    it('Check if the date 2018-5-13 is in the same week of 2018-5-7', () => {
        const isDateInWeek = dateUtils.isDateInWeek(new Date(2018, 4, 13), new Date(2018, 4, 7));
        expect(isDateInWeek).toEqual(false);
    });

    it('Map dates between 2018-5-13 and 2018-5-19', () => {
        let days = 0;
        const dates = dateUtils.mapDates(new Date(2018, 4, 13), new Date(2018, 4, 19), (date) => {
            days++;
        });
        expect(days).toEqual(7);
        expect(days).toEqual(dates.length);
    });

    it('Get first date of month shown in a calendar', () => {
        const firstDate = dateUtils.getFirstDateOfMonthShown(5, 2018);
        expect(firstDate).toEqual(new Date(2018, 3, 29));
    });

    it('Get last date of month shown in a calendar', () => {
        const lastDate = dateUtils.getLastDateOfMonthShown(5, 2018);
        expect(lastDate).toEqual(new Date(2018, 5, 2));
    });

    it('Get last date of month', () => {
        const lastDate = dateUtils.getLastDateOfMonth(5, 2018);
        expect(lastDate).toEqual(new Date(2018, 4, 31));
    });

    it('Sum 1 day to date', () => {
        const newDate = dateUtils.sumDate(new Date(2018, 5, 1), 1);
        expect(newDate).toEqual(new Date(2018, 5, 2));
    });

    it('Sum 3 days to date', () => {
        const newDate = dateUtils.sumDate(new Date(2018, 5, 1), 3);
        expect(newDate).toEqual(new Date(2018, 5, 4));
    });

    it('Sum 35 days to date', () => {
        const newDate = dateUtils.sumDate(new Date(2018, 5, 1), 35);
        expect(newDate).toEqual(new Date(2018, 6, 6));
    });

    it('Sum 1 month to date', () => {
        const newDate = dateUtils.sumMonth(new Date(2018, 5, 1), 1);
        expect(newDate).toEqual(new Date(2018, 6, 1));
    });

    it('Sum 3 month to date', () => {
        const newDate = dateUtils.sumMonth(new Date(2018, 5, 1), 3);
        expect(newDate).toEqual(new Date(2018, 8, 1));
    });

    it('Sum 12 month to date', () => {
        const newDate = dateUtils.sumMonth(new Date(2018, 5, 1), 12);
        expect(newDate).toEqual(new Date(2019, 5, 1));
    });

    it('Is date not less than', () => {
        const isLess = dateUtils.isDateLessThan(new Date(2018, 5, 1), new Date(2018, 4, 29));
        expect(isLess).toEqual(false);
    });

    it('Is date less than', () => {
        const isLess = dateUtils.isDateLessThan(new Date(2018, 4, 29), new Date(2018, 5, 1));
        expect(isLess).toEqual(true);
    });

    it('Is date less than or equal', () => {
        const isLessOrEqual = dateUtils.isDateLessThanOrEqual(new Date(2018, 4, 29), new Date(2018, 5, 1));
        expect(isLessOrEqual).toEqual(true);
    });

    it('Is date not less than or equal', () => {
        const isLessOrEqual = dateUtils.isDateLessThanOrEqual(new Date(2018, 5, 1), new Date(2018, 4, 29));
        expect(isLessOrEqual).toEqual(false);
    });

    it('Is date not greater than', () => {
        const isGreater = dateUtils.isDateGreaterThan(new Date(2018, 3, 1), new Date(2018, 4, 29));
        expect(isGreater).toEqual(false);
    });

    it('Is date greater than', () => {
        const isGreater = dateUtils.isDateGreaterThan(new Date(2018, 6, 29), new Date(2018, 5, 1));
        expect(isGreater).toEqual(true);
    });

    it('Is date greater than or equal', () => {
        const isGreaterOrEqual = dateUtils.isDateGreaterThanOrEqual(new Date(2018, 6, 29), new Date(2018, 5, 1));
        expect(isGreaterOrEqual).toEqual(true);
    });

    it('Is date not greater than or equal', () => {
        const isGreaterOrEqual = dateUtils.isDateGreaterThanOrEqual(new Date(2018, 3, 1), new Date(2018, 4, 29));
        expect(isGreaterOrEqual).toEqual(false);
    });

    it('Is same date', () => {
        const isSameDate = dateUtils.isSameDay(new Date(2018, 5, 1, 23, 1, 22, 123), new Date(2018, 5, 1, 3, 10, 13, 123));
        expect(isSameDate).toEqual(true);
    });

    it('Is not same date', () => {
        const isSameDate = dateUtils.isSameDay(new Date(2018, 5, 1), new Date(2018, 4, 29));
        expect(isSameDate).toEqual(false);
    });

    it('Get number of weeks in 5-2018', () => {
        const weeks = dateUtils.getNumberOfWeeksOfMonth(5, 2018);
        expect(weeks).toEqual(5);
    });

    it('Get number of weeks in a 7-2018', () => {
        const weeks = dateUtils.getNumberOfWeeksOfMonth(7, 2018);
        expect(weeks).toEqual(6);
    });

    it('Zero time', () => {
        const zeroTime = dateUtils.zeroTime(new Date(2018, 5, 3, 2, 4, 50, 123));
        expect(zeroTime).toEqual(new Date(2018, 5, 3));
    });
});