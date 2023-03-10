import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { GlobalState } from '../../../GlobalState';
import {useContext} from "react"

export default function History() {
  const state = useContext(GlobalState)
  const [history] = state.userAPI.history
  console.log(history)
  return (
      <div className="main">
      <div className="container">
          <div className="history__container">
              <h2 className="page__header">History</h2>
          <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <React.Fragment>
                            <Table size="medium">
                                <TableHead>
                                <TableRow>
                                    <TableCell className="history__item">Your Information</TableCell>
                                    <TableCell className="history__item">Shipping Address</TableCell>
                                    <TableCell className="history__item">Cart Content</TableCell>
                                    <TableCell className="history__item" align="right">Total</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {history.map((item) => (
                                    <TableRow key={item._id}>
                                    <TableCell className="history__item">
                                        <p>Name: {item.name}</p>
                                        <p>Email: {item.email}</p>
                                    </TableCell>
                                    <TableCell className="history__item">
                                        <p>{item.address}</p>
                                    </TableCell>
                                    <TableCell className="history__item">
                                        
                                        <div  className="flexrow text__transform">
                                                <object width="100%" height="400" data={item?.result?.url} type="application/pdf">   </object>
                                        </div>
                                        
                                    </TableCell>
                                    <TableCell className="history__item" align="right">${item.cart.reduce((prev, cartItem) => (
                                            prev + (Number(cartItem.quantity) * Number(cartItem.MRP))
                                    ), 0)}</TableCell>
                                    </TableRow>
                                ))}
                                
                                </TableBody>
                            </Table>
                            </React.Fragment>    
                    </Paper>
            </Grid>
          </div>

      </div>
      </div>

  );
}