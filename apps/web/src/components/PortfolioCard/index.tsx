import {
  Card,
  CardContent,
  Chip,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";
import { Portfolio } from "../../pages/StrategyPage";
import { percentFormat, moneyFormat } from "../PortfolioDataGrid";
import moment from "../../moment";
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
                label={
                  <Typography variant="h5" textTransform={"uppercase"}>
                    {portfolio.fullName || portfolio.name.replace("USDT", "")}
                  </Typography>
                }
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
            title={"Début de l'investissement"}
            value={(() => {
              return moment(portfolio.startDate).format("LL");
            })()}
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
        <Box display={"flex"} justifyContent="end">
          <Link
            target="_blank"
            variant="body2"
            color="grey.500"
            display={"flex"}
            alignItems="center"
            href={`https://coinmarketcap.com/fr/currencies/${portfolio.coinmarketcap}/`}
          >
            coinmarketcap.com
            <LinkIcon sx={{ ml: 1, fontSize: "inherit" }} />
          </Link>
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
      <Typography variant="body2" mr={2}>
        {title}
      </Typography>
      <Typography
        variant="body2"
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
      <Typography variant="body1">
        {type === "chip" ? <Chip label={title} /> : title}
      </Typography>
    </Divider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fromNow(years: number) {
  const mmmmMonthsAgo = years * 12 - 1;

  const yyyy = moment().subtract(years, "years");
  const mmmm = moment().subtract(mmmmMonthsAgo % 12, "months");
  const dddd = moment().subtract(years, "years").add(mmmmMonthsAgo, "months");

  const yyyyText = yyyy.fromNow(false);
  const mmmmText = mmmm.fromNow(true);

  moment.relativeTimeThreshold("d", 32);
  const ddddText = dddd.fromNow(true);
  console.log({
    years,
    mmmmMonthsAgo,
  });
  const hasY = years > 1;
  const hasM = mmmmMonthsAgo > 12;
  const hasD = years * 12 - mmmmMonthsAgo > 0;
  return (
    (hasY ? yyyyText + (hasM || hasD ? " et " : "") : "") +
    (hasM ? mmmmText + (hasD ? " et " : "") : "") +
    (hasD ? ddddText : "")
  );
}
