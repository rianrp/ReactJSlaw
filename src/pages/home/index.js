import React, { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../contexts/authGoogle'
import { addDoc, collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../services/firebaseConfig';


export const Home = () => {
    const [users, setUsers] = useState([]);
    const [mensagem, setMensagem] = useState()
    const [name, setName] = useState();
    const { user, signOut } = useContext(AuthGoogleContext)
    const db = getFirestore(app);
    const userCollect = collection(db, "users")

    const HandleChange = (event) => {
        setMensagem(event.target.value)
        setName(user.displayName)
    }

    async function CreateMensage(){
        const usuario = await addDoc(userCollect, {
            mensagem,
            name
        });
        console.log(usuario)
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollect);
            let us = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            console.log(us)
            setUsers(us)
        }
        getUsers();
    }, []);

    return (
        <div>
            <button onClick={() => signOut()}>Sair</button>
            <h1>Bem vindo {user.displayName} Teste beta do FIREBASE em um dominio free</h1>
            <input type="text" placeholder='Mensagem...' value={mensagem} onChange={HandleChange} />
            <button onClick={CreateMensage}>Criar</button>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <h1>{user.mensagem}</h1>
                    </div>
                )
            })}
        </div>
    )

}