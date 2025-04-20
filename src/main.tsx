import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!rootElement) {
  throw new Error("Root element not found. Make sure your HTML has a <div id='root'></div>");
}

const MissingClerkConfig = () => (
  <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto' }}>
    <h1 style={{ color: '#E11D48', marginBottom: '16px' }}>Missing Clerk Configuration</h1>
    <p style={{ marginBottom: '16px' }}>
      To use Campus Connector, you need to add your Clerk publishable key to the <code>.env</code> file.
    </p>
    <ol style={{ marginLeft: '20px' }}>
      <li>Sign up at <a href="https://clerk.com" style={{ color: '#2563EB' }}>https://clerk.com</a></li>
      <li>Create a new application</li>
      <li>Copy your publishable key</li>
      <li>Add it to <code>.env</code> as <code>VITE_CLERK_PUBLISHABLE_KEY</code></li>
    </ol>
  </div>
);

createRoot(rootElement).render(
  PUBLISHABLE_KEY ? (
    <StrictMode>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom"
          },
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            socialButtonsIconButton: "border border-gray-300 hover:border-gray-400"
          }
        }}
        navigate={(to) => window.location.href = to}
      >
        <App />
      </ClerkProvider>
    </StrictMode>
  ) : (
    <MissingClerkConfig />
  )
);
