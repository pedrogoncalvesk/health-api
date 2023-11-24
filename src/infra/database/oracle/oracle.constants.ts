export enum OracleOraError {
  /** Database access denied */
  ACCESS_DENIED = 1017,
  /** Database access unavailable */
  SERVER_UNAVAILABLE = 12514,
}

export enum OracleOraErrorDescription {
  ACCESS_DENIED = 'Database access denied',
  SERVER_UNAVAILABLE = 'Database access unavailable',
}
