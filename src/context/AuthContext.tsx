import React, { useState, createContext, ReactNode, useEffect } from "react";
//import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

type UserProps = {
    id: string;
    nome: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    usuario: string;
    senha: string;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        nome: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.nome; // se vazio retorna false

    useEffect(() => {
        async function getUser() {
            //obter dados do usuário 
            //const userInfo = await AsyncStorage.getItem('@seupedido'); 
            const userInfo = await AsyncStorage.getItem('@listai');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            if (Object.keys(hasUser).length > 0) {
                // api.defaults.headers.common.Authorization = `Bearer ${hasUser.token}`;
                setUser({
                    id: hasUser.id,
                    nome: hasUser.nome,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }
            setLoading(false);
        }

        getUser()
    }, [])

    async function signIn({ usuario, senha }: SignInProps) {
        setLoadingAuth(true);
        console.log(usuario, senha);

        try {
            const response = { //await api.post('/auth', {
                username: "usuario",
                password: "senha",
                id: "asdf-234-sdfg-sadfb-",
                nome: "teste",
                email: "teste@teste.com.br",
                token: "asdgasdgasdfasfbasfvsfvafvasfdasdgasdgasdgasdgasdg"
            }
            // console.log(response.data)
            console.log(response)

            const { id, nome, email, token } = response;

            setLoadingAuth(false);
            // const data = {
            //     ...response
            // };

            //await AsyncStorage.setItem('@seupedido', JSON.stringify(data))
            await AsyncStorage.setItem('@listai', JSON.stringify(response))

            // api.defaults.headers.common.Authorization = `Bearer ${token}`;

            setUser({
                id,
                nome,
                email,
                token
            })

        } catch (error) {
            console.log('erro ao acessar', error)
            setLoadingAuth(false)
        }
    }

    async function signOut() {
        await AsyncStorage.clear()
            .then(() => {
                setUser({
                    id: '',
                    nome: '',
                    email: '',
                    token: ''
                })
            })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            loadingAuth,
            loading,
            signOut
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}