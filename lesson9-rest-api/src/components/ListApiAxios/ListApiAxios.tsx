import React, { FC, useState, useEffect } from 'react';
import './ListApiAxios.scss';
import axios from 'axios';
import Loadder from '../loadder/loadder';
import apiService from '../../services/api.service';
import { error } from 'console';
import User from '../../models/User';
import UserDetails from '../user-details/user-details'

interface ListApiAxiosProps { }

const ListApiAxios: FC<ListApiAxiosProps> = () => {
  const [listApi, setListApi] = useState<any[]>([])
  // const [listApiDisplay, setListApiDisplay] = useState<any[]>([])  
  const [user, setUser] = useState<any>()

  useEffect(() => {
    loadItems();
  }, [])

  const loadItems = () => {
    apiService.getClientListApi().then((res) => {
      setListApi(res.data)
      // setListApiDisplay(res.data)
    })
  }
  const getClientById = (e: any) => {
    if(e.target.value==''){
      return;
    }
    apiService.getClientById(e.target.value).then((res) => {
      setUser(res.data)
    })
  }
  // const deleteItem = async (id: number) => {
  //   apiService.deleteApi(id).then((res) => {
  //     listApi.splice(id, 1)
  //     setListApi([...listApi])
  //   }, error => {
  //     loadItems()
  //     setTimeout(() => {
  //     }, 1000)
  //   })
  // }
 
const addNewClient = (client: User) =>{
  apiService.inserNewClient(client).then((resp) => {
    apiService.getClientListApi().then((res) => {
      setListApi(res.data)
    })
  })
}
  return <div className='row'>
    <input type='text' onBlur={(e) => getClientById(e)} className="form-control m-1"></input><br></br>
    {user ? <div className='m-4'>
      <div className="card col-sm-4">
        <div className="card-body">
          <h5 className="card-title">{user.id}</h5>
          <p className="card-text">{user.name}</p>
          <p className="card-text">{user.hmo}</p>
        </div>
      </div>
    </div> :
      listApi.map((a) => {
        return <div className='m-4'>
          <div className="card col-sm-4">
            <div className="card-body">
              <h5 className="card-title">{a.id}</h5>
              <p className="card-text">{a.name}</p>
              <p className="card-text">{a.hmo}</p>
            </div>
          </div>
        </div>
      })}
        <UserDetails funcParentAdd={addNewClient}>משתמש חדש</UserDetails>
  </div>

}

export default ListApiAxios;
