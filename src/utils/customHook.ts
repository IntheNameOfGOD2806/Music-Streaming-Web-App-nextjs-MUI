import React from 'react'

export const useHasMounted=()=>{
    const [hasMounted, setHasMounted] = React.useState<boolean>(false);
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    return hasMounted
}     