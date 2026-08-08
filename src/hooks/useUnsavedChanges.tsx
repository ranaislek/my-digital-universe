import { useEffect, useRef, useCallback } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * A hook to warn the user about unsaved changes before leaving a page.
 * It intercepts both React Router navigation and native browser navigation/tab closing.
 *
 * @param isDirty boolean indicating if the form has unsaved changes
 * @param message Alternative message to show
 * @returns Object containing the blocker state, proceed, cancel, and bypass functions
 */
export function useUnsavedChanges(isDirty: boolean, message = "You have unsaved changes. Are you sure you want to leave?") {
    const isDirtyRef = useRef(isDirty);
    const isBypassedRef = useRef(false);

    useEffect(() => {
        isDirtyRef.current = isDirty;
        if (!isDirty) {
            isBypassedRef.current = false;
        }
    }, [isDirty]);

    // 1. Block React Router Navigation (Client-Side Routing)
    const blocker = useBlocker(
        useCallback(({ currentLocation, nextLocation }) => {
            if (isBypassedRef.current) {
                return false;
            }
            return isDirtyRef.current && (currentLocation.pathname !== nextLocation.pathname || currentLocation.search !== nextLocation.search);
        }, [])
    );

    // 2. Block Native Browser Navigation (Reloads, Tab Closes)
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirtyRef.current && !isBypassedRef.current) {
                event.preventDefault();
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [message]);

    const bypass = useCallback(() => {
        isBypassedRef.current = true;
        if (blocker.state === 'blocked') {
            blocker.proceed();
        }
    }, [blocker]);

    return {
        showDialog: blocker.state === 'blocked' && !isBypassedRef.current,
        proceed: blocker.proceed,
        cancel: blocker.reset,
        bypass
    };
}
