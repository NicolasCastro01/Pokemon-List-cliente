import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserCredentialsContext as UserCredentialsContextType, UserLoginCredentials } from "~/@core/domain";
import { UserCredentialsContext } from "~/@core/infra";
import { makeRemoteSendUserCredentials } from "~/@core/main";
import Login from "./login";

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMock
    })
}));
jest.mock("~/@core/main", () => ({
    makeRemoteSendUserCredentials: jest.fn(() => ({
        exec: jest.fn().mockResolvedValue('3123123') // Mock da função exec para retornar uma Promise resolvida
    }))
}));

const defaultContextState = {
    contextState: {
        email: 'teste@verum.com',
        token: '3123123'
    },
    setContextState: jest.fn()
} as UserCredentialsContextType;

const credentials = {
    email: 'teste@verum.com',
    password: 'teste2024'
} as UserLoginCredentials;

const makeSut = () => {
    render(
        <UserCredentialsContext.Provider value={defaultContextState}>
            <Login />
        </UserCredentialsContext.Provider>
    );
}

describe("LoginComponent", () => {
    describe("Render", () => {
        beforeAll(() => {
            window.alert = jest.fn();
        });

        it("should render login page", () => {
            makeSut();
            const loginComponent = screen.getByRole("main", {
                name: 'login__page'
            });

            expect(loginComponent).toBeInTheDocument();
        });
    });

    describe("Interactions", () => {
        beforeEach(() => {
            window.alert = jest.fn();
            jest.clearAllMocks();
        })

        it('should fill email and password input', () => {
            makeSut();
            const emailInput = screen.getByTestId("login__input__email") as HTMLInputElement;

            const passwordInput = screen.getByTestId("login__input__password") as HTMLInputElement;

            fireEvent.input(emailInput, { target: { value: credentials.email } });
            fireEvent.input(passwordInput, { target: { value: credentials.password } });

            expect(emailInput.value).toBe(credentials.email);
            expect(passwordInput.value).toBe(credentials.password);
        });

        it("should click login button", () => {
            makeSut();
            const loginButton = screen.getByRole("button", {
                name: 'login__button'
            });
            loginButton.onclick = jest.fn();

            fireEvent.click(loginButton);

            expect(loginButton.onclick).toHaveBeenCalled();
        });

        it("should throw an error when login", async () => {
            makeSut();
            const loginForm = screen.getByRole("form", {
                name: 'login__form'
            });
            loginForm.onsubmit = jest.fn();
            const spyAlert = jest.spyOn(window, 'alert').mockImplementationOnce(() => { });

            try {
                jest.spyOn(makeRemoteSendUserCredentials(), 'exec').mockImplementationOnce(() => { throw new Error('') });

                fireEvent.submit(loginForm);
            } catch (error: any) {
                expect(loginForm.onsubmit).toHaveBeenCalled();
                expect(spyAlert).toHaveBeenCalledWith('Dados inválidos.');
            }
        })
    });

    describe("Navigation", () => {
        it("should to be redirect to home page when login", async () => {
            makeSut();

            const loginButton = screen.getByRole("button", {
                name: 'login__button'
            });
            loginButton.onclick = jest.fn();

            fireEvent.click(loginButton);

            expect(loginButton.onclick).toHaveBeenCalled();

            const loginForm = screen.getByRole("form", {
                name: 'login__form'
            });

            loginForm.onsubmit = jest.fn();

            await waitFor(async () => {
                fireEvent.submit(loginForm);
                expect(loginForm.onsubmit).toHaveBeenCalled();
            });

        });
    });
});