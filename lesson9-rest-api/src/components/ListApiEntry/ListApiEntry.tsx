import React, { FC, useEffect, useState } from 'react';
import './ListApiEntry.scss';
import Loadder from '../loadder/loadder';
import { json } from 'stream/consumers';

interface ListApiEntryProps { }

const ListApiEntry: FC<ListApiEntryProps> = () => {
  const [listApi, setListApi] = useState<any[]>([])
  const [isLoadding, setisLoadding] = useState<boolean>(false)
  //אחראית לכנס כאשר הקומפוננטה עולה
  useEffect(() => {
    setisLoadding(true)
    //api request take time
    fetch("https://api.publicapis.org/entries")
    // fetch("https://api.publicapis.org/entries", {
    //   method: 'POST',
    //convert js object to json text
    //   body: JSON.stringify({ id: 5 })
    // }).
    .then((res) => {
      //תלחץ אץת הגייסון לאובייקט של Js
      return res.json();
    }).then((resJson) => {
      //לאחר חילוץ הגייסון -הכנסת הנתונים למערך
      setListApi(resJson.entries);
      setisLoadding(false)
    })
  }, [])



  return <div className="ListApiEntry col-sm-6 m-auto">
    <table className="table">
      {/* list of header */}
      {isLoadding ? <Loadder title='טעינת נתונים'></Loadder> : ''}
      <thead>
        <tr>
          <th scope="col">Api</th>
          <th scope="col">Description</th>
          <th scope="col">Auth</th>
          <th scope="col">HTTPS</th>
          <th scope="col">Cors</th>
          <th scope="col">Link</th>
          <th scope="col">Category</th>
        </tr>
      </thead>


      {/* list of data */}
      <tbody>
        {listApi.map((api) => {
          return <tr>

            <td > {api.Api}</td>
            <td > {api.Description}</td>
            <td > {api.Autd}</td>
            <td > {api.HTTPS}</td>
            <td > {api.Cors}</td>
            <td > {api.Link}</td>
            <td > {api.Category}</td>
          </tr>
        })}


      </tbody>
    </table>
  </div>
}



export default ListApiEntry;
