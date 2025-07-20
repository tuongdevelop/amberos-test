import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email("The email or password is in-correct!"),
  password: z.string().min(1, "The email or password is in-correct!"),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await apiClient.post('/login', data);
      toast.success('Logged in successfully!');
      auth.login(response.data.token);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      setError("email", { type: "manual", message });
      setError("password", { type: "manual", message: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Domain Checker</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="text-sm font-medium text-gray-700">Email</label>
            <input id="login-email" type="email" {...register('email')}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`} />
          </div>
          <div>
            <label htmlFor="login-password" className="text-sm font-medium text-gray-700">Password</label>
            <input id="login-password" type="password" {...register('password')}
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`} />
             {errors.email && <p id="login-error" className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <button id="login-btn" type="submit" disabled={isSubmitting}
              className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register here.</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
