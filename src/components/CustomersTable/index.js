import { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import DataTable from "../DataTable/";
import CustomersDataContext from "../../contexts/CustomersDataContext";
import Switch from "@material-ui/core/Switch";

export default function CustomersTable() {
  const rows = useContext(CustomersDataContext);
  const [isMinBidDisplayed, setIsMinBidDisplayed] = useState(false);

  const getColumns = (isMinBidDisplayed) => {
    return [
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
      {
        field: "hasPremium",
        headerName: "Premium",
        width: 180,
        sortable: false,
      },
      {
        field: "maxMinBid",
        headerName: "Max/Min Bid",
        width: 180,
        type: "number",
        valueGetter: (params) => {
          return isMinBidDisplayed
            ? getMinBid(params.row.bids)
            : getMaxBid(params.row.bids);
        },
      },
    ];
  };

  const getMaxBid = (bids) => {
    if (bids.length === 0) return 0;
    let maxBid = -Infinity;
    for (let bid of bids) {
      if ("amount" in bid && bid.amount > maxBid) {
        maxBid = bid.amount;
      }
    }
    return maxBid;
  };

  const getMinBid = (bids) => {
    if (bids.length === 0) return 0;
    let minBid = Infinity;
    for (let bid of bids) {
      if ("amount" in bid && bid.amount < minBid) {
        minBid = bid.amount;
      }
    }
    return minBid;
  };

  return (
    <>
      <span className="bid-text">Max Bid</span>
      <Switch
        checked={isMinBidDisplayed}
        onChange={() => {
          setIsMinBidDisplayed(!isMinBidDisplayed);
        }}
        name="bidToggle"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <span className="bid-text">Min Bid</span>
      <DataTable
        loading={rows.length === 0}
        rows={rows}
        cols={getColumns(isMinBidDisplayed)}
        autoHeight
        pageSize={5}
        disableColumnMenu
        hideFooterSelectedRowCount
        sortingOrder={["asc", "desc"]}
        sortModel={[
          {
            field: "maxMinBid",
            sort: "asc",
          },
        ]}
        rowsPerPageOptions={[5, 25, 50]}
      />
    </>
  );
}
