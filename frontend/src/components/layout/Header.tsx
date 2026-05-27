import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/auth';
import Logo from '../../assets/logo.svg';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

export default function Header() {
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Transações', path: '/transactions' },
    { name: 'Categorias', path: '/categories' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className=" bg-white border border-gray-200">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto py-4 px-12">
        <img src={Logo} alt="Financy Logo" className="h-6" />
        <nav>
          <ul className="flex gap-5">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant="link"
                    size="sm"
                    className={pathname !== item.path ? 'text-gray-600' : ''}
                  >
                    {item.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-gray-300">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
}
