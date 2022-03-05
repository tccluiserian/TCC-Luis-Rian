import React from 'react'
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';

export default function CopyrightLogin() {
    return (
      <Grid container justify='center' alignItems='center' spacing={1}>
          <Grid item container justify='center' alignItems='center'>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© Gerenciador - Facial Recognition System - '}
              {new Date().getFullYear()}
            </Typography>
          </Grid>
          <Grid item container justify='center' alignItems='center'>
            <Typography variant="body2" color="textSecondary" align="center" style={{fontSize: 12}}>
              Versão 0.1.0
            </Typography>
          </Grid>
      </Grid>
    );
}