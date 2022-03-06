import { useRouter } from 'next/router';

import DashLayout2 from '../../../components/layout/student-layout/Layout'

const redirectTo = '/dashboard/student';

const Index = () => {
  if (typeof window !== 'undefined') {
    const router = useRouter();
    router.push(redirectTo);
  }
  return <DashLayout2></DashLayout2>;
};

Index.getInitialProps = async ({ ctx }) => {
  if (ctx && ctx.req) {
    ctx.res.statusCode = 302;
    ctx.res.setHeader('Location', redirectTo);
  }
  return { props: '' };
};

export default Index;
