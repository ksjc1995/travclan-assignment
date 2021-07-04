import { DataGrid } from "@material-ui/data-grid";

export default function DataTable({ rows, cols, ...rest }) {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={cols} {...rest} />
    </div>
  );
}
