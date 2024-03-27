export interface GlobalsSliceInterface {
  dummyState: boolean
  setDummyState: (dummyState: boolean) => void
}

export interface StoreInterface extends GlobalsSliceInterface {}
