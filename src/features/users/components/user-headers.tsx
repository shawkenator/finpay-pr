import { Grid, Paper, Typography } from "@mui/material"

export const userIdNameEmailHeaders = (
  <>
    <Grid item xs={4}>
        <Typography>
          User ld
        </Typography>
    </Grid>
    <Grid item xs={4}>
      <Paper>
        <Typography>
          Email
        </Typography>
      </Paper>
    </Grid>
    <Grid item xs={4}>
      <Paper>
        <Typography>
          Name
        </Typography>
      </Paper>
    </Grid>
  </>
)

export const statusGenderHeaders = (
  <>
    <Grid item xs={6}>
      <Paper>
        <Typography>
          Status
        </Typography>
        </Paper>
    </Grid>
    <Grid item xs={6}>
        <Typography>
          Gender
        </Typography>

    </Grid>
  </>
)
