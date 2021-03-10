import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { UserDAL } from "../database/UserDAL";

class AddUser extends React.Component {
  db = new UserDAL();
  constructor(props) {
    super(props);
    //this.db.insertStudents = this.db.insertStudents.bind(this);
    this.state = {
      firstName: "",
      lastName: "",
      studentNr: "",
    };
    //this.db.insertStudents = this.db.insertStudents.bind(this)
  }

  changeFirstName(firstName) {
    this.setState({ firstName: firstName });
  }

  changeLastName(lastName) {
    this.setState({ lastName: lastName });
  }

  changeStudentNr(studentNr) {
    this.setState({ studentNr: studentNr });
  }

  componentDidMount() {
    this.db = new UserDAL();
    //this.setState({date: , location: })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*{this.createSignaturePad()} */}
        <TextInput
          style={styles.textInput}
          placeholder="Student number"
          onChangeText={(text) => this.changeStudentNr(text)}
          value={this.state.studentNr}
        />
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          onChangeText={(text) => this.changeFirstName(text)}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last name"
          onChangeText={(text) => this.changeLastName(text)}
          value={this.state.lastName}
        />
        <TouchableOpacity
          style={styles.styledButton}
          onPress={() => this.save()}
        >
          <Text style={styles.styledButtonText}>Add</Text>
        </TouchableOpacity>
        {/* <Button title="save" onPress={this.save()}></Button>  */}
      </View>
    );
  }

  //redirect werkt niet
  save() {
    console.log(this.state);
    this.db.insertStudents(this.state).then((res) => {
      console.log(res);
      if (!res) alert("An error occured!");
      // navigate to list
      else {
        this.props.navigation.navigate("Test");
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    top: 25,
    alignItems: "stretch",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  styledButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },
  styledButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});
export default AddUser;
