import * as configurations from '@config/configuration';

type UiFunctionParameters = {
  stringParams: string;
  objectParams: Object;
};

export const ConvertUiFunctionParameters = (
  prefix: string,
  uiFunctionParameters: Object
): UiFunctionParameters => {
  const response = Object.keys(uiFunctionParameters).reduce((collection, key, currentIndex) => {
    const value = uiFunctionParameters[key];

    if (key === 'userId') {
      collection.stringParams = `${value}/${collection.stringParams}`;
    } else {
      collection.stringParams += `${key}=${value}/`;
    }

    const camelCaseKey = key.replace(/^./g, (g) => g[0].toUpperCase());
    collection.objectParams[camelCaseKey] = value;

    return collection;
  }, {
    stringParams: `${prefix}/`,
    objectParams: {},
  })

  response.stringParams = response.stringParams.slice(0, -1);

  return response;
}

export const CreateUiFunctionUrl = (
  prefix: string,
  uiFunctionParameters: Object
): string => {
  return Object.keys(uiFunctionParameters).reduce((collection, key, currentIndex) => {
    const value = uiFunctionParameters[key];

    if (key === 'userId') {
      collection = `${value}/${collection}`;
    } else {
      collection += `${key}=${value}/`;
    }

    return collection;
  }, `${prefix}/`).slice(0, -1);
}

export const GenerateLowerCase = (
  keyName: string,
): string => {
  return keyName.replace(/^./g, (g) => g[0].toLowerCase());
}

export const CreateUiFunctionParams = (
  uiFunctionParameters: Object,
): Object => {
  return Object.keys(uiFunctionParameters).reduce((collection, key, currentIndex) => {
    const value = uiFunctionParameters[key];
    const camelCaseKey = key.replace(/^./g, (g) => g[0].toUpperCase());

    collection[camelCaseKey] = value;

    return collection;
  }, {});
}

export const CreateMessage = (
  uiKey,
  query: any,
  uiFunctionName: string,
  uiFunctionUrl: string,
  runtimeSessionId: string,
  uiFunctionParams: any,
): Object => {
  const configuration = configurations.default();

  return {
    ui_key_general_user_id: `${uiKey}/userID=${query.userId}`,
    ui_key_general_user_language: `${uiKey}/language=${query.language}`,
    ui_key_general_business_partner: `${uiKey}/businessPartnerID=${query.businessPartner}`,
    ui_function: uiFunctionName,
    ui_key_function_url: uiFunctionUrl,
    runtime_session_id: runtimeSessionId,
    Params: uiFunctionParams,
    responseReceiveQueue: 'nestjs-data-connection-receive-async-data-consume',
  };
}

