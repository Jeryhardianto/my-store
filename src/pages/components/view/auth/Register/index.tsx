import Link from "next/link";
import styles from "./register.module.scss";

import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

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

    const result = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={styles.register__form__item__input}
              name="email"
              id="email"
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              className={styles.register__form__item__input}
              name="fullname"
              id="fullname"
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className={styles.register__form__item__input}
              name="phone"
              id="phone"
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={styles.register__form__item__input}
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className={styles.register__form__button}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
