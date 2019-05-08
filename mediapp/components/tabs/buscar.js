// import react
import React, {Component} from 'react'
import { StyleSheet} from 'react-native';


// import native base
import {Text ,Button, Container, Content, Label, Input,Form ,Item } from 'native-base';



export default class Buscar extends Component {
    static navigationOptions = {
        title: 'Buscar medicamento'
    };

    constructor(props){
        super(props);

        this.state={
            nombreMedicamento: ""
        }
    }

    buscarMedicamentos(){

    }
    
    render() {
        return (
            <Container>
              <Content>
                <Form id="configForm" style={styles.input}>
                  <Item floatingLabel >
                    <Label>Nombre del medicamento</Label>
                    <Input onChangeText={text => this.setState({ nombreMedicamento: text })} value={this.state.nombreMedicamento} />
                  </Item>
                </Form>
                <Button rounded block style={styles.button} onPress={() => this.buscarMedicamentos()}><Text>Buscar medicamentos</Text></Button>
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