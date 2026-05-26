"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useStoreWithEqualityFn } from "zustand/traditional"
import { shallow } from "zustand/shallow"

import { createAppStore, type AppStore } from "@/lib/store/store"
import type { StoreInterface } from "@/lib/types/store"

const StoreContext = createContext<AppStore | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createAppStore())

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore<T>(selector: (state: StoreInterface) => T): T {
  const store = useContext(StoreContext)

  if (store === null) {
    throw new Error("useStore must be used within a StoreProvider")
  }

  return useStoreWithEqualityFn(store, selector, shallow)
}

export function useStoreApi(): AppStore {
  const store = useContext(StoreContext)

  if (store === null) {
    throw new Error("useStoreApi must be used within a StoreProvider")
  }

  return store
}
