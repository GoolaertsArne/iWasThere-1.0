import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList, ScrollView, TextInput, Keyboard } from 'react-native';
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
import { UserDAL } from "../database/UserDAL";
//import { SearchBar } from 'react-native-elements';

export default class UserList extends Component {
  db = new UserDAL();
  constructor(props) {
    super(props);
    this.state = {
      lastName: "",
      students: [],
      //search: '',
      // tableData: this.db.getAllUsers(["firstName", "lastName", "studentNr"]).then(data => console.log(data)),
    }
    this.renderItem = this.renderItem.bind(this)
    this.getStudents = this.getStudents.bind(this);
    this.searchStudent = this.searchStudent.bind(this);
    //this.onPressButton = this.onPressButton.bind(this);
  }

  async componentDidMount() {
    this.getStudents();
  }




  // updateSearch = (search) => {
  //   this.setState({ search });
  // };


  changeName(name) {
    // different from reactstrap
    this.setState({ lastName: name })
  }


  getStudents() {
    this.db.getAllUsers(["firstName", "lastName", "studentNr"])
      .then(response => {
        this.setState({ students: response._array })
        //console.log(this.state.students)
      }).catch(function (error) {
        console.log(error)
      })
  }


  printArrayInConsole() {
    console.log(this.state.students)
  }

  searchStudent(lastName) {
    this.db.searchStudent(lastName).then(res => {
      this.setState({ students: res._array })
      console.log(this.state.students)
    }).catch(function (error) {
      console.log(error)
    })
  }



  renderItem(item) {
    return (<TouchableOpacity
      onPress={() => { this.props.navigation.navigate('SignUser', { item }) }}>
      <View style={styles.item}>
        <Text style={styles.student}>{item.studentNr} - {item.firstName} - {item.lastName}€</Text>
      </View>
    </TouchableOpacity>)
  }

  // onPressButton() {
  //   const { navigate } = navigation;
  //   var options = {
  //     onPositive: () => this.props.navigate("AddUser")
  //   }
  // }

  render() {
    //const { search } = this.state;
    return (

      /* <SearchBar
        placeholder="Search student."
        onChangeText={this.updateSearch}
        value={search}
      /> */

      <View style={styles.container}>
        <Text style={styles.head}>Search Product</Text>
        <TextInput
          autoCapitalize='none'
          style={styles.row}
          placeholder='Enter product name'
          maxLength={20}
          onBlur={Keyboard.dismiss}
          value={this.state.lastName}
          onChangeText={(txt) => this.changeName(txt)}
        />
        <TouchableOpacity style={styles.btn}
          onPress={() => this.searchStudent(this.state.lastName)}
        >
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row' }}>
        <Text style={styles.head}>List Students</Text>  
        <TouchableOpacity style={styles.btn}
          onPress={() =>  navigation.navigate('AddUser')}
          //onPress={this.onPressButton}
        >
        <Text style={styles.btnText}>Add user</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.students}

            renderItem={(item) => this.renderItem(item.item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>


    )
  }

}











// renderItem(item) {
//   return (<TouchableOpacity
//             onPress={() => { this.props.navigation.navigate('SingUser', { name: item.firstName }) }}>
//             <View style={ styles.item }>
//               <Text style={ styles.student }>{ item.studentNr } - { item.firstName } - { item.lastName}</Text>
//             </View>
//           </TouchableOpacity>)
// }


// render() {
//   //keyExtractor = item => item.id;
//   return (
//     <View style={ styles.container }>
//       <Text style={ styles.header1 }>List Products</Text>
//       <View style={ styles.container }>
//         <FlatList
//           data={ this.state.students }
//           renderItem={({ studentNr, firstName, lastName }) =>
//             <View>
//                 <Text>{studentNr}</Text>
//                 <Text>{firstName}</Text>
//                 <Text>{lastName}</Text>
//             </View> }
//           // keyExtractor ={ this._keyExtractor }
//         />
//       </View>
//     </View>
//   )
// }
// }


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, fontSize: 30, marginBottom: 10, marginTop: 10 },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#D8E1DD' },
  btn: {
    elevation: 8,
    backgroundColor: "#DC143C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 80,
   
  },
  btnText: { textAlign: 'center', 
  color: '#f4f4f4',
  
  },
  item: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    marginVertical: 8
  },
  student: {
    fontSize: 20
  },
});