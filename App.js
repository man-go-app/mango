import React, {Component} from 'react';
import {TextInput,
  ActivityIndicator,
  ScrollView,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Switch,
  StatusBar
} from 'react-native';
import {
  Text,
  FormLabel,
  FormInput,
  Header,
  List,
  ListItem,
  Icon,
  Button,
  Rating,
  Tile,
  Avatar,
  Card
} from 'react-native-elements';
import {
  Constants,
  Location,
  Permissions,
  MapView,
  ImagePicker,
  AnimatedRegion
} from 'expo';
import {
  TabNavigator,
  StackNavigator,
  NavigationActions
} from 'react-navigation';

import AuthenticationPrompt from './screens/AuthenticationPrompt';
import
  MyProfileScreen,
  {
    MyProfileEdit,
    NewServicePrompt
  } from './screens/MyProfileScreen';
import
  WorkersProfileScreen,
  {HirePrompt} from './screens/WorkersProfileScreen';
import {ListItemWorker} from './CustomComponents';
import TasksScreen, {TaskInfo} from './screens/TasksScreen';
import SlidingUpPanel from 'rn-sliding-up-panel';
import * as firebase from 'firebase';
require("firebase/firestore");

import SegmentedControlTab from 'react-native-segmented-control-tab';
import styles from './Stylesheet';

/* ====  MAIN CONTAINER (Navigator/AuthenticationPrompt)  ====*/
export default class App extends React.Component{
  state = {
    userSignedIn: null
  }
  componentWillMount(){
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body){
      if(body === ''){
        originalSend.call(this);
      }
      else{
        originalSend.call(this, body);
      }
    }

    const firebaseConfig = {
      apiKey: "AIzaSyDNExiDSrRUU6elOvGqoFNidW45TQlImuw",
      authDomain: "mango-185806.firebaseapp.com",
      databaseURL: "https://mango-185806.firebaseio.com",
      projectId: "mango-185806",
      storageBucket: "mango-185806.appspot.com",
      messagingSenderId: "570003452241"
    };
    firebase.initializeApp(firebaseConfig); 
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({userSignedIn: user})
      }
      else {
        this.setState({userSignedIn: null})
      }
    });
  }
  render(){
    if(this.state.userSignedIn == null){
      return <AuthenticationPrompt></AuthenticationPrompt>
    }
    else{
      return <ScreenNav></ScreenNav>
    }
  }
}


/*====   MAIN SCREEN (MAP) ====*/
class MangoDiscover extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    selectCategory: {
      id: 'CERCA',
      icon: 'location-on',
      collection: 'material'
    },
    shouldDrag: true,
    shouldAllowBackDrop: false,
    WorkersList: [],
    chevronIcon: 'expand-less'
  }

  /*getUserLocation(){
    let { status } = Permissions.askAsync(Permissions.LOCATION);
    Location.getCurrentPositionAsync({}).then((location)=>{
      var  newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        this.setState({location: newLocation});
    });

  }*/

  getWorkerLocation(location){
    firebase.firestore().collection('WORKERS').where('USER_UID', '==', firebase.auth().currentUser.uid).get().then((data)=>{
      Location.getCurrentPositionAsync({}).then((location)=>{
      var newLocation = location.coords;
      data.forEach((doc) => {
        if(doc.data().VISIBLE){
          newLocationWorker = new firebase.firestore.GeoPoint(newLocation.latitude, newLocation.longitude);
        }
        else{
          newLocationWorker = new firebase.firestore.GeoPoint(0,0)
        }
        firebase.firestore().collection('WORKERS').doc(doc.id).update({LOCATION: newLocationWorker});
      })
    })
  });
  }
  //Determine visibility
  /* getUserVisibility(){
    firebase.firestore().collection('USERS').where('UID', '==', firebase.auth().currentUser.uid).onSnapshot((data)=>{
      data.forEach((doc)=> {
        this.setState({isUserVisible: doc.data().VISIBLE})
      });
    });
  }*/


  //Open/CLose slideable panel
  _slideableClose(){
    this.setState({shouldDrag: true});
    this.setState({chevronIcon: 'expand-less'});
    this.setState({shouldAllowBackDrop: false});
    this._panel.transitionTo(166);
  }
  _slideableOpen(){
    this.setState({shouldDrag: false});
    this.setState({chevronIcon: 'expand-more'});
    this.setState({shouldAllowBackDrop: true});
    this._panel.transitionTo(1000);
  }

  //Form /Categories
  SelectCategory(SelectedCategory){
    this.setState({selectCategory:{
      id: SelectedCategory.ID,
      icon: SelectedCategory.data.ICON,
      collection: SelectedCategory.data.COLLECTION
    }}, ()=>{this.getCategoryWorkersList()});
  }

  //Given set category, display workers accordingly
  getCategoryWorkersList(){
    var CategoryWorkers;
    if(this.state.selectCategory.id == 'CERCA'){
      CategoryWorkers = firebase.firestore().collection('WORKERS').where('VISIBLE', '==', true);
    }
    else{
      CategoryWorkers = firebase.firestore().collection('WORKERS').where('VISIBLE', '==', true).where('CATEGORY', '==', this.state.selectCategory.id);
    }
    CategoryWorkers.onSnapshot((data) => {
      var CategoryWorkersList = [];
      data.forEach((doc) => {
        CategoryWorkersList.push({
          'ID': doc.id,
          'data': doc.data()
        })
      })
      this.setState({WorkersList: CategoryWorkersList});
    });
  }


  componentWillMount(){
    this.getCategoryWorkersList();
    //this.getUserLocation();
    this.getWorkerLocation();
  }

  render(){
    const { navigate } = this.props.navigation;
    const WindowHeight = Dimensions.get('window').height;
    const WorkersListRendered = this.state.WorkersList
    return (
      <View style={styles.container}>
        <MapView.Animated
          ref={map => this._map = map}
          style={styles.map}
          showsUserLocation
          loadingEnabled
         >
          {WorkersListRendered.map((l, i)=>{
            return (
              <MapView.Marker key={i} coordinate={{'latitude': l.data.LOCATION._lat, 'longitude': l.data.LOCATION._long}}>
                <MapView.Callout>
                  <ListItemWorker key={i} WorkerArray={l.data} onPress={()=>this.props.navigation.navigate('WorkerProfile', {worker: l.data, WorkerID: l.ID })}></ListItemWorker>
              </MapView.Callout>
            </MapView.Marker>
          )
          })}
        </MapView.Animated>
        <SlidingUpPanel
          draggableRange={{top: WindowHeight-70, bottom: 166}}
          showBackdrop={this.state.shouldAllowBackDrop}
          ref={c => this._panel = c}
          visible={true}
          allowDragging={this.state.shouldDrag}
          allowMomentum={false}
          onDragEnd={(distance) => {
            if(distance > (WindowHeight-70)/2){
              this._slideableOpen();
            }else{
              this._slideableClose();
            }
          }}
          onRequestClose={()=>this._slideableClose()}
        >
          <View style={styles.SlideUp}>
            <View style={styles.SlideUpHeader}
              onStartShouldSetResponder={()=>{return true}}
              onResponderGrant={()=>{ this.setState({shouldDrag: true}) }}
              onResponderMove={()=>{ this.setState({shouldDrag: true}) }}
              onResponderReject={()=>{ this.setState({shouldDrag: false}) }}
            >
              <Icon
                name='apps'
                containerStyle={styles.SlideUpButton}
                iconStyle={{lineHeight: 24}}
                onStartShouldSetResponder={()=>{return true}}
                onPress={()=> this.props.navigation.navigate('Categories', {SelectCategory: this.SelectCategory.bind(this)}) }  ></Icon>
              <View style={styles.SlideUpHeading}>
                <Icon name={this.state.selectCategory.icon}
                  type={this.state.selectCategory.collection}
                  containerStyle={styles.SlideUpHeadingIcon} iconStyle={{lineHeight: 32, height: 32}} size={32}/>
                <Text style={styles.SlideUpHeadingTitle} adjustsFontSizeToFit={true}>{ this.state.selectCategory.id }</Text>
              </View>
              <Icon name={this.state.chevronIcon} iconStyle={{lineHeight: 32, height: 32}} size={32} onPress={()=>{
                if(this.state.chevronIcon == 'expand-less'){
                  this._slideableOpen();
                }
                else{
                  this._slideableClose();
                }
              }}/>
            </View>
            <ScrollView
              scrollEnabled={true}
              onResponderGrant={()=>{this.setState({shouldDrag: false})}}
              onResponderMove={()=>{this.setState({shouldDrag: false})}}
              onMomentumScrollEnd={()=>{ this.setState({shouldDrag: false}) }}
              onScroll={(scroll)=>{
                if(scroll.nativeEvent.contentOffset.y < -2){
                  this.setState({shouldDrag: true});
                  //this._panel.transitionTo(166);
                }else{ this.setState({shouldDrag: false}) }
              }}
              >
              <List containerStyle={styles.WorkersList}>
                {WorkersListRendered.map((l, i) => (
                  <ListItemWorker key={i} WorkerArray={l.data} onPress={()=>this.props.navigation.navigate('WorkerProfile', {worker: l.data, WorkerID: l.ID })} ></ListItemWorker>
                ))}
              </List>
            </ScrollView>
          </View>
        </SlidingUpPanel>
      </View>
    )

  }
}

/*====    CATEGORIES PROMPT    ====*/
class MangoDiscoverCategories extends React.Component{
  state={
    PickCategory: [],
    AllCategories: [],
  }
  static navigationOptions = ({navigation}) => ({
    headerLeft: (<Icon name='close' onPress={()=>navigation.goBack()} containerStyle={{marginLeft: 16}}></Icon>),
    headerStyle: {position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomWidth: 0},
    gesturesEnabled: false
  });
  //Pick a category from the list and return
  SetCategory(name){
    if(name){
      this.props.navigation.state.params.SelectCategory(name);
      this.props.navigation.goBack();
    }else{
      this.props.navigation.goBack();
    }
  }

  //Get all categories with icons from database
  GetAllCategories(){
    var ResultsArray = [];
    firebase.firestore().collection("WORKERS_CATEGORIES").onSnapshot((data) => {
      let ResultsArray = [];
      data.forEach((doc) => {
        ResultsArray.push({
          "ID": doc.id,
          "data": doc.data()
        });
      });
      this.setState({AllCategories: ResultsArray});
    });
  }

  componentWillMount(){
    this.GetAllCategories();
  }
  render(){
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.CategoryCont}>
          <Text h3 style={styles.h3}>SELECCIONA UNA CATEGORIA</Text>
          <View style={styles.CategoryCircle}>
            <Icon
              name='location-on'
              size={40}
              color='#2f4f4f'
              iconStyle={{lineHeight: 80}}
              containerStyle={styles.CategoryCircle}
              underlay
              onPress={this.SetCategory.bind(this, {
                'ID': 'CERCA',
                'data': {
                  'ICON': 'location-on',
                  'COLLECTION': 'material'
                }
              })}
            />
          </View>
          {
            this.state.AllCategories.map((data, i) => (
              <View style={styles.CategoryCircle} key={i}>
                <Icon
                  name={data.data['ICON']}
                  type={data.data['COLLECTION']}
                  size={40}
                  color='#2f4f4f'
                  containerStyle={styles.CategoryCircle}
                  underlay
                  onPress={this.SetCategory.bind(this, data)}
                />
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}



/*==== Navigator containing all screens ====*/
/*const ScreenNav = StackNavigator(
  {
    Main: {
      screen: TabNavigator({
        Discover: {screen: MangoDiscover},
        Profile: {screen: MyProfileScreen}
      })
    }
    //Main: {screen: MainTabsRender},
    //Map: {screen: MangoDiscover},
    Categories: {screen: MangoDiscoverCategories},
    //Profile: {screen: MyProfileScreen},
    WorkerProfile: {screen: WorkersProfileScreen},
    MyProfileEdit: {screen: MyProfileEdit},
    NewServicePrompt: {screen: NewServicePrompt},
    HirePrompt: {screen: HirePrompt}
  },
);
*/

const ScreenNav = TabNavigator(
  {
    Profile: {
      screen: StackNavigator({
        Settings: {screen: MyProfileScreen},
        MyProfileEdit: {screen: MyProfileEdit, /*navigationOptions: ({navigation}) => ({tabBarVisible: false})*/ },
        NewServicePrompt: {screen: NewServicePrompt, /*navigationOptions: ({navigation}) => ({tabBarVisible: false})*/ },
        Categories: {screen: MangoDiscoverCategories, /*navigationOptions: ({navigation}) => ({tabBarVisible: false}) */}
      }),
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Perfil',
        tabBarIcon: ({tintColor}) => (<Icon name='person' color={tintColor}></Icon>)
      })
    },
    Discover: {
      screen: StackNavigator({
        Map: {screen: MangoDiscover},
        Categories: {screen: MangoDiscoverCategories, /*navigationOptions: ({navigation}) => ({tabBarVisible: false}) */},
        WorkerProfile: {screen: WorkersProfileScreen, navigationOptions: ({navigation}) => ({tabBarVisible: false}) },
        HirePrompt: {screen: HirePrompt, /*navigationOptions: ({navigation}) => ({tabBarVisible: false}) */}
      }),
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Explorar',
        tabBarIcon: ({tintColor}) => (<Icon name='map' color={tintColor}></Icon>)
      })
    },
    TasksScreen: {
      screen: StackNavigator({
        Tasks: {screen: TasksScreen},
        TaskInfo: {screen: TaskInfo}
      }),
      navigationOptions: ({navigation}) => ({
        tabBarLabel: 'Trabajos',
        tabBarIcon: ({tintColor}) => (<Icon name='chat' color={tintColor}></Icon>)
      })
    }
  }, {
    initialRouteName: 'Discover',
    tabBarPosition: 'bottom',
    animationEnabled: true,
  }
)

/*
const styles = StyleSheet.create(
{
  container:
  {
    margin: 0,
    flex:1,
    padding: 0,
    height: '100%'
  },
  h1: {
    fontSize: 64,
    margin: 16,
    fontWeight: 'bold'
  },
  h2:{
    fontSize: 32,
    fontWeight: '800'
  },
  h3: {
    fontSize: 40,
    padding: 24,
    fontWeight: '600',
    color: '#2f4f4f',
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  map: {
    height: '100%',
    width: '100%',
    //position: 'absolute'
  },
  SlideUp: {
    backgroundColor: 'white',
    height: '75%',
    padding: 16
  },
  SlideUpHeader: {
    height: 70,
    padding: 0,
  },
  SlideUpHeading: {
    height: 40,
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    marginTop: 8
  },
  SlideUpHeadingTitle:{
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 40
  },
  SlideUpHeadingIcon:{
    height: 40,
    width: 40,
    margin: 0,
  },
  CategoryButton: {
    margin: 0,
    padding: 0,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  WorkersList:{
    marginBottom: 70
  },
  CategoryCont:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#dedede',
    paddingTop: 70,
    paddingBottom: 70,
    alignContent: 'center'
  },
  CategoryCircle: {
    width: 100,
    height: 100,
    margin: 16,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  WorkerProfileListItem:{
    alignItems: 'center'
  },
  WorkerProfileName: {
    fontSize: 24,
    fontWeight: '600'
  },
  WorkerProfileDesc:{
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  WorkerProfileDescCat: {
    marginRight: 10,
    fontSize: 16,
    color: '#2f4f4f',
  },
  ProfileHeader: {
    padding: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ProfileHeaderPic: {
    margin: 8
  },
  ProfileHeaderInfo: {
    padding: 8,
    flexShrink: 1,
    flexDirection: 'column',
  },
  ProfileHeaderName: {
    fontSize: 32,
    fontWeight: '800'
  },
  ProfileHeaderDesc: {
    fontSize: 16
  },
  ProfileInfo:{
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ProfileInfoButton:{
    height: 32,
    padding: 4,
    margin: 0,
    marginRight: 0
  },
  ProfileSummary: {
    fontSize: 20,
    fontWeight: '600',
  },
  ProfileDescription:{
    fontSize: 16,
  },
  ServicesList: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  ServicesListTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  ProfileSection: {
    borderWidth: 0,
    padding: 16,
    borderRadius: 8
  },
  listButton: {
    margin: 4
  }

})*/
