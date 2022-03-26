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
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
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
                <TableCell align="right">{row.total} €</TableCell>
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
                    {row.performanceHODL} %
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

export function PortfolioDataGrid({ portfolios, loading }) {
  const navigate = useNavigate();
  return (
    <Paper style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        columns={[
          {
            field: "lastOrderType",
            headerName: "",
            flex: 0,

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
          { field: "name", headerName: "Nom", flex: 1 },
          // {
          //   field: "injectPerKline",
          //   headerName: "Apport tout les mois",
          //   flex: 1,
          //   valueFormatter: ({ value: params }) => `${params} €`,
          // },
          {
            field: "yearly",
            headerName: "Nombre d'années",
            flex: 1,
            valueFormatter: ({ value: params }) => Number(params).toFixed(2),
          },
          {
            field: "injected",
            headerName: "Total apport",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} €`,
          },
          {
            field: "total",
            headerName: "Total géré",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} €`,
          },
          {
            field: "ratioInPercent",
            headerName: "Performance de la strategie",
            flex: 1,
            valueFormatter: ({ value: params }) =>
              `${Number(params).toFixed(2)} %`,
          },
          {
            field: "performanceHODL",
            headerName: "Performance par rapport à AverageInvestment",
            flex: 1,
            // valueFormatter: ({ value: params }) =>
            //   `${Number(params).toFixed(2)} %`,
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
        rows={portfolios.reduce((acc, data, i) => {
          console.log(data);
          if (data) {
            return [
              ...acc,
              {
                id: i,
                name: data.name,
                lastOrderType: data.lastOrderType,
                // injectPerKline: data.injectPerKline,
                yearly: data.yearly,
                injected: data.injected,
                total: data.total,
                ratioInPercent: data.ratioInPercent,
                performanceHODL: data.performanceHODL,
              },
            ];
          }
          return acc;
        }, [])}
        pageSize={100}
        rowsPerPageOptions={[5]}
        onCellClick={(param) =>
          navigate(`${STRATEGIES_ROUTE}/${param.row.name}`)
        }
        loading={loading}
      />
    </Paper>
  );
}
