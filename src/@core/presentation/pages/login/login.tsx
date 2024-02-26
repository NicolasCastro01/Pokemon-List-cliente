'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { UserLoginCredentials } from "~/@core/domain";
import { UserCredentialsDTO } from "~/@core/infra";
import { makeRemoteSendUserCredentials } from "~/@core/main";
import { EmailIcon, InputLabelTag, LockIcon } from "../../common";

export default function Login() {
    const [credentials, setCredentials] = useState<UserLoginCredentials>({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const sendUserCredentials = useMemo(() => makeRemoteSendUserCredentials(), []);

    function handleState(key: string, value: string) {
        setCredentials((prevState) => ({ ...prevState, [key]: value }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const credentialsDTO = new UserCredentialsDTO(credentials);
            const response = await sendUserCredentials.exec(credentialsDTO);

            const userCredentials = {
                email: credentials.email,
                token: response
            }
            localStorage.setItem('auth-token', JSON.stringify(userCredentials));

            router.push('/home');
        } catch (error) {

        }

        setIsLoading(false);
    }

    return (
        <main id="login__page" aria-label="login__page" className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 id="login__title" aria-label="login__title"
                className="font-extrabold text-4xl"
            >Poke<span className="text-purple-950">Hub</span> | Login</h1>
            <form id="login__inputs__container" aria-label="login__form"
                className="flex flex-col justify-center items-center mt-10 gap-2"
                onSubmit={handleSubmit}
            >
                <InputLabelTag
                    id="login__input__email"
                    label="Email"
                    ariaLabel="login__label__email"
                    ariaInput="login__input__email"
                    value={credentials.email}
                    onInput={(event: ChangeEvent<HTMLInputElement>) => handleState('email', event.target.value)}
                    type="email"
                    required
                    icon={<EmailIcon fill="#fff" />}
                    dataTestId="login__input__email"
                />
                <InputLabelTag
                    id="login__input__password"
                    label="Password"
                    ariaLabel="login__label__password"
                    ariaInput="login__input__password"
                    value={credentials.password}
                    onInput={(event: ChangeEvent<HTMLInputElement>) => handleState('password', event.target.value)}
                    type="password"
                    required
                    icon={<LockIcon fill="#fff" />}
                    dataTestId="login__input__password"
                />
                <button id="login__button" aria-label="login__button" disabled={isLoading}
                    className="outline-none rounded-full w-full p-2 mt-4 bg-purple-950 enabled:hover:bg-opacity-[0.3] transition-colors"
                >signin</button>
            </form>
        </main>
    );
}