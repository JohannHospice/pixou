import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Portfolio } from "../../pages/StrategyPage";
import { percentFormat, moneyFormat } from "../PortfolioDataGrid";

export default function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <Card>
      <CardContent>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h5">{portfolio.name}</Typography>
          <Typography variant="h4">
            {moneyFormat(portfolio.total)}
            {" sur "}
            {`${Number(portfolio.yearly).toFixed(2).replace(".", ",")} ans`}
          </Typography>
        </Box>
        <Field
          title={"Apport par mois"}
          value={moneyFormat(portfolio.injectPerKline)}
        ></Field>
        <Field
          title={"Apport total"}
          value={moneyFormat(portfolio.injected)}
        ></Field>
        <Field
          title={"Gain/Perte en pourcentage"}
          value={percentFormat(portfolio.ratio)}
        ></Field>
        <Field
          title={"Total pour une strategie AverageInvestment"}
          value={moneyFormat(portfolio.buyAndHoldTotal)}
        ></Field>
      </CardContent>
    </Card>
  );
}

function Field({ title, value }) {
  return (
    <Box display="flex" flexDirection={"row"} justifyContent="space-between">
      <Typography variant="caption">{title}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}
