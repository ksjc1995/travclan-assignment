import React from "react";

const CustomersDataContext = React.createContext([]);

export const CustomersDataProvider = CustomersDataContext.Provider;

export const CustomersDataConsumer = CustomersDataProvider.Consumer;

export default CustomersDataContext;
