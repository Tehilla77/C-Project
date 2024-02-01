import { useRef, useState } from "react"
import './GuestList.scss'

//קבלת ערכים מתוך רשימת אינפוטים דינאמיים
export default function GuestList() {

    //כשאר יש לי מערך של אינפוטים דינמאים או מטריצה
    //יוצרים מערך שמכיל את כל הערכים של אינפוטים
    const numberGuestRef = useRef<any>()
    const [guestArr, setGuestArr] = useState<any>([]);
    const [display, setDisplay] = useState<any>(false);

    const createGuest = () => {
        let count = numberGuestRef.current.value;
        let a = [];
        for (let index = 0; index < count; index++) {
            a.push("")
        }

        setGuestArr([...a]);

    }

    const setSingleGuest = (event: any, index: number) => {
        //קבלת הערך שהוזן בתוך האינפוט
        let name = event.currentTarget.value;
        guestArr[index] = name;

        setGuestArr([...guestArr]);
    }

    const sendGuestList = () => {
        setDisplay(true);
        guestArr.forEach((g: any) => {
            if (g == "") {
                setDisplay(false);
            }
        });

    }

    return <div dir="rtl" className="col-sm-6 ">
        <label>הכנס מספר מוזמנים</label>
        <input onBlur={createGuest} type="number" ref={numberGuestRef} className="form-control "></input>
        <hr ></hr>
        <h3>רשימת המוזמנים שלי</h3>
        {!display ? guestArr.map((g: string, index: number) => {
            return <div className="d-flex"><strong>{index + 1}</strong>
           {/* //מערך של המוזמנים שלי */}
            <input onBlur={(event) => setSingleGuest(event, index)} className="form-control m-1"></input><br></br></div>
        }) : ''}
        {guestArr.length ? <button onClick={sendGuestList} className="btn btn-scondary">send data to server</button> : ''}
        {display ? <ul>
            {guestArr.map((g: string) => <li>
                {g}
            </li>)}
        </ul> : ''}
    </div>

}