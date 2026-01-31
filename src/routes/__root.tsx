import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundry';
import { NotFound } from '@/components/NotFound';
import { ThemeProvider } from '@/components/ThemeProvider';
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools';
import { SessionUser } from '@/lib/session';
import { GetCurrentUserFn } from '@/server/features/auth';
import appCss from '@/styles.css?url';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

interface MyRouterContext {
  queryClient: QueryClient;
  user: SessionUser | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const user = await GetCurrentUserFn();
    return {
      user,
    }
  },
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
            {children}
            <Toaster />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
