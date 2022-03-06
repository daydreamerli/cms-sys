import { PageHeader } from "antd";
import Link from "next/link";
import router, { useRouter } from "next/router";
import styled from "styled-components";
import storage from "../../lib/service/storage";

const HeaderContainer = styled.div`
  min-height: 160px;
  display: flex;
  background-color:#2b4c6b;
  justify-content: center;
  align-items: center;
`;

const SignIn = styled.li`
  @media screen and (min-width: 700px) {
    position: fixed;
    right: 6em;
    color:white;
  }
`;

export default function Header() {
  const router = useRouter();
  const isLogin = router.pathname.match(/login/i);
  
  return (
    <HeaderContainer>
      <PageHeader className="site-page-header" />
      <>
        <SignIn className={isLogin ? 'current' : ''}>
            {!!storage?.userInfo ? (
              <Link href={`/dashboard/${storage?.userInfo.role}`}>Dashboard</Link>
              ) : (
              <Link href="/login">Sign in</Link>
            )}
        </SignIn>
      </>
    </HeaderContainer>
  );
}
