import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface InlineAlertProps {
  variant?: 'default' | 'destructive' | 'success';
  title?: string;
  message: string;
}

export default function InlineAlert({ variant = 'default', title, message }: InlineAlertProps) {
  const Icon = variant === 'destructive' ? AlertCircle : variant === 'success' ? CheckCircle : Info;

  return (
    <Alert variant={variant === 'success' ? 'default' : variant} className="my-4">
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
