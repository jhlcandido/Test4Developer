interface IApiError {
  name: string;
  errors: [{ message: string; path: string }];
}

export function errorsToValidateObj<T>(error: IApiError): T | null {
  try {
    let _validation: any = {};
    error.errors.map((v) => {
      _validation = { ..._validation, [v.path]: v.message };
      return v;
    });

    return _validation;
  } catch (error) {
    return null;
  }
}
