import React, { useState } from 'react';
import Modal from '../ui/modal';
import Input from '../ui/input';
import Button from '../ui/button';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/auth-context';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? 'Login' : 'Sign Up'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            required
          />
        )}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="text-saffron hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="text-saffron hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AuthModal;
