import "./gameCopiesDataGrid.scss";
import { DataGrid } from "@mui/x-data-grid";
import { platformIcons } from "../../utils/platformIcons";
import { Modal } from "../modal/Modal";
import { formatPrice } from "../../utils/formatStrings";

export const GameCopiesDataGrid = ({ gameCopies }) => {
  const columns = [
    {
      field: "storeName",
      headerName: "Store",
      width: 150,
      renderCell: (params) => {
        return (
          <a target="_blank" href={params.row.link}>
            {params.row.storeName}
          </a>
        );
      },
    },
    {
      field: "platform",
      headerName: "Platform",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (
          params.row.platform === "ps3" ||
          params.row.platform === "ps2" ||
          params.row.platform === "psVita"
        ) {
          const imgUrl = platformIcons.playstation;
          return <img className="platformLargeIcon" src={imgUrl} />;
        }
        if (params.row.platform === "ps5" || params.row.platform === "ps5Old") {
          const imgUrl = platformIcons.ps5;
          return <img className="platformSmallIcon" src={imgUrl} />;
        }
        if (params.row.platform === "ps4" || params.row.platform === "ps4Old") {
          const imgUrl = platformIcons.ps4;
          return <img className="platformSmallIcon" src={imgUrl} />;
        }
        if (params.row.platform === "xbox") {
          const imgUrl = platformIcons.xbox;
          return <img className="platformLargeIcon" src={imgUrl} />;
        }
        if (
          params.row.platform === "switch" ||
          params.row.platform === "switchOld"
        ) {
          const imgUrl = platformIcons.switch;
          return <img className="platformLargeIcon" src={imgUrl} />;
        }
      },
    },
    {
      field: "retailPrice",
      headerName: "Current Price",
      type: "number",
      width: 230,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return <span>{formatPrice(params.row.retailPrice[0].price)}</span>;
      },
    },
    {
      field: "originalPrice",
      headerName: "Original Price",
      width: 230,
      renderCell: (params) => {
        if (params.row.originalPrice) {
          return <span>{formatPrice(params.row.originalPrice)}</span>;
        } else {
          return (
            <span>
              {formatPrice(
                params.row.retailPrice[params.row.retailPrice.length - 1].price
              )}
            </span>
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Modal priceData={params.row.retailPrice} />;
      },
    },
  ];

  return (
    // <Box sx={{ height: 1100, width: "100%",  }}>
    <DataGrid
      sx={{
        color: "white",
        borderWidth: "1px",
        borderColor: "white",
        fontFamily: "Urbanist",
        fontSize: "18px",
        backgroundColor: "black",
        ".MuiDataGrid-cell": {
          "&:focus": {
            outline: "none",
          },
        },
        ".MuiDataGrid-row": {
          color: "white",
          "&:nth-child(2n)": { backgroundColor: "#1a1a1a", color: "white" },
        },
        ".css-rtrcn9-MuiTablePagination-root": { color: "white" },
      }}
      rowHeight={60}
      rows={gameCopies}
      getRowId={(row) => row._id}
      autoHeight
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
      pageSizeOptions={[15]}
      disableRowSelectionOnClick
    />
    // </Box>
  );
};
