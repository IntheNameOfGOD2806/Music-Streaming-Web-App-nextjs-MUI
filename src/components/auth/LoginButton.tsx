import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ImSpinner10 } from "react-icons/im";
import './LoginButton.scss'
export default function LoginButton( {loading}: any) {
  return (
    <Stack spacing={2} direction="row">
 
      <Button disabled={loading} variant="contained" sx={{ width: "100%" }}>Sign In
      {loading && <ImSpinner10 className="spinner"/>}
      </Button>
     
    </Stack>
  );
}