import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Login() {

    const navigate = useNavigate()
    const [mount, setMount] = useState(false)
    const [errMsg, setErrMsg] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem("session")){
            navigate("/")
        }
        else{
            setMount(true)
        }

    },[sessionStorage.getItem("session")])

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")

    const {mutate: login, isPending} = useMutation({
        mutationFn: async () => {
            let data = await axios.post("http://localhost:3001/auth", {data: {
                username: username,
                password: pass
            }},{ withCredentials: true })
            return data.data
        },
        onSuccess: (data) => {
            sessionStorage.setItem("session", JSON.stringify(data))
            navigate(0)
        },
        onError: () => {
            setErrMsg(true)
        }
    })

    

  return (
    mount ? 

    <div>
        <h1 className='text-5xl font-extrabold text-white my-[50px]'>
            Login
        </h1>
        <div>
            <Input type='text' isInvalid={errMsg} errorMessage={"Invalide Information"} onChange={(e) => setUsername(e.target.value)} label="Username" className='my-5'/>
            <Input type='text' isInvalid={errMsg} errorMessage={"Invalide Information"} onChange={(e) => setPass(e.target.value)} label="Password" className='my-5'/>
            <Button color='primary' onClick={login} isDisabled={isPending}>
                Login
            </Button>
            
        </div>
    </div>
    :
    <div className='dark:text-white'>
        Loading ...
    </div>
  )
}
