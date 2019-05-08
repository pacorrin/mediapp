// import react
import React, {Component} from 'react'
import {StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

// peticiones
import axios from 'axios'

// import native base
import {Text ,Button, Content,Container, Label, Input,Form ,Item } from 'native-base';

// import params
import { mediappHost as host } from '../../app.json'

export default class Config extends Component {
    
    static navigationOptions = {
        title: 'Configuración',
    };

    constructor(props){
      super(props);
      this.state = {
        radioBusqueda: '0',
        showToast: false
      }
    }    

    componentWillUnmount(){
      this.props.navigation.state.params.onGoBack();
    }

    componentDidMount(){
      AsyncStorage.getItem('radio').then( val => {
        this.setState({
          radioBusqueda: val
        });
      })
    }

    saveConfig = () => {
      AsyncStorage.setItem('radio', this.state.radioBusqueda).then( res => {
        ToastAndroid.showWithGravityAndOffset(
          'Configuración actualizada',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          100,
        );
        this.props.navigation.goBack();
      }).catch( error => {
        ToastAndroid.showWithGravityAndOffset(
          'Error al actualizar',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          100,
        );
      });
    }
    
    render() {  
        return (
          <Container>
              <Content>
                <Form id="configForm" style={styles.input}>
                  <Item floatingLabel >
                    <Label>Radio de busqueda</Label>
                    <Input onChangeText={text => this.setState({ radioBusqueda: text })} value={this.state.radioBusqueda} />
                  </Item>
                </Form>
                <Button rounded block style={styles.button} onPress={() => this.saveConfig()}><Text>Guardar</Text></Button>
              </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    input: {
      paddingLeft: 20,
      paddingRight: 40,
    },
    button: {
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
    }
  });