import DateUtils from './../../utils/Date';
const dateUtils = new DateUtils();

export default class User {

    constructor(name, priority, vacations) {
        this.name = name;
        this.priority = priority;
        this.vacations = vacations;
    }

    willWorkAtDate(date) {
        if (!this.vacations) {
            return true;
        }
        for (const vacancy of this.vacations) {
            if (dateUtils.isDateBetweenDates(date, vacancy.initialDate, vacancy.finalDate)) {
                return false;
            }
        }
        return true;
    }
}
