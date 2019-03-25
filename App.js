/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import Database from './app/Database';

const instructions = 'Press the button to start DB insertions';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.startDBInsertions = this.startDBInsertions.bind(this);
  }

  startDBInsertions() {
    const { loading } = this.state;
    this.setState({
      loading: !loading
    });
    Database.init();
    this.insertData();
  }

  insertData() {
    const realmInstance = Database.getRealm();
    console.log('starting db insertions');

    try {

      for (let i = 1; i <= 5000; i++) {
        console.log(`Inserting Record: ${i}`);
        realmInstance.write(() => {
          realmInstance.create('Employee', {
            Badge: 'badge_' + i,
            EmployeeID: 'emp_' + i,
            FirstName: 'Emp ' + 1,
            LastName: 'Demo',
            IsSupervisor: false,
            SupervisorBadge: '',
            ReportsToEmpID: '',
            ShowLunchOut: true,
            ShowTransfer: true,
            HasEmail: false
          });
        });
        console.log(`Inserted Record: ${i}`);
      }

    } catch (error) {
      console.error(error);
    } finally {
      console.log('finishing db insertions');
      this.setState({
        loading: !this.state.loading
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : <View>
            <Text style={styles.welcome}>Welcome to Realm Demo!</Text>
            <Text style={styles.instructions}>To get started, {instructions}</Text>
            <Button onPress={this.startDBInsertions} title="Start" style={[styles.button]} />
          </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginTop: 20
  }
});
