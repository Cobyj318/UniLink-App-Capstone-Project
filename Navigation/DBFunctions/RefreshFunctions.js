// refreshFunctions.js

import { fetchData } from "./FetchData";
const onRefresh = async (setRefreshing, setUsers) => {
  setRefreshing(true);
  try {
    const usersData = await fetchData(); // Call the fetchData function
    setUsers(usersData);
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }
};
export default onRefresh;
