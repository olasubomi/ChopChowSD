class SuccessResponse {
  constructor(data, message) {
    this.message = message;
    this.data = data;
  }

  recordCreated() {
    return { data: this.data, message: this.message };
  }

  recordFetched() {
    return { data: this.data, message: this.message };
  }
}

module.exports = SuccessResponse;
