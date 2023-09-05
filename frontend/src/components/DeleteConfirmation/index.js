import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";

export default function DeleteConfirmation({ name, isDeleteConfirmationOpen,closeDialog,handleDeleteClick}) {

  return (
    <Dialog open={isDeleteConfirmationOpen} onClose={closeDialog}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete "{name}"?</DialogTitle>
          <DialogContent>
          Are you sure you want to permanently delete "{name}"? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary" onClick={closeDialog}>Close</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={handleDeleteClick}>Delete</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
      </Dialog>
  );
}
