import React, { Component } from "react";
import { TextInput, Picker } from "react-native";
//
import { connect } from "react-redux";
//
import { Button, Card, CardSection, Spinner } from "../common/index";
//
import { studentsChange, studentsCreate } from "../actions";

class StudentsCreate extends Component {
  clickSave(){
    const { studentName, studentSurname, studentNumber, branch } = this.props;

    this.props.studentsCreate({ studentName, studentSurname, studentNumber, branch });
  }

  renderButton() {
    if ( !this.props.loading ){
      return <Button onPress={ this.clickSave.bind(this) }>KAYDET</Button>
    }

    return <Spinner size="small" />;
  }

  render() {
    const { inputStyle } = styles;

    return (
      <Card>
        <CardSection>
          <TextInput 
            placeholder="İsim"
            style={ inputStyle }
            value={ this.props.studentName }
            onChangeText={ studentName => this.props.studentsChange({ props: "studentName", value: studentName }) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            placeholder="Soyisim"
            style={ inputStyle }
            value={ this.props.studentSurname }
            onChangeText={ studentSurname => this.props.studentsChange({ props: "studentSurname", value: studentSurname }) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            placeholder="Öğrenci Numarası"
            style={ inputStyle }
            value={ this.props.studentNumber }
            onChangeText={ studentNumber => this.props.studentsChange({ props: "studentNumber", value: studentNumber }) }
          />
        </CardSection>

        <CardSection>
          <Picker 
            style={{ flex: 1 }}
            selectedValue={ this.props.branch }
            onValueChange={ branch => this.props.studentsChange({ props: "branch", value: branch }) }
          >
            <Picker.Item label="A Şubesi" value="a_branch" />
            <Picker.Item label="B Şubesi" value="b_branch" />
            <Picker.Item label="C Şubesi" value="c_branch" />
            <Picker.Item label="D Şubesi" value="d_branch" />
            <Picker.Item label="E Şubesi" value="e_branch" />
          </Picker>
        </CardSection>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  };
}

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
}

const mapToStateProps = ({ studentsListResponse }) => {
  const { studentName, studentSurname, studentNumber, branch, loading } = studentsListResponse;

  return {
    studentName,
    studentSurname,
    studentNumber,
    branch,
    loading
  };

}

export default connect(mapToStateProps, { studentsChange, studentsCreate })(StudentsCreate);