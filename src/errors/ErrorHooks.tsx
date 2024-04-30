import React, { useState } from "react";

const useThrowAsyncError = () => {
    const [state, setState] = useState();

    return (error: any) => {
        setState(() => { throw error })
    }
}


export { useThrowAsyncError };