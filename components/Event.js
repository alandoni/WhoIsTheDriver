import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class EventsList extends Component { 
  
  render() {
    return (
        <View style={styles.container}>
            <View style={[styles.bullet, (this.props.color ? {color: this.props.color} : null)]}></View>
            <Text style={[styles.name]} numberOfLines={1}>{this.props.description}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
  },
  name: {
    fontSize: 10,
    width: '95%',
  },
  bullet: {
    borderRadius: 5,
    width: 3,
    height: 3,
    backgroundColor: 'red',
    marginTop: 4,
    marginRight: 2,
  }
});
