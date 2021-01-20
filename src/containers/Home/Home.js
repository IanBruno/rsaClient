import { useEffect } from 'react';
import socket from '../../socket';

const Home = () => {

    useEffect(() => {
        const s = socket();
    }, [])

    return (
        <div>
            Home
        </div>
    );
}

export default Home;