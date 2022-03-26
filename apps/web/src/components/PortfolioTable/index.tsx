import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  Tooltip as MUITooltip,
  Typography,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { STRATEGIES_ROUTE } from "../../constants/routes";

export default function PortfolioTable({ portfolios }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Apport tout les mois</TableCell>
              <TableCell align="right">Nombre d'années</TableCell>
              <TableCell align="right">Total apport</TableCell>
              <TableCell align="right">Total géré </TableCell>
              <TableCell align="right">Gain/Perte avec la strategie</TableCell>
              <TableCell align="right">
                Gain/Perte comparé à AverageInvestment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolios.map((row, i) => (
              <TableRow
                hover
                onClick={() => navigate(`${STRATEGIES_ROUTE}/${row.filename}`)}
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                css={{
                  ":hover": {
                    background: "red",
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Box>
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
                  </Box>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ position: "relative" }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.injectPerKline} €</TableCell>
                <TableCell align="right">
                  {Number(row.indexInjected / 12).toFixed(2)}
                </TableCell>
                <TableCell align="right">{row.injected} €</TableCell>
                <TableCell align="right">
                  {Number(row.total).toFixed(2)} €
                </TableCell>
                <TableCell align="right">
                  {Number((row.ratio - 1) * 100).toFixed(2)} %
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    color={
                      row.total - row.buyAndHoldTotal >= 1
                        ? "rgba(99, 255, 132, 1)"
                        : "rgba(255, 99, 132, 1)"
                    }
                  >
                    {Number((row.performanceHODL - 1) * 100).toFixed(2)} %
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function PortfolioDataGrid({ portfolios, loading, error }) {
  const navigate = useNavigate();
  const moneyFormat = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format;
  var percentFormat = new Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format;
  return (
    <Paper
      style={{
        // height: "calc(100vh - 154px)",
        width: "100%",
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
        }}
      />
    </Paper>
  );
}
