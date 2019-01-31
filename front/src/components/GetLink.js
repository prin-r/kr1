import React , { useEffect , useState } from 'react';
import { Redirect } from 'react-router-dom';
import { tryToAccess , isUrl } from '../utils/services';

const GetLink = ({ match }) => {

    const [url,setUrl] = useState(null);

    useEffect(async () => {
        if (!match || !match.params || !match.params.id) {
            setUrl("");
            return;
        }
        const redirUrl = await tryToAccess(match.params.id);
        if (isUrl(redirUrl)) {
            window.location.replace(redirUrl);
            return;
        }
        setUrl(redirUrl);
    }, []);

    return (
        <div>
            {url === null && <p>...redirecting</p>}
            {url !== null && <Redirect to='/' />}
        </div>
    );
};

export default GetLink;