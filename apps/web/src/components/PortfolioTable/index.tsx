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
              <TableCell align="right">Total généré</TableCell>
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
                <TableCell align="left">{row.name}</TableCell>
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
