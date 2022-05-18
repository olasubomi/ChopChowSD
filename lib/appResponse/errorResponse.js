class ErrorResponse {
  constructor(err) {
    if (err instanceof Error) {
      this.name = err.name;
      this.message = err.message;
      /** This.stack = err.stack; */
    } else {
      this.message = err;
    }
  }
}

module.exports = ErrorResponse