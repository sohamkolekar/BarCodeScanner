import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class Scan extends React.Component{
    constructor(){
        super();
        this.state={
            buttonState:'normal',
            hasCameraPermissions:null,
            scanned:false,
            scannedData:''
        }
    }
    getCameraPermissions=async(id)=>{
        const { status }= await Permissions.askAsync(Permissions.CAMERA)
       
        
        this.setState({
            hasCameraPermissions:status === "granted",
            scanned:false,
            buttonState:id
        })
    }
    handleBarCodeScan=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
        
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&hasCameraPermissions){
            return(
            <BarCodeScanner
            onBarCodeScanned={scanned? undefined:this.handleBarCodeScan}
            style={StyleSheet.absoluteFillObject}/>
            )

        }
        else if(buttonState==="normal"){         
                return(
                    <View style={styles.container}>
                       <Image
                        source={require('../assets/boi.jpg')}
                        style={{width:100,height:100,marginTop:100}} />
                        
                        <TouchableOpacity 
                        style={styles.ScanButton}
                        onPress={()=>this.getCameraPermissions("clicked")}
                        title="BarCodeScanner">
                            <Text>Scan</Text>     
                        </TouchableOpacity>

                        <Text>{this.state.scannedData}</Text>

                    </View>
                )        
    }   }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    ScanButton:{
        width:100,
        height:30,
        borderWidth:3,
        marginTop:100
    }
})

 