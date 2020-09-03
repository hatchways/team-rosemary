import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (
            url,
            method = 'GET',
            body = null,
            headers = {},
            jsonReturnData = true
        ) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                });

                let responseData;

                if (!jsonReturnData) {
                    responseData = await response;
                } else {
                    responseData = await response.json();
                }
                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) {

                   console.log(responseData.message);
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                setSuccess(true);
                // console.log(responseData);
                return responseData;
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                // console.log(err);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };
    const clearSuccess = () => {
        setSuccess(false);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach((abortCtrl) =>
                abortCtrl.abort()
            );
        };
    }, []);

    return { isLoading, error, success, sendRequest, clearError, clearSuccess };
};
