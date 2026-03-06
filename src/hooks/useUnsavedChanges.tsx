import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * A hook to warn the user about unsaved changes before leaving a page.
 * It intercepts both React Router navigation and native browser navigation/tab closing.
 *
 * @param isDirty boolean indicating if the form has unsaved changes
 * @param message Alternative message to show (note: modern browsers ignore custom messages for window.onbeforeunload)
 * @returns Object containing the blocker state and functions to proceed or cancel
 */
export function useUnsavedChanges(isDirty: boolean, message = "You have unsaved changes. Are you sure you want to leave?") {

    // 1. Block React Router Navigation (Client-Side Routing)
    // useBlocker intercepts navigation events within the SPA.
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );

    // 2. Block Native Browser Navigation (Reloads, Tab Closes)
    // The browser automatically handles showing the native generic prompt if event.returnValue is set.
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault(); // Standard
                event.returnValue = message; // Chrome/Firefox/Safari requirement
                return message;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, message]);

    return {
        showDialog: blocker.state === 'blocked',
        proceed: blocker.proceed,
        cancel: blocker.reset
    };
}
