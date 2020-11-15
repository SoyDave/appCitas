import React, { useState } from 'react';
import { View, Button, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import firebase from '../database/firebase';

const AppointmentCreate = (props) => {

    const [state, setState] = useState({
        name: '',
        lastName: '',
        document: '',
        birthDate: '',
        city: '',
        district: '',
        phone: '',
        date: '',
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    
    const saveNewAppointment = async () => {

        let validateDocument = Number.parseInt(state.document);
        let validatePhone = Number.parseInt(state.phone);

        if (state.name === '') {
            alert('Name is necessary!')
        } else if (state.lastName === '') {
            alert('Lastname is necessary!')
        } else if (state.document === '') {
            alert('Document is necessary!')
        } else if (Number.isNaN(validateDocument) === true) {
            alert('Document must be a number!')
        } else if (state.birthDate === '') {
            alert('Bith Date is necessary!')
        } else if (state.city === '') {
            alert('City is necessary!')
        } else if (state.district === '') {
            alert('District is necessary!')
        } else if (state.phone === '') {
            alert('Phone is necessary!')
        } else if (Number.isNaN(validatePhone) === true) {
            alert('Phone must be a number!')
        } else if (state.phone.length != 10) {
            alert('phone must have 10 numbers!')
        } else if (state.date === '') {
            alert('Date is necessary!')
        } else {
            try {
                await firebase.db.collection('appointments').add({
                    name: state.name,
                    lastName: state.lastName,
                    document: state.document,
                    birthDate: state.birthDate,
                    city: state.city,
                    district: state.district,
                    phone: state.phone,
                    date: state.date
                })
                alert('Appointmen Crated!');
                props.navigation.navigate('AppointmentList');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <ScrollView>
            <View style={styles.containerOne}>
                <View>
                    <Image style={{ width: 260, height: 150 }} source={require('../assets/calendar.png')}></Image>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Name"
                        onChangeText={(value) => handleChangeText('name', value)}
                    />
                </View >
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Last Name"
                        onChangeText={(value) => handleChangeText('lastName', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Document"
                        onChangeText={(value) => handleChangeText('document', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Birth Date"
                        onChangeText={(value) => handleChangeText('birthDate', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="City"
                        onChangeText={(value) => handleChangeText('city', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="District"
                        onChangeText={(value) => handleChangeText('district', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Phone"
                        onChangeText={(value) => handleChangeText('phone', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Date"
                        onChangeText={(value) => handleChangeText('date', value)}
                    />
                </View>
                <View>
                    <Button color="#FFC107" title="Save Appointment" onPress={() => saveNewAppointment()} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerOne:
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 7,
        marginTop: 5,
    },
    inputGroup:
    {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FFC107'
    }
})

export default AppointmentCreate