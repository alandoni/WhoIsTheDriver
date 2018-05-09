import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';

import WeekView from './WeekView';

import DateUtils from './../utils/Date';
const dateUtils = new DateUtils();

import ArrayUtils from './../utils/Array';
const arrayUtils = new ArrayUtils();

export default class MonthView extends Component {

  constructor(props) {
    super(props);
  }

  getNumberOfWeeks() {
    return dateUtils.getNumberOfWeeksOfMonth(this.props.month, this.props.year);
  }

  getDateForWeek(index) {
    const sum = index * 7;
    const firstDateOfMonth = dateUtils.getFirstDateOfMonthShown(this.props.month, this.props.year);
    return dateUtils.sumDate(firstDateOfMonth, sum);
  }

  mapDatesForWeek(index, method) {
    const firstDateOfWeek = this.getDateForWeek(index);
    const lastDateOfWeek = dateUtils.sumDate(firstDateOfWeek, 7);
    
    dateUtils.mapDates(firstDateOfWeek, lastDateOfWeek, (date) => {
      method(date);
    });
  }

  getEventsForWeek(index) {
    let events = [];
    this.mapDatesForWeek(index, (date) => {
      const eventsOfDate = this.props.events.filter((value, index, array) => {
        return value.date.getTime() == date.getTime();
      });
      events = arrayUtils.concat(events, eventsOfDate);
    });
    return events;
  }

  getHolidaysForWeek(index) {
    let holidays = [];
    this.mapDatesForWeek(index, (date) => {
      const holidaysOfDate = this.props.holidays.filter((value, index, array) => {
        return value.date.getTime() == date.getTime();
      });
      holidays = arrayUtils.concat(holidays, holidaysOfDate);
    });

    return holidays;
  }

  renderDayNameViews() {
    const dayNames = []
    for (const i = 0; i < 7; i++) {
      const style = [styles.dayNameContainer];
      if (i == 6) {
        style.push(styles.endDayBorder);
      }
      dayNames.push(
        <View style={style} key={i}>
          <Text style={styles.dayName}>
            {dateUtils.shortDayName(i)}
          </Text> 
        </View>
      )
    }

    return (
      <View style={styles.dayNamesContainer}>
        {dayNames}
      </View>
    );
  }

  render() {
    const weekViews = [];
    let weekNumber = 6
    if (!this.props.fixedNnumberOfWeeks) {
      weekNumber = this.getNumberOfWeeks();
    }
    for (const i = 0; i < weekNumber; i++) {
      weekViews.push(
        <WeekView
          dayView={this.props.children}
          holidays={this.getHolidaysForWeek(i)}
          events={this.getEventsForWeek(i)}
          month={this.props.month}
          date={this.getDateForWeek(i)}
          key={i}
        />
      );
    }

    return (
      <View style={[styles.container, ...[this.props.style]]}>
        {this.renderDayNameViews()}
        <View style={styles.weekContainer}>
          {weekViews}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  weekContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  dayNamesContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  dayNameContainer: {
    width: '14.29%',
    borderColor: '#ccc',
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  dayName: {
    textAlign: 'center',
  },
  endDayBorder: {
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
});
