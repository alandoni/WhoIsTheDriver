import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Event from './Event';
import ArrayUtils from './../utils/Array';

const arrayUtils = new ArrayUtils();

export default class EventsList extends Component { 
  
  constructor(props) {
    super(props);
    const events = arrayUtils.concat(this.props.events, this.props.holidays);
    this.state = {events};
  }

  render() {
    return (
        <View style={styles.container}>
            {this.state.events && this.state.events.map((value, index, array) => {
                return (
                  <Event description={value} key={index}/>
                )
            })}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  name: {
    fontSize: 10,
  },
  bullet: {
    borderRadius: 5,
    width: 3,
    height: 3,
  }
});
