import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';

import MonthView from './MonthView';

import DateUtils from './../utils/Date';

const dateUtils = new DateUtils();

export default class App extends Component {

  constructor(props) {
    super(props);

    const today = dateUtils.zeroTime(new Date());

    this.state = {
      holidays: [{date: dateUtils.zeroTime(new Date(2018, 3, 21)), events: ['Tiradentes']}],
      events:   [{date: dateUtils.zeroTime(new Date()), events: ['Trabalho']},
                 {date: dateUtils.zeroTime(new Date(2018, 3, 21)), events: ['Trabalho']}],
      month: today.getMonth(),
      year: today.getFullYear(),
      selectedDate: today,
    };
  }

  componentDidMount() {
    //this.loadEvents();
  }

  loadEvents() {
    const events = [{date: dateUtils.zeroTime(new Date()), events: ['Oi', 'Tchau']}];
    this.setState({
      events
    });
  }

  nextMonth = () => {
    const nextDate = dateUtils.sumMonth(this.state.selectedDate, 1);
    this.setState({
      selectedDate: nextDate,
      month: nextDate.getMonth(),
      year: nextDate.getFullYear(),
    });
  }

  previousMonth = () => {
    const nextDate = dateUtils.sumMonth(this.state.selectedDate, -1);
    this.setState({
      selectedDate: nextDate,
      month: nextDate.getMonth(),
      year: nextDate.getFullYear(),
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.monthHeaderContainer}>
            <Button title='<' onPress={this.previousMonth}/>
            <Text style={styles.month}>{dateUtils.getMonthName(this.state.month)} de {this.state.year}</Text>
            <Button title='>' onPress={this.nextMonth}/>
          </View>
          <MonthView 
            month={this.state.month}
            year={this.state.year}
            holidays={this.state.holidays}
            events={this.state.events}
            fixedNnumberOfWeeks/>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    margin: 10,
    marginTop: 30,
  },
  monthHeaderContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignContent: 'center',
  },
  month: {
    marginTop: 12
  },
  monthView: {
    backgroundColor: 'black',
  }
});
