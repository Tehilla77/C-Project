import { useRef, useState } from "react"

export default function Login() {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const checkRef = useRef<HTMLInputElement>(null);
    const [userTypes, setUserTypes] = useState([{ id: 1, name: "עובד" }, { id: 2, name: "מנהל" }])
    const [error, serError] = useState<any>({});

    const loginUser = (event: React.SyntheticEvent) => {
        event.preventDefault();
        //checkValidation();
        let name = nameRef.current?.value;
        let password = passwordRef.current?.value;
        let checkbox = checkRef.current?.checked
        let falg=false;
        
        if(Object.keys(error).length==0){
            alert("נשלח לשרת")
        }
    }


    // const passwordValid = () => {
    //     let value = passwordRef.current?.value;
    //     if (!value || value.length < 2) {
    //         serError(true)
    //     }
    //     else {
    //         serError(false);
    //     }

    // }
    //פונקציה לבדיקת תקינות גלובלית
    //הפונקציה מופעלת ברגע שיוצאים מהאינפוט
    //מקבלת את האירוע ועי האירוע מזהה את שם אינפוט
    const checkValidation=(event:any)=>{
        let idElement=event.currentTarget.id;
        
        if(idElement=="email"){
            let value=event.currentTarget.value;
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){
                error.email="מייל שגוי"
                serError({...error})
            }
            else{
               delete error.email
                serError({...error})
            }
        }

        if(idElement=="Password"){
            let value=event.currentTarget.value;
            if(!value || value.length<2 || value==""){
                error.email="מייל שגוי"
                serError({...error})
            }
        }


        if(idElement=="check"){
            
        }
    }

    return <form className="col-sm-6"  onSubmit={loginUser}>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input onBlur={checkValidation} ref={nameRef} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
      
            {error.email?<div className="alert alert-danger" role="alert">
               {error.email}
            </div>:''}
        </div>
        <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input onBlur={checkValidation} ref={passwordRef} type="password" className="form-control" id="Password" placeholder="Password" />
            {error.Password ? <div className="alert alert-danger" role="alert">
                נא הכנס סיסמה תקינה מינמום שתי תווים
            </div> : ''}

        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">user type</label>
            <div className="input-group mb-3">
                <select className="form-select" aria-label="Default select example">
                <option selected>בחר סוג עובד</option>
                    {userTypes.map((user) => {
                        return <option value={user.id}>{user.name}</option>
                    })}
                </select>
            </div>

        </div>
        <div className="form-check">
            <input onChange={checkValidation} ref={checkRef} type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
}