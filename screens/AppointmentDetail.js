import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput, Image, Button, Alert, ActivityIndicator, ScrollView } from 'react-native'
import firebase from '../database/firebase'

const AppointmentDetail = (props) => {
    const initialState = {
        id: '',
        name: '',
        lastName: '',
        document: '',
        birthDate: '',
        city: '',
        district: '',
        phone: '',
        date: '',
    }
    const [appointment, setAppointment] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const getAppointmentById = async (id) => {
        const dbRef = firebase.db.collection('appointments').doc(id);
        const doc = await dbRef.get();
        const appointment = doc.data();
        setAppointment({
            ...appointment,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getAppointmentById(props.route.params.appointmentId);
    }, []);

    const handleChangeText = (name, value) => {
        setAppointment({ ...appointment, [name]: value });
    };

    const deleteAppointment = async () => {
        const dbRef = firebase.db.collection('appointments').doc(props.route.params.appointmentId);
        await dbRef.delete();
        props.navigation.navigate('AppointmentList')
    };

    const updateAppointment = async () => {
        const dbRef = firebase.db.collection('appointments').doc(appointment.id);

        let validateDocument = Number.parseInt(appointment.document);
        let validatePhone = Number.parseInt(appointment.phone);

        if (appointment.name === '') {
            alert('Name is necessary!')
        } else if (appointment.lastName === '') {
            alert('Lastname is necessary!')
        } else if (appointment.document === '') {
            alert('Document is necessary!')
        } else if (Number.isNaN(validateDocument) === true) {
            alert('Document must be a number!')
        } else if (appointment.birthDate === '') {
            alert('Bith Date is necessary!')
        } else if (appointment.city === '') {
            alert('City is necessary!')
        } else if (appointment.district === '') {
            alert('District is necessary!')
        } else if (appointment.phone === '') {
            alert('Phone is necessary!')
        } else if (Number.isNaN(validatePhone) === true) {
            alert('Phone must be a number!')
        } else if (appointment.phone.length != 10) {
            alert('phone must have 10 numbers!')
        } else if (appointment.date === '') {
            alert('Date is necessary!')
        } else {
            try {
                await dbRef.set({
                    name: appointment.name,
                    lastName: appointment.lastName,
                    document: appointment.document,
                    birthDate: appointment.birthDate,
                    city: appointment.city,
                    district: appointment.district,
                    phone: appointment.phone,
                    date: appointment.date
                })
                alert('Appointmen Update!');
                setAppointment(initialState)
                props.navigation.navigate('AppointmentList')
            } catch (error) {
                console.log(error);
            }
        }
    };

    const alertDeleteConfirmation = () => {
        Alert.alert('Removed?', 'Sure?', [
            { text: 'Yes', onPress: () => deleteAppointment() },
            { text: 'No', onPress: () => console.log(false) },
        ])
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="gray" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.containerOne}>
                <View>
                    <Image style={{ width: 260, height: 160 }} source={require('../assets/dataRegistration.png')}></Image>
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Name"
                        value={appointment.name}
                        onChangeText={(value) => handleChangeText('name', value)}
                    />
                </View >
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Last Name"
                        value={appointment.lastName}
                        onChangeText={(value) => handleChangeText('lastName', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Document"
                        value={appointment.document}
                        onChangeText={(value) => handleChangeText('document', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Birth Date"
                        value={appointment.birthDate}
                        onChangeText={(value) => handleChangeText('birthDate', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="City"
                        value={appointment.city}
                        onChangeText={(value) => handleChangeText('city', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="District"
                        value={appointment.district}
                        onChangeText={(value) => handleChangeText('district', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Phone"
                        value={appointment.phone}
                        onChangeText={(value) => handleChangeText('phone', value)}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Date"
                        value={appointment.date}
                        onChangeText={(value) => handleChangeText('date', value)}
                    />
                </View>
                <View style={styles.containerButton}>
                    <View>
                        <Button color="#FFC107" title="Update Appointment" onPress={() => updateAppointment()} />
                    </View>
                    <View>
                        <Button color="#FFA000" title="Delete Appointment" onPress={() => alertDeleteConfirmation()} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerOne:
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 7,
        marginTop: 3,
    },
    inputGroup:
    {
        flex: 1,
        padding: 0,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFC107'
    },
    containerButton:
    {
        marginTop: 5,
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

export default AppointmentDetail