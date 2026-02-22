import { useNavigate } from 'react-router-dom';
import { OnboardingScreens } from '../Onboarding';

export function DemoOnboarding() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/demo/dashboard', { replace: true });
  };

  return <OnboardingScreens onComplete={handleComplete} />;
}
