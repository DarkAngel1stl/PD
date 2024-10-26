import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

interface User {
  auth_date: number;
  first_name: string;
  last_name?: string;
  id: number;
  photo_url?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
}

const BOT_TOKEN = '6554507125:AAESHydsKm7K9j3wTwMFBMUrrwD0tNznqCI';

const verifyUser = (data: any) => {
  const { hash, ...userData } = data;

  const dataCheckString = Object.keys(userData)
    .sort()
    .map((key) => `${key}=${userData[key]}`)
    .join('\n');

  const secretKey = CryptoJS.SHA256(BOT_TOKEN);

  const computedHash = CryptoJS.HmacSHA256(dataCheckString, secretKey).toString(
    CryptoJS.enc.Hex
  );

  if (computedHash === hash) {
    return true;
  }

  return false;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const data = Cookies.get('user');

    if (data) {
      if (verifyUser(JSON.parse(data))) {
        const { hash, ...user } = JSON.parse(data);

        setUser(user);
      }
    }

    setMounted(true);

    if (mounted) {
      setLoading(false);
    }
  }, [mounted]);

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
