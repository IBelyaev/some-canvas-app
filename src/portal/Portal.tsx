import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    id: string;
    children: React.ReactNode;
}

const Portal = React.memo(({ id, children }: Props) => {
    const el = useRef(document.getElementById(id) || document.createElement('div'));
    const [isNewElement] = useState(!el.current.parentElement);
    
    useEffect(() => {
        if (isNewElement) {
            el.current.id = id;
            document.body.appendChild(el.current);
        }

        return () => {
            if (isNewElement && el.current.parentElement) {
                el.current.parentElement.removeChild(el.current);
            }
        }
    }, [id, isNewElement]);

    return createPortal(children, el.current);
});

export default Portal;
