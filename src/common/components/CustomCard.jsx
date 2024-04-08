import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={"https://zanegreytu.org/wp-content/uploads/2018/11/JumpFish3_202524506_2200.jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Fish Detechion ${props.additionalInfo}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.viewHandler}>
         View clip
        </Button>
        <Button size="small" color="secondary" onClick={props.trainHandler}>
         Train Data
        </Button>
      </CardActions>
    </Card>
  );
}