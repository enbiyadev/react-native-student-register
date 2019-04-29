import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Actions } from "react-native-router-flux";

//
import { CardSection } from "../common";

class ListItem extends Component {
  studentClick() {
    Actions.studentsUpdate({ student: this.props.student });
  }

  render() {
    const { studentName, studentSurname } = this.props.student;

    return (
      <TouchableWithoutFeedback onPress={ this.studentClick.bind(this) }>
        <View>
          <CardSection>
            <Text>
              { studentName } { studentSurname }
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ListItem;