'use client';

import { useFormStatus } from 'react-dom';
import Button from '../Button';

interface Props {
  label: string;
}

const SubmitButton = ({ label }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>{label}</Button>
  );
};

export default SubmitButton;
