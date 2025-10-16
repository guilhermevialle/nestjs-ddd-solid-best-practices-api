interface ApplicationErrorProps {
  message: string;
  errorCode: string;
  statusCode: number;
}

export class ApplicationError extends Error {
  props: ApplicationErrorProps;

  constructor(props: ApplicationErrorProps) {
    super(props.message);
    this.props = props;
    this.name = this.constructor.name;
  }
}
