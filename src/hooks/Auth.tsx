import { ReactNode, createContext, useCallback, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

interface userData {
   name: string;
  email: string;
  type: "ADMIN" | "USER";
  id: number;
}

interface AuthState {
  accessToken: string;
  user: userData;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: userData | null;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const router = useRouter();
  // const [data, setData] = useState<AuthState>({ accessToken: '', user: {} });
  const [data, setData] = useState<AuthState>({ accessToken: '', user: { name: '', email: '', type: "USER", id: 0 } });


  useEffect(() => {
    const accessToken = localStorage.getItem('@softplan:token');
    const user = localStorage.getItem('@softplan:user');

    if (accessToken && user) {
      setData({ accessToken, user: JSON.parse(user) });
      router.push('/painel');
      console.log('passou aqui')
    }else{
      localStorage.removeItem('@softplan:token');
      localStorage.removeItem('@softplan:user');
  
      router.push('/');
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('login', {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem('@softplan:token', accessToken);
    localStorage.setItem('@softplan:user', JSON.stringify(user));

    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@softplan:token');
    localStorage.removeItem('@softplan:user');

    router.push('/');

    setData({ accessToken: '', user: {} as userData });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user || null,  token: data.accessToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
