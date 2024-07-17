import { ReactNode, createContext, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { DialogContent, Typography } from "@mui/material";

type ConfirmDialogContextType = {
  confirmChoice?: (_title: string, _description?: string) => Promise<boolean>;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType>({
  confirmChoice: () => new Promise<boolean>(noop),
});

const ConfirmDialogContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fn = useRef<(_accept: boolean) => void>();

  const confirmChoice = (title: string, description?: string) => {
    setTitle(title);
    setDescription(description ?? "");

    return new Promise<boolean>((resolve) => {
      setOpen(true);
      fn.current = (accept: boolean) => {
        resolve(accept);
        setOpen(false);
      };
    });
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirmChoice }}>
      {children}
      <>
        <Dialog
          open={open}
          onClose={() => fn.current && fn.current(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-Title"
          maxWidth={"xs"}
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          {description && (
            <DialogContent>
              <Typography sx={{ pt: 2 }}>{description}</Typography>
            </DialogContent>
          )}
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => fn.current && fn.current(false)}
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => fn.current && fn.current(true)}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </ConfirmDialogContext.Provider>
  );
};

const noop = () => {};

export { ConfirmDialogContext, ConfirmDialogContextProvider };
