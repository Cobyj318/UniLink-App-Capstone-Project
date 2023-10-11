import React from "react";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);   
    React.useEffect(() => {
     async function loadResourcesAndDataAsync() {
        setLoadingComplete(true);
     }
     loadResourcesAndDataAsync();
    }, []);
   
    return isLoadingComplete;
   }