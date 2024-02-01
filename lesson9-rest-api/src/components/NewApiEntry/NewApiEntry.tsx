import React, { FC, useState } from 'react';
import './NewApiEntry.scss';
import { useFormik } from 'formik';
import ApiEntiry from '../../models/ApiEntiry';
import * as Yup from 'yup'
interface NewApiEntryProps {
  funcParentAdd:(api: ApiEntiry)=>void
  children:React.ReactNode
}

const NewApiEntry: FC<NewApiEntryProps> = (props:NewApiEntryProps) => {

  const [listCategory,setListCategory]=useState([
    {id:1,value:"Animal"},
    {id:2,value:"Food"},
    {id:3,value:"Song"},
  ])
  //משתנה שמנהל את הטופס
  //מקבל שלוש מאפיינים
  const myForm=useFormik({
    //איזה מאפינים יש בטופס שצריכים למלא
    initialValues:new ApiEntiry("ערך דיפולטיבי","","",null),
    //שם של פונקציה כאשר ילחצו על לחצן הסבמיט
    onSubmit:(valueForm:ApiEntiry)=>{
      props.funcParentAdd(valueForm)
      //alert(JSON.stringify(valueForm))
      //הפונקציה תופעל כשאר לחצו על סבמיט
    },
    //מקבלת תבנית של בדיקת תקינות
    //אחראית לעדכן את אובייקט  myForm.errors
    validationSchema:Yup.object().shape({
      Link:Yup.string().required().url("הלינק שגוי"),
      Api:Yup.string().required(),
      Description:Yup.string().required(),
      Category:Yup.number().required()
    })
  })

  //לכל טופס יש מאפיין myForm.errors  
  //האובייקט מכיל את כל המאפיינים של הטופס שיש בהם בעיה

  //לכל טופס יש מאפיין myForm.values
  //המכיל את התוכן של כל מאפיין   


 return <div className="NewApiEntry">
  <form onSubmit={myForm.handleSubmit} className='col-sm-6 '>
  <h2 className='mt-5'>{props.children}</h2>

  <div className='form-group mt-3'>
        <label>api</label>
        <input name='Api' value={myForm.values.Api} onChange={myForm.handleChange} className={myForm.errors.Api?'form-control is-invalid':'form-control'}></input>
        {myForm.errors.Api?<small>{myForm.errors.Api}</small>:''}
    </div>
    <div className='form-group mt-3'>
        <label>api description</label>
        <input name='Description'  onChange={myForm.handleChange} className={myForm.errors.Description?'form-control is-invalid':'form-control'}></input>
        {myForm.errors.Description?<small>{myForm.errors.Description}</small>:''}
    </div>

    <div className='form-group mt-3'>
        <label>link</label>
        <input name='Link' onChange={myForm.handleChange}  className={myForm.errors.Link?'form-control is-invalid':'form-control'}></input>
        {myForm.errors.Link?<small>{myForm.errors.Link}</small>:''}
        
    </div>

    <div className='form-group mt-3'>
        <label>Category</label>
        <select name='Category' onChange={myForm.handleChange} className={myForm.errors.Category?'form-select is-invalid':'form-select'}>
          <option value="" selected disabled >selected category...</option>
        {listCategory.map((item)=>{
          return <option value={item.id}>{item.value}</option>
        })}
        </select>
    </div>

    <button type='submit' className='btn btn-warning mt-5'>Add new Api</button>
       
   </form>
  </div>
}

export default NewApiEntry;
