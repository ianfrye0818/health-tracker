import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(root)/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(root)/dashboard/"!</div>
}
