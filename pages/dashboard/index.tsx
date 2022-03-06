import { useLoginState } from '../../components/custom-hooks/login-state';
import { StyledTitle } from '../login';

export default function Dashboard(): JSX.Element {
  useLoginState();

  return <StyledTitle>Welcome to CMS System</StyledTitle>;
}
