'use client';

import { useState } from 'react';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

import { InputFieldProps } from '../../types';

interface PasswordInputProps {
  props: InputFieldProps;
  field: ControllerRenderProps;
}

export function PasswordInput({ props, field }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder}
        {...field}
        value={field.value || ''}
        className="pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground absolute top-0 right-0 h-full px-3 py-2"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}
