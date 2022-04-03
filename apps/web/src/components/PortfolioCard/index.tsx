import { Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Portfolio } from "../../pages/StrategyPage";
import { percentFormat, moneyFormat } from "../PortfolioDataGrid";
import moment from "moment";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "inherit",
          }}
        >
          <Box display={"flex"} flexDirection="column" alignItems="center">
            <Box flex="auto">
              <Chip
                label={<Typography variant="h5">{portfolio.name}</Typography>}
                color="primary"
                variant="outlined"
              />
            </Box>
          </Box>
          {/* <Section title="Action du jour" /> */}
          <Section title="Simulation" />
          <Field
            title={"Apport par mois"}
            value={moneyFormat(portfolio.injectPerKline)}
          />
          <Field
            title={"Apport total"}
            value={moneyFormat(portfolio.injected)}
          />
          <Field
            title={"Durée de l'investissement"}
            value={moment().subtract(portfolio.yearly, "years").fromNow()}
          />
          <Section title="Resultat sur stratégie Pixou" />
          <Field
            title={"Ordre du jour"}
            value={
              portfolio.lastOrderType === "LONG"
                ? "Vous devriez acheter 🐸"
                : "Vous devriez vendre 🚨"
            }
          />
          <Field
            title={"Solde disponible"}
            value={moneyFormat(portfolio.total)}
          />
          <Field
            title={"Gain/Perte en euro"}
            value={moneyFormat(portfolio.gains)}
          />
          <Field
            title={"Gain/Perte en pourcentage"}
            color={
              portfolio.ratio >= 1
                ? "rgba(99, 255, 132, 1)"
                : "rgba(255, 99, 132, 1)"
            }
            value={
              (portfolio.ratio >= 1 ? "▴ " : "▾ ") +
              percentFormat(portfolio.ratio)
            }
          />
          <Field
            title={"Performance par rapport à l'investissement programmé"}
            color={
              portfolio.performanceHODL >= 1
                ? "rgba(99, 255, 132, 1)"
                : "rgba(255, 99, 132, 1)"
            }
            value={
              (portfolio.performanceHODL >= 1 ? "▴ " : "▾ ") +
              percentFormat(portfolio.performanceHODL - 1)
            }
          />
          <Section title="Resultat sur investissement programmé" />
          <Field
            title={"Solde disponible"}
            value={moneyFormat(portfolio.buyAndHoldTotal)}
          />
          <Field
            title={"Gain/Perte en euro"}
            value={moneyFormat(portfolio.buyAndHoldGains)}
          />
          <Field
            title={"Gain/Perte en pourcentage"}
            color={
              portfolio.buyAndHoldRatio >= 1
                ? "rgba(99, 255, 132, 1)"
                : "rgba(255, 99, 132, 1)"
            }
            value={
              (portfolio.buyAndHoldRatio >= 1 ? "▴ " : "▾ ") +
              percentFormat(portfolio.buyAndHoldRatio)
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function Field({ title, value, color = "" }) {
  return (
    <Box
      display="flex"
      flexDirection={"row"}
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Typography variant="caption" mr={2}>
        {title}
      </Typography>
      <Typography
        variant="caption"
        color={color ? color : undefined}
        textAlign="right"
        whiteSpace={"nowrap"}
      >
        {value}
      </Typography>
    </Box>
  );
}

function Section({ title, type = "t" }) {
  return (
    <Divider sx={{ mt: 3, mb: 2 }}>
      <Typography variant="body2">
        {type === "chip" ? <Chip label={title} /> : title}
      </Typography>
    </Divider>
  );
}
