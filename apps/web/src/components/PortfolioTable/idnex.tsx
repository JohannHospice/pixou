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
              <TableCell align="right">Performance de la strategie</TableCell>
              <TableCell align="right">
                Performance par rapport à HODL
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
                  {Number(row.ratio * 100).toFixed(2)} %
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={
                      row.total - row.buyAndHoldTotal >= 0
                        ? "rgba(99, 255, 132, 1)"
                        : "rgba(255, 99, 132, 1)"
                    }
                  >
                    {Number(row.performanceHODL).toFixed(2)} %
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
        rowThreshold={0}
        initialState={{
          pinnedColumns: { left: ["lastOrderType", "name"] },
        }}
        columns={[
          {
            field: "lastOrderType",
            headerName: "",
            flex: 0,
            maxWidth: 67,
            align: "center",
            renderCell: ({ value: params }) => (
              <MUITooltip
                title={
                  params === "LONG"
                    ? "Vous devriez acheter"
                    : "Vous devriez vendre"
                }
              >
                <Typography>{params === "LONG" ? "🐸" : "🚨"}</Typography>
              </MUITooltip>
            ),
          },
          { field: "name", headerName: "Nom", minWidth: 140 },
          {
            field: "yearly",
            headerName: "Nombre d'années",
            minWidth: 140,
            align: "right",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} ans`,
          },
          {
            field: "injected",
            headerName: "Total apport",
            minWidth: 140,
            align: "right",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} €`,
          },
          {
            field: "total",
            headerName: "Total géré",
            minWidth: 140,
            align: "right",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} €`,
          },
          {
            field: "ratioInPercent",
            headerName: "Performance de la strategie",
            minWidth: 200,
            align: "right",
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} %`,
          },
          {
            field: "performanceHODL",
            headerName: "Performance par rapport à AverageInvestment",
            minWidth: 200,
            align: "right",
            flex: 1,
            renderCell: ({ value: params }) => (
              <Typography
                color={
                  params >= 0
                    ? "rgba(99, 255, 132, 1)"
                    : "rgba(255, 99, 132, 1)"
                }
              >
                {`${Number(params).toFixed(2)} %`}
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
                    ratioInPercent: data.ratioInPercent,
                    performanceHODL: data.performanceHODL,
                  },
                ]
              : acc,
          []
        )}
        autoHeight
        pageSize={100}
        rowsPerPageOptions={[5]}
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
