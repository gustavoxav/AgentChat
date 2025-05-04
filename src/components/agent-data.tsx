"use client"

import { List, ListItem, Typography } from "@mui/material"

interface AgentDataProps {
  readonly data: string[]
}

export function AgentData({ data }: AgentDataProps) {
  return (
    <List sx={{ mt: 2 }}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          sx={{
            p: 1.5,
            mb: 1,
            borderRadius: 1,
            bgcolor: (theme) => (theme.palette.mode === "light" ? "grey.100" : "grey.800"),
            border: (theme) => `1px solid ${theme.palette.mode === "light" ? "grey.200" : "grey.700"}`,
          }}
        >
          <Typography variant="body2">{item}</Typography>
        </ListItem>
      ))}
    </List>
  )
}
