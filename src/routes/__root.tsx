import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { Header } from '@/components/Header';
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools';
import appCss from '@/styles.css?url';
import type { QueryClient } from '@tanstack/react-query';
import { SessionProvider } from '@/lib/SessionContext';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { authClient } from '@/lib/auth-client';
import { Footer } from '@/components/Footer';
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundry';
import { NotFound } from '@/components/NotFound';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Workout App - Track your fitness journey',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  errorComponent: (props) => {
    <RootDocument>
      <DefaultCatchBoundary {...props} />{' '}
    </RootDocument>;
  },
  notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = authClient.useSession();

  const session = sessionData ? { ...sessionData.session, user: sessionData.user } : null;
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
    >
      <head>
        <HeadContent />
      </head>
      <body className='min-h-screen'>
        <ThemeProvider>
          <SessionProvider>
            <Toaster />
            <Header
              isAuthenticated={!!session}
              image={session?.user.image ?? ''}
              name={session?.user.name ?? ''}
            />
            {children}
            <Footer />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
            <Scripts />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
