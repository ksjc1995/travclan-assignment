import { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import DataTable from "../DataTable/";
import CustomersDataContext from "../../contexts/CustomersDataContext";

const cols = [
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 180,
    renderCell: (params) => {
      return (
        <>
          <Avatar
            style={{ marginRight: "8px" }}
            src={params.row.avatarUrl}
            alt="avatar"
          />
          {`${params.row.firstname} ${params.row.lastname}`}
        </>
      );
    },
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

export default function CustomersTable() {
  const rows = useContext(CustomersDataContext);
  return (
    <DataTable
      loading={rows.length === 0}
      rows={rows}
      cols={cols}
      autoHeight
      pageSize={5}
      disableColumnMenu
      hideFooterSelectedRowCount
      disableColumnSelector
      disableDensitySelector
      rowsPerPageOptions={[5, 25, 50]}
    />
  );
}
