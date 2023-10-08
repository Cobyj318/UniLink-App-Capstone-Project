import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import EventCard from './Components/EventCard';
import { firestore } from '../../../src/firebase_init/firebase';
import { FIREBASE_AUTH } from '../../../src/firebase_init/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { RefreshControl } from 'react-native';

const RSVPedEvents = () => {
  	const [rsvpedEvents, setRSVPedEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetchRSVPedEvents = async () => {
		try {
			setLoading(true);	
			const userRef = doc(firestore, 'User_data', FIREBASE_AUTH.currentUser?.uid);
			// Fetch current user data
			const userDoc = await getDoc(userRef);
			const userData = userDoc.data();
			// Check if RSVP array exists, if not, create an empty array
			const rsvpArray = userData.RSVP || [];
			setRSVPedEvents(rsvpArray);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error('Error fetching RSVPed events:', error);
		}
	  };
 	 useEffect(() => {
    	fetchRSVPedEvents();
  	}, []);


  return (
  <ScrollView 
  // Add a RefreshControl to enable pull-to-refresh functionality
  refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchRSVPedEvents} />}
>
  	<EventCard users={rsvpedEvents} />
  </ScrollView>
  )
};

export default RSVPedEvents;
