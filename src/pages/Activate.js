import { ListItemSecondaryAction } from '@material-ui/core';
import React from 'react';
import { useParams,useHistory} from 'react-router-dom'
import requestInstance from '../requests';

export default function Activate() {

    const { uid, token } = useParams()
    const history = useHistory()

    const activateAccount = () => {
        requestInstance.post('auth/users/activation/',{
            uid:uid,
            token:token
        }).then(res=>{
            if(res && res.status === 204){
                history.push('/login')
            }else{
                alert('please try again later')
            }
        }).catch(e=>{
            alert('The link might be expired')
        })

    }

    return <>
        <div style={{textAlign:'center'}}>
            <button style={{ position: 'absolute',left:'45%', top:"40%",height:'10%', width:'10%' }} className='btn btn-primary' onClick={activateAccount}>Activate</button>
        </div>
    </>
}