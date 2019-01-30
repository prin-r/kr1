import React , { useState } from 'react';
import { handleHex } from '../utils/services';

const InputBox = ({ val, click, change, type, buttonText }) => {

    const [ok,setOk] = useState(false);

    return (
        <div>
            {type != 0 && !ok && <input type="text" value={val} onChange={({target}) => change(target.value)}/>}
            {(type < 2 || ok) && <p>{val}</p>}
            {type < 2 && <button onClick={() => click()}>{buttonText}</button>}
            {type === 2 && <button onClick={() => setOk(!ok)}>{ok? "Edit":"OK"}</button>}
        </div>
    );
};

export default InputBox;