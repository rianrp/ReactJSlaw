import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../contexts/authGoogle'

export const Login = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext)


    async function loginGoogle() {
        await signInGoogle();
    }
    
    if(!signed){
        return <button onClick={() => signInGoogle()}>Logar com google</button>
    }else{
        return <Navigate to="/home"></Navigate>
    }
}