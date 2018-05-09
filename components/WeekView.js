import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';

import DayView from './DayView';

import DateUtils from './../utils/Date';

const dateUtils = new DateUtils();

export default class WeekView extends Component { 
  
  isCurrentWeek() {
    return dateUtils.isDateInWeek(this.props.date, new Date());
  }

  getEventsForDay(date) {
    if (!this.props.events) {
      return [];
    }
    return this.props.events.filter((value, index, array) => {
      return value.date.getTime() == date.getTime();
    }).map((value, index, array) => {
      return value.events;
    });
  }

  getHolidaysForDay(date) {
    if (!this.props.holidays) {
      return [];
    }
    return this.props.holidays.filter((value, index, array) => {
      return value.date.getTime() == date.getTime();  
    }).map((value, index, array) => {
      return value.events;
    });
  }

  render() {
    const dayViews = [];
    const currentDate = this.props.date;
    const lastDate = dateUtils.sumDate(currentDate, 6);
    dateUtils.mapDates(currentDate, lastDate, (date) => {
      if (this.props.dayView) {
        dayViews.push(this.props.dayView);
      } else {
        dayViews.push(
          <DayView
            style={styles.dayView}
            date={date}
            month={this.props.month}
            isCurrentWeek={this.isCurrentWeek()}
            events={this.getEventsForDay(date)}
            holidays={this.getHolidaysForDay(date)}
            key={date.getDay()}
          />
        );
      }
    });

    return (
      <View style={[styles.weekContainer, ...[this.props.style]]}>
        {dayViews}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dayView: {
    width: '14.29%',
  },
});
