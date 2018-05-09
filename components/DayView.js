import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import DateUtils from './../utils/Date';

import EventsList from './EventsList';

const dateUtils = new DateUtils();

export default class DayView extends Component {

  getContainerStyle() {
    const dayStyleContainer = [styles.container];

    if (this.props.isCurrentWeek) {
      dayStyleContainer.push(styles.currentWeek);
      if (this.props.date.getDay() === 0) {
        dayStyleContainer.push(styles.currentWeekStart);
        dayStyleContainer.push(styles.endDayBorder);
      } else if (this.props.date.getDay() === 6) {
        dayStyleContainer.push(styles.currentWeekEnd);
      } else {
        dayStyleContainer.push(styles.endDayBorder);
      }
    }

    return dayStyleContainer;
  }

  getDayBorderStyle() {
    const dayStyleContainer = [];
    if (!this.props.isCurrentWeek) {
      dayStyleContainer.push(styles.dayBorder);
      if (this.props.date.getDay() == 6) {
        dayStyleContainer.push(styles.endDayBorder);
      }
    }
    return dayStyleContainer;
  }

  renderDayHeader() {
    let weekendStyle = null;
    if (dateUtils.isWeekend(this.props.date)) {
      weekendStyle = styles.weekend;
    }

    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dayNumber, weekendStyle]}>
          {this.props.date.getDate()}
        </Text>
        {this.props.showDayName &&
          <Text style={[styles.dayName, weekendStyle]}>
            {dateUtils.getDayOfWeekShortName(this.props.date)}
          </Text>
        }
      </View>
    );
  }

  render() {
    let holidayStyle = null;
    if (this.props.holidays && this.props.holidays.length > 0) {
      holidayStyle = styles.holiday;
    }
    let otherMonth = null;
    if (this.props.month != this.props.date.getMonth()) {
      otherMonth = styles.anotherMonth;
    }
    return (
      <View style={[this.getContainerStyle(), this.getDayBorderStyle(), holidayStyle]}>
        <View style={otherMonth}>
          {this.renderDayHeader()}
          <EventsList events={this.props.events} holidays={this.props.holidays}/>
        </View>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 2,
  },
  dayContainer: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 5,
  },
  holiday: {
    backgroundColor: '#eee',
  },
  dayNumber: {
    fontSize: 13,
    textAlign: 'center',
    marginRight: 3,
    height: 15,
  },
  dayName: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    height: 15,
  },
  weekend: {
    color: 'red',
  },
  name: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  currentWeek: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    borderTopColor: 'red',
    borderTopWidth: 1,
  },
  currentWeekStart: {
    borderLeftColor: 'red',
    borderLeftWidth: 1,
  },
  currentWeekEnd: {
    borderRightColor: 'red',
    borderRightWidth: 1,
  },
  anotherMonth: {
     opacity: 0.15,
  },
  dayBorder: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  endDayBorder: {
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  }
});
