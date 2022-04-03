import { Box, Paper, Typography, Tooltip as MUITooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { STRATEGIES_ROUTE } from "../../constants/routes";

export const moneyFormat = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(usdToEur(value));

const CHANGE_EUR_USD = 1.1;
export const usdToEur = (value: number) => value / CHANGE_EUR_USD;
export const eurToUsd = (value: number) => value * CHANGE_EUR_USD;

export const percentFormat = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export default function PortfolioDataGrid({ portfolios, loading, error }) {
  const navigate = useNavigate();

  return (
    <Paper
      style={{
        width: "100%",

        backgroundImage: "none",
      }}
    >
      <DataGrid
        error={error}
        density="comfortable"
        pagination
        disableColumnSelector
        hideFooterPagination
        hideFooter
        localeText={{
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} sur ${totalCount.toLocaleString()}`,
          errorOverlayDefaultLabel:
            "Une erreur s'est produite lors du chargement des données. Contactez nous à cette adresse johannhospice.dev@gmail.com",
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "performanceHODL", sort: "desc" }],
          },
        }}
        columns={[
          {
            field: "name",
            headerName: "Cryptomonnaie",
            // minWidth: 140,
            flex: 1,
            renderCell: ({ value: name, row }) => (
              <Box display={"flex"} flexDirection="row" alignItems={"center"}>
                <MUITooltip
                  title={
                    row.lastOrderType === "LONG"
                      ? "Vous devriez acheter"
                      : "Vous devriez vendre"
                  }
                >
                  <Typography>
                    {row.lastOrderType === "LONG" ? "🐸" : "🚨"}
                  </Typography>
                </MUITooltip>

                <Box display={"flex"} flexDirection="column" ml={1}>
                  <Box display={"flex"} flexDirection="row">
                    <Typography
                      variant="body2"
                      fontWeight={"700"}
                      color="primary"
                    >
                      {name.replace("USDT", "")}
                    </Typography>
                    <Typography variant="body2" fontWeight={"700"} ml={1}>
                      {`${Number(row.yearly).toFixed(2).replace(".", ",")} ans`}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="rgba(255, 255, 255, .5)">
                    {moneyFormat(Number(row.injected))}
                  </Typography>
                </Box>
              </Box>
            ),
          },
          {
            field: "total",
            headerName: "Gain/Perte avec strategie",
            // minWidth: 140,
            align: "left",
            flex: 1,
            renderCell: ({ value: params, row }) => (
              <Typography
                variant="body2"
                color={
                  params - row.injected >= 0
                    ? "rgba(99, 255, 132, 1)"
                    : "rgba(255, 99, 132, 1)"
                }
              >
                {moneyFormat(Number(params - row.injected))}
                <br />
                {(params - row.injected >= 0 ? "▴ " : "▾ ") +
                  percentFormat(Number(row.ratioInPercent) - 1)}
              </Typography>
            ),
          },
          {
            field: "performanceHODL",
            headerName: "Gain/Perte comparé à AverageInvestment",
            // minWidth: 200,
            align: "left",
            flex: 1,
            renderCell: ({ value: params, row }) => (
              <Typography
                variant="body2"
                color={
                  params >= 1
                    ? "rgba(99, 255, 132, 1)"
                    : "rgba(255, 99, 132, 1)"
                }
              >
                {(params - 1 >= 0 ? "▴ " : "▾ ") +
                  percentFormat(Number(params) - 1)}
              </Typography>
            ),
          },
        ]}
        rows={portfolios.reduce(
          (acc, data, i) =>
            data
              ? [
                  ...acc,
                  {
                    id: i,
                    name: data.name,
                    lastOrderType: data.lastOrderType,
                    yearly: data.yearly,
                    injected: data.injected,
                    total: data.total,
                    ratioInPercent: data.ratio,
                    performanceHODL: data.performanceHODL,
                    buyAndHoldTotal: data.buyAndHoldTotal,
                    buyAndHoldRatio: data.buyAndHoldRatio,
                  },
                ]
              : acc,
          []
        )}
        autoHeight
        pageSize={100}
        onCellClick={(param) =>
          navigate(`${STRATEGIES_ROUTE}/${param.row.name}`)
        }
        loading={loading}
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          },
        }}
      />
    </Paper>
  );
}
