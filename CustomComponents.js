import React, {Component} from 'react';
import {TextInput, ActivityIndicator, ScrollView, FlatList, View, StyleSheet, Dimensions, Switch, KeyboardAvoidingView, Alert} from 'react-native';
import {Text, FormLabel, FormInput, Header, List, ListItem, Icon, Button, Rating, Tile, Avatar, Card} from 'react-native-elements';
import {Constants, Location, Permissions, MapView, ImagePicker} from 'expo';
import {TabNavigator, StackNavigator, NavigationActions} from 'react-navigation';
import * as firebase from 'firebase';
import styles from './Stylesheet';

export class ListItemWorker extends React.Component {
  renderSubtitle(){
    let l = this.props.WorkerArray;
    let listDescriptionText = this.props.listDescriptionText;
    if(this.props.listDescriptionText == undefined){
      return(
        <View style={styles.WorkerProfileDesc}>
          <Text style={styles.WorkerProfileDescCat}>{l.CATEGORY} </Text>
          <Icon name='star' size={16}></Icon>
          <Text style={styles.WorkerProfileDescCat}>3.5</Text>
        </View>
      )
    }else{
      return(
        <View style={styles.WorkerProfileDesc}>
          <Text style={styles.WorkerProfileDescCat}>{l.CATEGORY} </Text>
          <Icon name='star' size={16}></Icon>
          <Text style={styles.WorkerProfileDescCat}>3.5</Text>
          <Text style={styles.WorkerProfileDescCatFull}>{listDescriptionText}</Text>
        </View>
      )
    }
  }
  render(){
    let l = this.props.WorkerArray;
    let onPressFunction = this.props.onPress;
    let rightIcon = this.props.rightIcon;
    let hideChevron = this.props.hideChevron;
    let onPressRightIcon = this.props.onPressRightIcon;
    return(
      <ListItem
        roundAvatar
        title={l.NAME}
        titleStyle={styles.ServicesListTitle}
        wrapperStyle={styles.WorkerProfileListItem}
        containerStyle={styles.ListItemContainer}
        hideChevron={this.props.hideChevron}
        rightIcon={rightIcon}
        onPress={onPressFunction}
        onPressRightIcon={onPressRightIcon}
        subtitle={this.renderSubtitle()}
        rightTitle={this.props.rightTitle}
        rightTitleContainerStyle={{flex: 0, flexShrink: 1}}
        avatar={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
      />
    )
  }
}

export class TaskListWorkerUser extends React.Component{
  state={
    WorkerInfo: {}
  }
  WorkerData(){
    firebase.firestore().collection('WORKERS').doc(this.props.UserDocID).get().then((data)=>{
      //alert(JSON.stringify(data.data()));
      this.setState({WorkerInfo: data.data()});
    })
  }
  componentWillMount(){
    this.WorkerData();
    //alert(this.props.UserDocID);
  }
  render(){
    //this.WorkerData();
    return(<ListItemWorker WorkerArray={this.state.WorkerInfo} listDescriptionText={this.props.listDescriptionText} rightTitle={this.props.rightTitle} onPress={this.props.onPress}></ListItemWorker>)
  }
}
