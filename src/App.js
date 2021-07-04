import DataTable from "./components/DataTable";
import Container from "@material-ui/core/Container";

const rows = [
  {
    id: 1,
    firstName: "Kartik",
    lastName: "Sharma",
    avatarUrl:
      "https://prod_membership_avatars.s3.amazonaws.com/avatar-file-d84b533b09f34ab6908345833dc21773.jpg",
    email: "test@gmail.com",
    phone: "12345",
    hasPremium: true,
    bids: [
      {
        id: "2",
        carTitle: "bentle",
        amount: 10000,
        created: "1509807708071",
      },
    ],
  },
];

const cols = [
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 180,
    valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    sortable: false,
  },
  { field: "email", headerName: "Email", width: 180, sortable: false },
  { field: "phone", headerName: "Phone", width: 180, sortable: false },
  { field: "hasPremium", headerName: "Premium", width: 180, sortable: false },
  {
    field: "maxMinBid",
    headerName: "Max/Min Bid",
    width: 180,
    valueGetter: (params) => {
      return `${getMaxBid(params.row.bids)}`;
    },
  },
];

const getMaxBid = (bids) => {
  let maxBid = -Infinity;
  for (let bid of bids) {
    if ("amount" in bid && bid.amount > maxBid) {
      maxBid = bid.amount;
    }
  }
  return maxBid;
};

function App() {
  return (
    <Container maxWidth="md">
      <DataTable rows={rows} cols={cols} pageSize={5} disableColumnMenu />
    </Container>
  );
}

export default App;
