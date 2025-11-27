import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';

export default function SignOutPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.delete('/auth/signOut').then(() => {
      setUser(null);
      setAccessToken('');
      navigate('/signIn');
    });
  }, [setUser, navigate]);

  return <>Logging out...</>;
}
