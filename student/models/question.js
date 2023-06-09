export class Question {
  constructor(message, method) {
    this.id = message.id;
    this.questionText = message.questionText;
    this.method = method;
  }
}
