'use client';

import { useFormStatus } from 'react-dom';

interface Props {
  label: string;
}

const SubmitButton = ({ label }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button className="btn" disabled={pending}>{label}</button>
  );
};

export default SubmitButton;
