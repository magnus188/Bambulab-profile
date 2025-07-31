"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';

export default function SignIn() {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect after sign in
    } catch (error) {
      alert('Google sign in failed');
    }
  };

  const handleAppleSignIn = async () => {
    const auth = getAuth(app);
    try {
      // Note: AppleAuthProvider might not be available in all firebase versions
      // For now, we'll show an alert instead
      alert('Apple sign-in not implemented yet');
    } catch (error) {
      alert('Apple sign in failed');
    }
  };

  const handleFacebookSignIn = async () => {
    const auth = getAuth(app);
    try {
      const { FacebookAuthProvider } = await import('firebase/auth');
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      alert('Facebook sign in failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center text-gray-500 hover:text-blue-600 transition"
          aria-label="Back to main"
        >
          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      </div>
      <div className="w-full max-w-md px-6">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Sign In</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center gap-3 border border-gray-300 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg shadow-sm transition"
            style={{ justifyContent: 'flex-start' }}
          >
            <span className="ml-2 mr-4">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <g>
                  <path d="M12 11.5v2.7h3.8c-.2 1.1-1.4 3.2-3.8 3.2-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.3 0 2.2.5 2.7.9l2-2C15.7 7.7 14 7 12 7c-3.3 0-6 2.7-6 6s2.7 6 6 6c3.4 0 5.7-2.4 5.7-5.7 0-.4 0-.7-.1-1H12z" fill="#4285F4" />
                  <path d="M12 19c2.4 0 4.4-1.6 5.1-3.7l-2.5-2c-.4.3-.9.5-1.6.5-1.2 0-2.2-.8-2.6-1.8l-2.5 2C7.6 17.4 9.6 19 12 19z" fill="#34A853" />
                  <path d="M7.4 13.5c-.2-.5-.4-1-.4-1.5s.2-1 .4-1.5l2.5 2c-.1.3-.1.7 0 1l-2.5 2z" fill="#FBBC05" />
                  <path d="M17.1 12.3c.1-.3.2-.7.2-1.3 0-.4-.1-.8-.2-1.3l-2.5 2c.1.3.1.7 0 1l2.5 2z" fill="#EA4335" />
                </g>
              </svg>
            </span>
            <span>Sign in with Google</span>
          </button>
          <button
            onClick={handleAppleSignIn}
            className="w-full flex items-center gap-3 border border-gray-900 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition"
            style={{ justifyContent: 'flex-start' }}
          >
            <span className="ml-2 mr-4"><FaApple size={24} color="white" /></span>
            <span>Sign in with Apple</span>
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="w-full flex items-center gap-3 border border-gray-300 bg-[#1877F3] hover:bg-[#1456b8] text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition"
            style={{ justifyContent: 'flex-start' }}
          >
            <span className="ml-2 mr-4"><FaFacebookF size={24} color="white" /></span>
            <span>Sign in with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
