export class ApiServiceException extends Error {
  constructor(private _status: number) {
    super()
  }

  public get status() {
    return this._status
  }

  public set status(status: number) {
    this._status = status
  }
}

export class UnprocessableEntityException extends ApiServiceException {
  constructor(private _errors: string[]) {
    super(422)
  }

  public get errors() {
    return this._errors
  }

  public set errors(errors: string[]) {
    this._errors = errors
  }
}

export class NotFoundException extends ApiServiceException {
  constructor() {
    super(404)
  }
}