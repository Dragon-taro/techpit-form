export type AlertState = {
  severity: AlertSeverity;
  message: string;
  open: boolean;
};

export type AlertSeverity = "error" | "success";
