import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { api } from "../../api";

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.getUsers().then(setUsers);
  }, []);

  return (
    <TableContainer component={Paper} sx={{ m: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>About</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Birthdate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.about || "-"}</TableCell>
              <TableCell>
                {user.address
                  ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}`
                  : "-"}
              </TableCell>
              <TableCell>{user.birthdate || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
