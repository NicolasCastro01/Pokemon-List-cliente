'use client';

import { createContext } from "react";
import type { UserCredentialsContext as UserCredentialsContextType } from "~/@core/domain";

export const UserCredentialsContext = createContext({} as UserCredentialsContextType);