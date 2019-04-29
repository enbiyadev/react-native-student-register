import React, { Component } from "react";
import { TextInput, Picker } from "react-native";
//
import { connect } from "react-redux";
//
import { Button, Card, CardSection, Spinner } from "../common/index";
//
import { studentsUpdate, studentsDelete } from "../actions";

class StudentsUpdate extends Component {
  state = { studentName: "", studentSurname: "", studentNumber: "", branch: "" };

  componentWillMount() {
    const { studentName, studentSurname, studentNumber, branch } = this.props.student;

    this.setState({ 
      studentName, 
      studentSurname, 
      studentNumber, 
      branch
    });
  }

  clickUpdate(){
    const { studentName, studentSurname, studentNumber, branch } = this.state;

    this.props.studentsUpdate({ 
      studentName, 
      studentSurname, 
      studentNumber, 
      branch,
      uid: this.props.student.uid
    });
  }

  clickDelete() {
    this.props.studentsDelete({ uid: this.props.student.uid })
  }

  renderButton() {
    if ( !this.props.loadingUpdate ){
      return <Button onPress={ this.clickUpdate.bind(this) }>GÜNCELLE</Button>
    }

    return <Spinner size="small" />;
  }

  renderDeleteButton() {
    if ( !this.props.loadingDelete ){
      return <Button onPress={ this.clickDelete.bind(this) }>SİL</Button>
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
            value={ this.state.studentName }
            onChangeText={ studentName => this.setState({ studentName }) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            placeholder="Soyisim"
            style={ inputStyle }
            value={ this.state.studentSurname }
            onChangeText={ studentSurname => this.setState({ studentSurname }) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            placeholder="Öğrenci Numarası"
            style={ inputStyle }
            value={ this.state.studentNumber }
            onChangeText={ studentNumber => this.setState({ studentNumber }) }
          />
        </CardSection>

        <CardSection>
          <Picker 
            style={{ flex: 1 }}
            selectedValue={ this.state.branch }
            onValueChange={ branch => this.setState({ branch }) }
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

        <CardSection>
          { this.renderDeleteButton() }
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

const mapToStateProps = ({ studentsUpdateResponse }) => {
  const { loadingUpdate, loadingDelete } = studentsUpdateResponse;

  return {
    loadingUpdate,
    loadingDelete
  };

}

export default connect(mapToStateProps, { studentsUpdate, studentsDelete })(StudentsUpdate);