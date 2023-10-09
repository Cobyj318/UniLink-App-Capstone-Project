import { ScrollView,StyleSheet } from "react-native";
import { useEffect,useState } from "react";
import NewsCard from "./Components/NewsCard";
import { firestore } from '../../../src/firebase_init/firebase';
import { collection, getDocs} from '@firebase/firestore';

const fetchNewsData = async () => {
    try {
      const eventsRef = collection(firestore, 'News_data');
      const querySnapshot = await getDocs(eventsRef);
      const newsData = [];
      querySnapshot.forEach((doc) => {
        const { Body, Title,From} = doc.data();
        newsData.push({
          id: doc.id,
          Title,
          From,
          Body,
        });
      });
      return newsData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
export default function LatechNewsScreen() {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState([]);
  
    const fetchNewsDatafordisplay = async () => {
      setLoading(true); // Set loading state to true when fetching data
      const newsData = await fetchNewsData();
      setNews(newsData);
      setLoading(false); // Set loading state to false when data fetching is complete
    };
    useEffect(() => {
      fetchNewsDatafordisplay();
    }, []);
  
    return (
        <ScrollView style={styles.scrollView}>
        {news?.map((id) => (
            <NewsCard key={id.id} news={id}/>
          ))}
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    scrollView: {
      backgroundColor: 'white',
    },
    text: {
      fontSize: 42,
    },
  });
  