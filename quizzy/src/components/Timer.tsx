import {useContext, useEffect} from "react";
import {AppContext} from "../state/AppContext";
import {Actions} from "../state/actions";
import {StyleButton} from "./Button";

const Timer = ({deadlineInMSec = 450000}) => {

    const {dispatch, state: {secondsRemaining}} = useContext(AppContext);

    const time = `${Math.floor((secondsRemaining / 60) % 60)}:${Math.floor(secondsRemaining % 60)}`

    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch({type: Actions.TICK})
        }, 1000);

        return () => clearInterval(timerId)
    }, []);

    // useEffect(() => {
    //     if (secondsRemaining === 0) {
    //         dispatch({type: Actions.SET_QUIZ_FINISHED})
    //     }
    // }, [secondsRemaining]);

    return <StyleButton>{time}</StyleButton>

    // const [timer, setTimer] = useState('00:00')
    // const [timeElapsed, setTimeElapsed] = useState(0);
    //
    // const getTime = () => {
    //     const timeRemaining = deadlineInMSec - timeElapsed;
    //     const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    //     const seconds = Math.round((timeRemaining / 1000) % 60);
    //     setTimer(`${minutes}:${seconds}`);
    //     setTimeElapsed(t => t + 1000);
    // }
    //
    //
    // useEffect(() => {
    //     const timerId = setInterval(() => {
    //         getTime();
    //     }, 1000)
    //
    //     return () => {
    //         console.log("TIMERID:-", timerId);
    //         clearInterval(timerId)
    //     };
    // }, [getTime]);
    //
    // useEffect(() => {
    //     if(timeElapsed ===  deadlineInMSec) {
    //         dispatch({type: Actions.SET_QUIZ_FINISHED});
    //     }
    // }, [timeElapsed]);
    //
    // return <>
    //     <StyleButton>{timer}</StyleButton>
    // </>
}

export default Timer;

