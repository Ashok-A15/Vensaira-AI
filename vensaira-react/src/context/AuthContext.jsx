import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock checking if user is already logged in (e.g. from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('vensaira_elearning_user');
    const storedCourses = localStorage.getItem('vensaira_elearning_courses');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedCourses) {
      setEnrolledCourses(JSON.parse(storedCourses));
    }
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    if (email && password) {
      const mockUser = {
        id: 'usr_123',
        firstName: email.split('@')[0],
        email: email
      };
      setUser(mockUser);
      localStorage.setItem('vensaira_elearning_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = async (details) => {
    // Mock signup logic
    const { firstName, email } = details;
    const mockUser = {
      id: 'usr_' + Date.now(),
      firstName: firstName || email.split('@')[0],
      email: email
    };
    setUser(mockUser);
    localStorage.setItem('vensaira_elearning_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
    localStorage.removeItem('vensaira_elearning_user');
    localStorage.removeItem('vensaira_elearning_courses');
  };

  const enroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      const newCourses = [...enrolledCourses, courseId];
      setEnrolledCourses(newCourses);
      localStorage.setItem('vensaira_elearning_courses', JSON.stringify(newCourses));
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, enroll, isEnrolled, enrolledCourses }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
