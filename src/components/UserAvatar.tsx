import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UserAvatar({
  displayName,
  className,
  firstName,
  lastName,
}: {
  displayName?: string;
  className?: string;
  firstName?: string;
  lastName?: string;
}) {
  function getInitials() {
    if (displayName) return displayName[0].toUpperCase();
    if (firstName && lastName) return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    if (firstName) return firstName[0].toUpperCase();
    if (lastName) return lastName[0].toUpperCase();
    return '';
  }
  return (
    <Avatar>
      <AvatarFallback className={className}>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}