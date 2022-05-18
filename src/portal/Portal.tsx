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
        const currentEl = el.current;

        if (isNewElement) {
            currentEl.id = id;
            document.body.appendChild(currentEl);
        }

        return () => {
            if (isNewElement && currentEl.parentElement) {
                currentEl.parentElement.removeChild(currentEl);
            }
        }
    }, [id, isNewElement]);

    return createPortal(children, el.current);
});

export default Portal;
