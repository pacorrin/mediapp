// import react
import React, {Component} from 'react'
import { StyleSheet} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

// import native base
import {Text ,Button, FooterTab, Footer,Grid, Col,Container,Content, Icon, Drawer } from 'native-base';

// import maps
import MapView from 'react-native-maps';

// import  views
import SideBarMenu from '../sideMenu'

// import params
import { mediappHost as host } from '../../app.json'


export class LogoTitle extends React.Component{
    render(){
        return <Content><Text style={styles.headerContent}>Mediapp ❤</Text></Content>;
    }
}

export class MenuButton extends React.Component{

    closeControlPanel = () => {
        this.drawer._root.close()
    };
    openControlPanel = () => {
        this.drawer._root.open()
    };

    render(){
        return (
            <Content>
                <Drawer
                    ref={(ref) => this.drawer = ref}
                    content={<SideBarMenu navigator={this.navigator}/>}
                />
                <Button onPress={()=> this.openControlPanel()} style={{backgroundColor: '#003ea3',}}>
                    <Icon name="menu" style={styles.buttonMenu}/>
                </Button>
            </Content>
        );
    }
}

export default class Map extends React.Component {
    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerLeft:  <MenuButton />
    };

    constructor(props){
        super(props);

        this.state = {
            sucursalesMarks: null,
            sucursales: [],
            radio: null,
            radioM: 0,
            currentLat: 0,
            currentLong: 0,
            loaded: false
        }

    }


    componentWillMount(){
        
    }

    componentDidMount(){
        this.renderRadio();
    }   

    initMap(){

        
        navigator.geolocation.getCurrentPosition( (position) => {
            AsyncStorage.getItem('radio').then( val => {
                axios.get(`${host}/sucursales/${position.coords.latitude},${position.coords.longitude},${val}`).
                then( response => {

                    if(!this.state.loaded)
                        this.renderRadio();

                    this.setState({
                        currentLat: position.coords.latitude,
                        currentLong: position.coords.longitude,
                        sucursales: response.data,
                        loaded: true
                    });
                    
                    console.log(response.data)
                });
            });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 2000 })
    }

    renderMarks(){
        
       return this.state.sucursales.map( sucursal => {
            return <MapView.Marker 
                coordinate={{
                    latitude: parseFloat(sucursal.latitud),
                    longitude: parseFloat(sucursal.longitud)
                }}      
                title={sucursal.nombre}
                description={sucursal.direccion}
            />
        })
    }

    renderRadio(){
        this.initMap()
        AsyncStorage.getItem('radio').then( val => {
            this.setState({
                radioM: parseFloat(val), 
                radio:<MapView.Circle
                        key = { (this.state.currentLat).toString() }
                        center = {{latitude: this.state.currentLat, longitude: this.state.currentLong  }}
                        radius = { parseFloat(val) }
                        strokeWidth = { 1 }
                        strokeColor = { '#1a66ff' }
                        fillColor = { 'rgba(230,238,255,0.5)' }
                        // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                    />
            });
        });
        
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Col>
                        {
                            this.state.loaded ? <MapView
                                                    ref={map => this.map = map}
                                                    style={styles.map}
                                                    initialRegion={{
                                                        // latitude: 20.591745,
                                                        latitude: this.state.currentLat,
                                                        // longitude: -100.393747,
                                                        longitude: this.state.currentLong,
                                                        latitudeDelta: 0.04864195044303443,
                                                        longitudeDelta: 0.040142817690068,
                                                    }}>
                                                        {
                                                            this.renderMarks() 
                                                        }

                                                        {
                                                            this.state.loaded ? this.state.radio : null
                                                        }
                                                    </MapView>
                                                    :
                                                    null
                                                    }                               
                        
                    </Col>
                </Grid>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate("Buscar")}>
                            <Text>Buscar medicamento</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate("Config",{
                                onGoBack: () => this.renderRadio()})}>
                            <Text>Configuración</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    headerContent: {
        fontSize: 20,
        color: '#fff',
    },
    buttonMenu:{
        color: '#fff',
        marginLeft: 15
    },  
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    map:  {
      ...StyleSheet.absoluteFillObject
    },
  });