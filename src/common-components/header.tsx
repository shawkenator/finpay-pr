import { CardHeader, Paper } from "@mui/material"

export const Header = () => {

  return (
    <div>
      <Paper elevation={1} sx={{backgroundColor: 'steelblue'}}>
        <CardHeader title="Users Mangement App"/>
      </Paper>
    </div>
  )
}

export default Header;
