import Link from "next/link";
import styles from "./Register.module.scss";

import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/pages/components/ui/input";
import Button from "@/pages/components/ui/button";
import authServices  from "@/services/auth";
import AuthLayout from "@/pages/components/layout/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      setError('Email is already registered. Please use another email.');
    }
  };

  return (
    <AuthLayout
    error={error}
    link="/auth/login"
    linkText="Already have an account? Sign in "
    title="Register"
  >
      <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Fulname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="number" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" className={styles.register__button}>
            {isLoading ? 'Loading...' : 'Register'}
          </Button>
     
        </form>
    </AuthLayout>
  );
};

export default RegisterView;
