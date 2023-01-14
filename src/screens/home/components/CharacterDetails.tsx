import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  CharacterBasicInfoFragment,
  useCharacterQuery,
} from "../../../generated/graphql";

interface CharacterDetailsProps {
  character: CharacterBasicInfoFragment;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  const { data, loading } = useCharacterQuery({
    variables: { id: character?.id! },
  });

  if (loading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return (
    <Stack direction="row" justifyContent="space-around">
      <Card variant="outlined" sx={{ width: "30%" }}>
        <CardContent>
          <Typography
            sx={{ mb: 1.5, fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Location
          </Typography>
          <Typography variant="h5" component="div">
            {data?.character?.location?.name}
          </Typography>
          <Typography color="text.secondary">
            type: {data?.character?.location?.type}
          </Typography>
          <Typography variant="body2">
            dimension: {data?.character?.location?.dimension}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ width: "30%" }}>
        <CardContent>
          <Typography
            sx={{ mb: 1.5, fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            Origin
          </Typography>
          <Typography variant="h5" component="div">
            {data?.character?.origin?.name}
          </Typography>
          <Typography color="text.secondary">
            type: {data?.character?.origin?.type}
          </Typography>
          <Typography variant="body2">
            dimension: {data?.character?.origin?.dimension}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ width: "30%" }}>
        <CardContent>
          <Typography
            sx={{ mb: 1.5, fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            First Appearance
          </Typography>
          <Typography variant="h5" component="div">
            {data?.character?.episode?.[0]?.name}
          </Typography>
          <Typography color="text.secondary">
            Episode: {data?.character?.episode?.[0]?.episode}
          </Typography>
          <Typography variant="body2">
            date: {data?.character?.episode?.[0]?.air_date}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CharacterDetails;
