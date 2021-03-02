import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { mapping, light } from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { UserList } from "./components/UserList";
import SignUser from "./components/SignUser";
import * as SQLite from "expo-sqlite";

class App extends React.Component {
  db = undefined;
  constructor(props) {
    super(props);
    this.state = {
      location: undefined,
      lat: undefined,
      lng: undefined,
      db: undefined,
      result: undefined,
    };
  }
  componentDidMount() {

    const db = SQLite.openDatabase("iWasThere", 1);
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select name from users;",
          [],
          (tx, res) => {
            `console.log(res.rows[0])`;
          },
          () => console.log("nothing happened")
        );
      },
      [],
      (success) => {
        console.log("success");
      },
      (error) => {
        console.log("error");
      }
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
      <ApplicationProvider mapping={mapping} theme={light}>
        {/* <Text style={{ left: 50 }}>
          {this.state.location + " " + this.state.lat + " " + this.state.lng}
        </Text>
        <UserList /> */}
      <SignUser />
        <View>
          <Text>test</Text>
        </View>
      </ApplicationProvider>
    );
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
