import React, { FC, useRef, useState } from 'react';
import './ApiEnitiesList.scss';
import ApiEntiry from '../../models/ApiEntiry';

interface ApiEnitiesListProps { }

const ApiEnitiesList: FC<ApiEnitiesListProps> = () => {
  const searchRef=useRef<any>()
  const [apiList, setApiList] = useState<ApiEntiry[]>([
    new ApiEntiry("song", "list of song", "http://", 1),
    new ApiEntiry("food", "list of food", "http://", 2),
    new ApiEntiry("animal", "list of animals", "http://", 3)
  ]);
  const [apiFilter,setApiFilter]=useState<ApiEntiry[]>(apiList);

  const searchApi = () => {
   debugger
    let searchValue=searchRef.current.value;
    //מחזיר מערך מפולטר
    setApiFilter(apiList.filter((item)=>item.Api.includes(searchValue))) 
  }

  return <div dir='rtl' className="ApiEnitiesList">
    <div className='form-group '>
      <label>חפש...</label>
      <input ref={searchRef} onChange={searchApi} className='form-control'></input>
    </div>

    <ul>
      {
        apiFilter.map((item: ApiEntiry) => {
          return <li>{item.Api}</li>
        })
      }
    </ul>
  </div>
}

export default ApiEnitiesList;
