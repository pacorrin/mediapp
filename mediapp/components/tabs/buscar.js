// import react
import React, {Component} from 'react'
import { StyleSheet} from 'react-native';

// params
import {mediappHost as host} from '../../app.json';

import axios from 'axios';


// import native base
import {Text ,Button, Container, Content, Label, Input,Form ,Item, ListItem, List, Picker } from 'native-base';


export default class Buscar extends Component {
    static navigationOptions = {
        title: 'Buscar medicamento'
    };

    constructor(props){
        super(props);

        this.state={
            nombreMedicamento: "",
            medicamentos: []
        }
    }

    buscarMedicamentos(medicamento){
      this.setState({
        nombreMedicamento:  medicamento
      });
      if(medicamento.length > 3)
        axios.get(`${host}/medicamentos/${medicamento}`).then( rt => {
            if(medicamento.length > 3)
              this.setState({
                medicamentos: rt.data
              })
            else
              this.setState({
                medicamentos: []
              })
        }).catch( error => {
          alert(error);
        });
      else
        this.setState({
          medicamentos: []
        });

    }   
    
    render() {
        return (
            <Container>
              <Content>
                <Form id="configForm" style={styles.form}>
                  <Item floatingLabel style={styles.input}>
                    <Label>Nombre del medicamento <Text style={styles.textRed}>*</Text></Label>
                    <Input onChangeText={medicamento => this.buscarMedicamentos(medicamento)} value={this.state.nombreMedicamento} />
                  </Item>
                  <List>
                      {
                         this.state.medicamentos.map(medicamento => {
                            return <ListItem key={medicamento} onPress={() => this.setState({nombreMedicamento: medicamento})}>
                                      <Text>{medicamento}</Text>
                                    </ListItem>  
                         })
                      }
                  </List>
                  <Item>
                    <Label>Farmacia</Label>
                  <Picker
                      note
                      mode="dropdown"
                      style={{ width: 120 }}
                      selectedValue={this.state.selected}
                      // onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Wallet" value="key0" />
                      <Picker.Item label="ATM Card" value="key1" />
                      <Picker.Item label="Debit Card" value="key2" />
                      <Picker.Item label="Credit Card" value="key3" />
                      <Picker.Item label="Net Banking" value="key4" />
                    </Picker>
                  </Item>
                </Form>
                <Button rounded block style={styles.button} onPress={() => this.buscarMedicamentos()}><Text>Buscar medicamentos</Text></Button>
              </Content>
          </Container>
        );
    }
}


const styles = StyleSheet.create({
    form: {
      paddingLeft: 20,
      paddingRight: 40,
    },
    input:{
      marginBottom: 15
    },
    button: {
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
    },
    textRed: {
      color: '#f00'
    },
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1
    }
  });