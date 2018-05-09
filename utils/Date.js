export default class {

    DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    shortDayName(dayIndex) {
        return this.DAYS[dayIndex].substr(0, 3);
    }

    getDayOfWeekName(date) {
        return this.DAYS[date.getDay()];
    }

    getMonthName(month) {
        return this.MONTHS[month];
    }

    getDayOfWeekShortName(date) {
        return this.shortDayName(date.getDay());
    }

    numberOfDaysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    isWeekend(date) {
        const weekDay = date.getDay();
        return weekDay == 0 || weekDay == 6;
    }

    getWorkingDays(startDate, endDate, holidaysDatesList) {
        let result = 0;

        this.mapDates(startDate, endDate, (currentDate) => {
            if (this.isWorkingDay(currentDate, holidaysDatesList)) {
                result++;
            }
        });

        return result;
    }

    isWorkingDay(date, holidaysDatesList) {
        if (this.isWeekend(date) || holidaysDatesList.indexOf(date.getTime()) > -1) {
            return false;
        }
        return true;
    }

    getFirstDateOfWeek(date) {
        const dayOfWeek = date.getDay();
        return this.zeroTime(this.sumDate(date, -dayOfWeek));
    }

    getLastDateOfWeek(date) {
        const dayOfWeek = date.getDay();
        return this.zeroTime(this.sumDate(date, 6 - dayOfWeek));
    }

    isDateInWeek(date, weekDate) {
        const firstDayOfWeek = this.getFirstDateOfWeek(weekDate);
        const lastDayOfWeek = this.getLastDateOfWeek(weekDate);
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }

    mapDates(initialDate, finalDate, method) {
        let currentDate = new Date(this.zeroTime(initialDate));
        const final = this.zeroTime(finalDate);
        const dates = [];
        while (currentDate <= final) {
            method(currentDate);
            dates.push(currentDate.getTime());
            currentDate = this.sumDate(currentDate, 1);
        }
        return dates;
    }

    getFirstDateOfMonthShown(month, year) {
        const firstDayOfMonth = new Date(year, --month, 1);
        const dayOfWeekOfFirstDayOfMonth = firstDayOfMonth.getDay();
        return this.zeroTime(this.sumDate(firstDayOfMonth, -dayOfWeekOfFirstDayOfMonth));
    }

    getLastDateOfMonthShown(month, year) {
        const lastDayOfMonth = this.getLastDateOfMonth(month, year);
        const dayOfWeekOfLastDayOfMonth = lastDayOfMonth.getDay();
        return this.sumDate(lastDayOfMonth, 6 - dayOfWeekOfLastDayOfMonth);
    }

    getLastDateOfMonth(month, year) {
        let lastDayOfMonth  = new Date(year, --month, 1);
        lastDayOfMonth = this.sumMonth(lastDayOfMonth, 1);
        lastDayOfMonth = this.sumDate(lastDayOfMonth, -1);
		return this.zeroTime(lastDayOfMonth);
	}

    sumDate(date, numberOfDays) {
		var newDate = new Date(date);
		newDate.setDate(newDate.getDate() + numberOfDays);
		return newDate;
	}

	sumMonth(date, numberOfMonths) {
		var newDate = new Date(date);
		newDate.setMonth(date.getMonth() + numberOfMonths);
		return newDate;
	}

	isDateLessThan(date1, date2) {
		return date1.getTime() < date2.getTime();
    }
    
    isDateLessThanOrEqual(date1, date2) {
		return date1.getTime() <= date2.getTime();
    }
    
    isDateGreaterThan(date1, date2) {
		return date1.getTime() > date2.getTime();
    }
    
    isDateGreaterThanOrEqual(date1, date2) {
		return date1.getTime() >= date2.getTime();
    }
    
    isSameDay(date1, date2) {
        return this.zeroTime(date1).getTime() === this.zeroTime(date2).getTime();
    }

    isDateBetweenDates(date, dateInitial, dateFinal, inclusive = false) {
        if (inclusive) {
            return this.isDateGreaterThan(date, dateInitial) && this.isDateLessThan(date, dateFinal);
        } else {
            return this.isDateGreaterThanOrEqual(date, dateInitial) && this.isDateGreaterThanOrEqual(date, dateFinal);
        }
    }

    getNumberOfWeeksOfMonth(month, year) {
        // This code was found on internet, it seems to work fine
        const firstDayOfMonth = new Date(year, month - 1, 1);
        let day = firstDayOfMonth.getDay() || 6;
        
        if (day === 1) {
            day = 0;
        }

        if (day) { 
            day--;
        }

        let diff = 7 - day;
        const lastOfMonth = new Date(year, month, 0);
        const lastDate = lastOfMonth.getDate();
        if (lastOfMonth.getDay() === 1) {
            diff--;
        }
        return Math.ceil((lastDate - diff) / 7) + 1;
    }

    zeroTime(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
}