import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  
  const [jwtToken, setjwtToken] = useState(() =>
      localStorage.getItem('jwtToken')
      ? JSON.parse(localStorage.getItem('jwtToken'))
      : null
    );

  const navigate = useNavigate();

  const redirectUser = async (role) => {
    const url = "http://127.0.0.1:9000/user/get-user-object"
    try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
          }
        });
        if(response.data.role === "STUDENT"){
            if(role === response.data.role){
                return null;
            }
            navigate("/student")
        } 
        else if(response.data.role === "FACULTY"){
            if(role === response.data.role){
                return null;
            }
            navigate("/faculty")
        } 
        else if(response.data.role === "ADMIN"){
            if(role === response.data.role){
                return null;
            }
            navigate("/admin/student")
        }
      } catch (error) {
        logoutUser()
        navigate('/login')
      }
  }

  const loginUser = async (e, setLoading) => {
    e.preventDefault();
    try {
      setLoading(false);
      const response = await axios.post(
        'http://127.0.0.1:9000/auth/login',
        {
          email: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const data = response.data;
  
      if (response.status === 200) {
        setjwtToken(data.jwtToken);
        localStorage.setItem('jwtToken', JSON.stringify(data.jwtToken));
      }
    } catch (error) {
      swal("Error!", "Username or Password is Incorrect!", "error");
      e.target.username.value = "";
      e.target.password.value = "";
    } finally {
      setLoading(true);
    }
  };

   const logoutUser = async () => {
        setjwtToken(null);
        localStorage.removeItem('jwtToken');
        navigate('/login')
   }

  const contextData = {
    loginUser,
    jwtToken,
    setjwtToken,
    logoutUser,
    redirectUser
  };


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};