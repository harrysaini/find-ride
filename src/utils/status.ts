

export enum RESPONSE_STATUS {
  FAILED = 1,
  SUCCESS = 0
}

export enum RESPONSE_MESSAGE {
  SUCCESS = 'Success'
}

export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400
}

class Status {
  public code: RESPONSE_STATUS = RESPONSE_STATUS.SUCCESS;
  public message: string = '';

  constructor(code?: RESPONSE_STATUS, message?: string) {
    this.code = code || RESPONSE_STATUS.SUCCESS;
    this.message = message || '';
  }
}

export default Status;
