import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { mapping, light } from "@eva-design/eva";
import { UserList } from "./components/UserList";
import SignUser from "./components/SignUser";
import * as SQLite from "expo-sqlite";
import { UserDAL } from "./database/UserDAL";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Test from "./components/Test";
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

class App extends React.Component {

  constructor(props) {
    /*} this.addData = this.addDate.bind(this); */
    super(props);
    this.state = {
      users: undefined,
      location: undefined,
      lat: undefined,
      lng: undefined,
      result: undefined,
    };

  }
  async componentDidMount() {
    const db = new UserDAL();
    await db.getAllUsers(["firstName"]).then(data => {
      this.setState({ users: data._array });
      console.log(this.state.users[0]?.firstName)
    });
  }
  renderItem() {

    return (
      <Text>{this.state.users[0]?.firstName}</Text>
    );
  }

  watchID = null;

  // componentDidMount() {
  //   const urlBase =
  //     "http://nominatim.openstreetmap.org/reverse?format=json&lat=";
  //   const urlMiddle = "&lon=";
  //   const urlEnd = "&zoom=18&addressdetails=1";
  //   RNLocation.requestPermission({
  //     ios: 'always', // or 'always'
  //     android: {
  //       detail: 'coarse', // or 'fine'
  //       rationale: {
  //         title: "We need to access your location",
  //         message: "We use your location to show where you are on the map",
  //         buttonPositive: "OK",
  //         buttonNegative: "Cancel"
  //       }
  //     }
  //   }).then( granted => {
  //     if(granted) {
  //       RNLocation.configure({ distanceFilter: 0 });
  //       RNLocation.getLatestLocation({ timeout: 1000 }).then( (data) => {
  //         console.log("data")
  //         this.setState({
  //           lat: data.latitude,
  //           lng: data.longitude,
  //         });
  //         // fetch(
  //         //   urlBase + this.state.lat + urlMiddle + this.state.lng + urlEnd
  //         // ).then((loc) => {
  //         //   this.setState({
  //         //     location: JSON.stringify(loc),
  //         //   });
  //         // });
  //         console.log(this.state);
  //       });
  //     }
  //   });

  // }
  render() {
    return (
      /* <Text style={{ left: 50 }}>
          {this.state.location + " " + this.state.lat + " " + this.state.lng}
        </Text>
        <UserList /> */
      < NavigationContainer >
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 20
          }
        }}>
        <Tab.Screen
          name='Test'
          component={Test}
        />
      </Tab.Navigator>
     </NavigationContainer >
    )
  }
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  userContainer: {
    height: 100,
  },
});

export default App;

// async function openDatabase(pathToDatabaseFile) {
//   if (
//     !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
//       .exists
//   ) {
//     await FileSystem.makeDirectoryAsync(
//       FileSystem.documentDirectory + "SQLite"
//     );
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + "SQLite/myDatabaseName.db"
//   );
//   return SQLite.openDatabase("myDatabaseName.db");
// }
