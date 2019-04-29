import React, { Component } from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
//
import LoginForm from "./components/LoginForm";
import StudentsList from "./components/StudentsList";
import StudentsCreate from "./components/StudentsCreate";
import StudentsUpdate from "./components/StudentsUpdate";

const AppRouter = () => {
  return (
    <Router sceneStyle={{ marginTop: 50 }}>

      <Scene key="login">
        <Scene key="loginUser" component={ LoginForm } title="Giriş Ekranı" />
      </Scene>

      <Scene key="main">
        <Scene 
          onRight={() => Actions.studentsCreate()}
          rightTitle="Yeni"
          key="studentsList" 
          component={ StudentsList } 
          title="Öğrenci Listesi" 
        />
        <Scene 
          key="studentsCreate"
          component={ StudentsCreate }
          title="Öğrenci Kaydet"
        />
        <Scene 
          key="studentsUpdate"
          component={ StudentsUpdate }
          title="Öğrenci Güncelle"
        />
      </Scene>

    </Router>
  );
};

export default AppRouter;