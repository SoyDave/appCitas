import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Button, Image } from 'react-native';
import firebase from '../database/firebase';
import { ListItem} from 'react-native-elements';

const AppointmentList = (props) => {

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        firebase.db.collection('appointments').onSnapshot(querySnapshot => {
            const appointments = [];

            querySnapshot.docs.forEach(doc => {
                const { name, lastName, document, birthDate, city, district, phone, date } = doc.data();
                appointments.push({
                    id: doc.id,
                    name,
                    lastName,
                    document,
                    birthDate,
                    city,
                    district,
                    phone,
                    date
                })
            });
            setAppointments(appointments);
        });
    }, []);

    return (
        <View style={styles.containerOne}>
            <View style={styles.containerTwo}>
                <Button color="#FFC107" type="solid" title="Create Appointment"
                    onPress={() => props.navigation.navigate('AppointmentCreate')}
                />
            </View>
            <View>
                <ScrollView>
                    {
                        appointments.map(appointment => {
                            return (
                                <ListItem
                                    key={appointment.id} bottomDivider onPress={() => {
                                        props.navigation.navigate('AppointmentDetail', {
                                            appointmentId: appointment.id
                                        })
                                    }}>
                                    <Image style={{ width: 55, height:55 }} source={require('../assets/mention.png')}></Image>
                                    <ListItem.Content>
                                        <ListItem.Title>{appointment.name + " " + appointment.lastName}</ListItem.Title>
                                        <ListItem.Subtitle>{"Document " + appointment.document}</ListItem.Subtitle>
                                        <ListItem.Subtitle>{"Appointment " + appointment.date}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    containerOne:
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 40,
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 40,
    },
    containerTwo:
    {
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 15,

    },
});

export default AppointmentList;