const DEFAULT_ERROR = {
  errCode: 500,
  errMsg: 'Sorry, unexpected error',
};

export const handleException = (errorRes) => {
  if (!errorRes.response) {
    return DEFAULT_ERROR;
  }
  let error;
  const {
    data: { errMsg, errCode, status },
  } = errorRes.response;
  if (errMsg != null && (errCode != null || status != null)) {
    error = { errMsg, errCode: errCode ?? status };
  }
  return error;
};
