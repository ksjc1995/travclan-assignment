import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CustomersTable from "./components/CustomersTable";
import Bids from "./components/Bids";
import { CustomersDataProvider } from "./contexts/CustomersDataContext";

const BASE_URL = "https://intense-tor-76305.herokuapp.com/merchants";

function App() {
  const [customersData, setCustomersData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(BASE_URL);
    setCustomersData(await res.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CustomersDataProvider value={customersData}>
      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route path="/bids">
              <Bids />
            </Route>
            <Route path="/">
              <CustomersTable />
            </Route>
          </Switch>
        </Router>
      </Container>
    </CustomersDataProvider>
  );
}

export default App;
